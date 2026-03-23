import * as jose from "jose";
import { eq } from "drizzle-orm";
import type { Env } from "../env";
import { createDb } from "../db";
import { devices } from "../db/schema";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type * as schema from "../db/schema";

export type PushPayload = {
  title: string;
  body?: string;
  data?: Record<string, string>;
};

/**
 * Send push notifications to all devices for a user.
 * Routes to FCM (Android), APNs (iOS), or Expo based on token/platform.
 *
 * Call from route handlers or background logic when you need to notify a user.
 *
 * @example
 * await sendPushToUser(env, userId, { title: "New message", body: "You have a new message", data: { type: "chat" } });
 */
export async function sendPushToUser(
  env: Env,
  userId: string,
  payload: PushPayload
): Promise<{ sent: number; failed: number; errors: string[] }> {
  const db = createDb(env.DATABASE_URL) as NeonHttpDatabase<typeof schema>;
  const userDevices = await db.query.devices.findMany({
    where: eq(devices.userId, userId),
  });

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const device of userDevices) {
    try {
      const ok = await sendToDevice(env, device.platform, device.pushToken, payload);
      if (ok) sent++;
      else {
        failed++;
        errors.push(`Device ${device.id}: send failed`);
      }
    } catch (err) {
      failed++;
      errors.push(`Device ${device.id}: ${err instanceof Error ? err.message : "unknown"}`);
    }
  }

  return { sent, failed, errors };
}

/**
 * Send a push to a single device token.
 */
async function sendToDevice(
  env: Env,
  platform: string,
  token: string,
  payload: PushPayload
): Promise<boolean> {
  if (token.startsWith("ExponentPushToken[")) {
    return sendExpoPush(token, payload);
  }
  if (platform === "ios") {
    return sendAPNs(env, token, payload);
  }
  if (platform === "android") {
    return sendFCM(env, token, payload);
  }
  return false;
}

async function sendFCM(env: Env, token: string, payload: PushPayload): Promise<boolean> {
  const { FCM_PROJECT_ID, FCM_CLIENT_EMAIL, FCM_PRIVATE_KEY } = env;
  if (!FCM_PROJECT_ID || !FCM_CLIENT_EMAIL || !FCM_PRIVATE_KEY) {
    throw new Error("FCM not configured: set FCM_PROJECT_ID, FCM_CLIENT_EMAIL, FCM_PRIVATE_KEY");
  }

  const accessToken = await getFcmAccessToken(FCM_CLIENT_EMAIL, FCM_PRIVATE_KEY);
  const url = `https://fcm.googleapis.com/v1/projects/${FCM_PROJECT_ID}/messages:send`;

  const body = {
    message: {
      token,
      notification: {
        title: payload.title,
        body: payload.body ?? "",
      },
      data: payload.data ? stringifyData(payload.data) : undefined,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`FCM error ${res.status}: ${text}`);
  }
  return true;
}

async function getFcmAccessToken(clientEmail: string, privateKeyPem: string): Promise<string> {
  const key = await jose.importPKCS8(privateKeyPem.replace(/\\n/g, "\n"), "RS256");
  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(clientEmail)
    .setSubject(clientEmail)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`FCM OAuth error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("No access_token in FCM OAuth response");
  return data.access_token;
}

async function sendAPNs(env: Env, token: string, payload: PushPayload): Promise<boolean> {
  const { APNS_KEY_ID, APNS_TEAM_ID, APNS_BUNDLE_ID, APNS_PRIVATE_KEY, APNS_PRODUCTION } = env;
  if (!APNS_KEY_ID || !APNS_TEAM_ID || !APNS_BUNDLE_ID || !APNS_PRIVATE_KEY) {
    throw new Error("APNs not configured: set APNS_KEY_ID, APNS_TEAM_ID, APNS_BUNDLE_ID, APNS_PRIVATE_KEY");
  }

  const key = await jose.importPKCS8(APNS_PRIVATE_KEY.replace(/\\n/g, "\n"), "ES256");
  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: APNS_KEY_ID })
    .setIssuer(APNS_TEAM_ID)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);

  const host = APNS_PRODUCTION === "true" ? "api.push.apple.com" : "api.sandbox.push.apple.com";
  const url = `https://${host}/3/device/${token}`;

  const apnsBody: Record<string, unknown> = {
    aps: {
      alert: { title: payload.title, body: payload.body ?? "" },
      sound: "default",
    },
  };
  if (payload.data) {
    Object.assign(apnsBody, payload.data);
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "apns-topic": APNS_BUNDLE_ID,
      "apns-push-type": "alert",
      "apns-priority": "10",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apnsBody),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`APNs error ${res.status}: ${text}`);
  }
  return true;
}

async function sendExpoPush(token: string, payload: PushPayload): Promise<boolean> {
  const res = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: token,
      title: payload.title,
      body: payload.body ?? "",
      data: payload.data,
      sound: "default",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Expo push error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as { data?: { status?: string }[] };
  const status = data.data?.[0]?.status;
  if (status === "error") {
    throw new Error("Expo push rejected");
  }
  return true;
}

function stringifyData(data: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) {
    out[k] = typeof v === "string" ? v : JSON.stringify(v);
  }
  return out;
}
