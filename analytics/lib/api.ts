const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787";

function getTimezoneHeader(): string {
  if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return "UTC";
}

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  error?: string;
  message?: string;
};

export type UserProfile = {
  id: string;
  userId: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  timezone: string | null;
  role: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MeResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
  };
  profile: UserProfile | null;
};

export type AppItem = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

const DEFAULT_RETRIES = 2;
const RETRY_DELAY_MS = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetry(res: Response, err?: unknown): boolean {
  if (err) return true;
  return res.status >= 500;
}

async function fetchWithAuth<T>(path: string, retries = DEFAULT_RETRIES): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${API_URL}${path}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-Timezone": getTimezoneHeader(),
        },
      });

      const json = (await res.json()) as ApiSuccess<T> | ApiFailure;

      if (attempt < retries && shouldRetry(res)) {
        await delay(RETRY_DELAY_MS * (attempt + 1));
        continue;
      }

      if (!res.ok || !("success" in json) || !json.success) {
        const message =
          "message" in json && typeof json.message === "string"
            ? json.message
            : `Request failed with status ${res.status}`;
        throw new Error(message);
      }

      return json.data;
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await delay(RETRY_DELAY_MS * (attempt + 1));
      } else {
        throw err;
      }
    }
  }
  throw lastError;
}

export type AnalyticsOverview = {
  totalUsers: number;
  totalDevices: number;
  usersLast7d: number;
  usersLast30d: number;
  platformBreakdown: {
    ios: number;
    android: number;
    other: number;
  };
};

export type UserGrowth = {
  period: "7d" | "30d" | "90d";
  points: Array<{ date: string; count: number }>;
};

export type DevicesAnalytics = {
  totalDevices: number;
  activeDevices7d: number;
  byPlatform: Array<{ platform: string; count: number }>;
};

export type SessionsAnalytics = {
  activeSessions: number;
};

export function getMe() {
  return fetchWithAuth<MeResponse>("/api/v1/users/me");
}

export function getApps() {
  return fetchWithAuth<{ apps: AppItem[] }>("/api/v1/analytics/apps");
}

export function getAnalyticsOverview(appId?: string) {
  const q = appId ? `?appId=${encodeURIComponent(appId)}` : "";
  return fetchWithAuth<AnalyticsOverview>(`/api/v1/analytics/overview${q}`);
}

export function getUserGrowth(
  period: "7d" | "30d" | "90d",
  appId?: string,
  start?: string,
  end?: string,
) {
  const params = new URLSearchParams({ period });
  if (appId) params.set("appId", appId);
  if (start) params.set("start", start);
  if (end) params.set("end", end);
  return fetchWithAuth<UserGrowth>(`/api/v1/analytics/users/growth?${params}`);
}

export function getDevicesAnalytics(appId?: string) {
  const q = appId ? `?appId=${encodeURIComponent(appId)}` : "";
  return fetchWithAuth<DevicesAnalytics>(`/api/v1/analytics/devices${q}`);
}

export function getSessionsAnalytics() {
  return fetchWithAuth<SessionsAnalytics>("/api/v1/analytics/sessions");
}

export async function getAnalyticsExport(
  format: "csv" | "xlsx",
  period: "7d" | "30d" | "90d",
  appId?: string,
  start?: string,
  end?: string,
): Promise<Blob> {
  const params = new URLSearchParams({ format, period });
  if (appId) params.set("appId", appId);
  if (start) params.set("start", start);
  if (end) params.set("end", end);
  const res = await fetch(`${API_URL}/api/v1/analytics/export?${params}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Timezone": getTimezoneHeader(),
    },
  });
  if (!res.ok) {
    const json = (await res.json()) as ApiFailure;
    throw new Error(json.message ?? `Export failed: ${res.status}`);
  }
  return res.blob();
}
