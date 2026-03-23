import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { and, eq } from "drizzle-orm";
import type { Env } from "../env";
import type { AuthVariables } from "../auth/middleware";
import { authMiddleware } from "../auth/middleware";
import { createDb } from "../db";
import { devices } from "../db/schema";
import { registerDeviceSchema } from "../lib/validators";
import { NotFoundError } from "../lib/errors";

/**
 * Device registration routes for push notifications.
 * Used by both SwiftUI (native) and Expo apps.
 */
const deviceRoutes = new OpenAPIHono<{ Bindings: Env; Variables: AuthVariables }>();

deviceRoutes.use("/*", authMiddleware);

// ─── Shared Schemas ────────────────────────────────────────────
const unauthorizedResponse = {
  description: "Authentication required",
  content: {
    "application/json": {
      schema: z.object({
        success: z.literal(false),
        error: z.string().openapi({ example: "UNAUTHORIZED" }),
        message: z.string().openapi({ example: "Authentication required" }),
      }),
    },
  },
};

const bearerSecurity = [{ Bearer: [] }];

const deviceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  platform: z.string(),
  pushToken: z.string(),
  deviceName: z.string().nullable(),
  lastActiveAt: z.string().nullable(),
  createdAt: z.string(),
});

// ─── POST / (Register device) ───────────────────────────────────
const registerRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Devices"],
  summary: "Register push notification device",
  description:
    "Registers a device for push notifications. Upserts by userId + pushToken (same token on reinstall updates lastActiveAt).",
  security: bearerSecurity,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              platform: z.enum(["ios", "android"]),
              pushToken: z.string().min(1).max(500),
              deviceName: z.string().max(100).optional(),
            })
            .openapi("RegisterDeviceInput"),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Device registered or updated",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              device: deviceSchema,
              created: z.boolean(),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

deviceRoutes.openapi(registerRoute, async (c) => {
  const user = c.get("user");
  const db = createDb(c.env.DATABASE_URL);
  const body = c.req.valid("json");
  const input = registerDeviceSchema.parse(body);

  const existing = await db.query.devices.findFirst({
    where: and(
      eq(devices.userId, user.id),
      eq(devices.pushToken, input.pushToken)
    ),
  });

  const now = new Date();

  if (existing) {
    const [updated] = await db
      .update(devices)
      .set({
        deviceName: input.deviceName ?? existing.deviceName,
        lastActiveAt: now,
      })
      .where(eq(devices.id, existing.id))
      .returning();

    return c.json(
      {
        success: true as const,
        data: {
          device: {
            ...updated,
            lastActiveAt: updated.lastActiveAt?.toISOString() ?? null,
            createdAt: updated.createdAt.toISOString(),
          },
          created: false,
        },
      },
      200
    );
  }

  const [created] = await db
    .insert(devices)
    .values({
      id: crypto.randomUUID(),
      userId: user.id,
      platform: input.platform,
      pushToken: input.pushToken,
      deviceName: input.deviceName ?? null,
      lastActiveAt: now,
    })
    .returning();

  return c.json(
    {
      success: true as const,
      data: {
        device: {
          ...created,
          lastActiveAt: created.lastActiveAt?.toISOString() ?? null,
          createdAt: created.createdAt.toISOString(),
        },
        created: true,
      },
    },
    200
  );
});

// ─── GET / (List user's devices) ────────────────────────────────
const listRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Devices"],
  summary: "List user's devices",
  description: "Returns all devices registered for the current user.",
  security: bearerSecurity,
  responses: {
    200: {
      description: "List of devices",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              devices: z.array(deviceSchema),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

deviceRoutes.openapi(listRoute, async (c) => {
  const user = c.get("user");
  const db = createDb(c.env.DATABASE_URL);

  const userDevices = await db.query.devices.findMany({
    where: eq(devices.userId, user.id),
  });

  return c.json(
    {
      success: true as const,
      data: {
        devices: userDevices.map((d) => ({
          ...d,
          lastActiveAt: d.lastActiveAt?.toISOString() ?? null,
          createdAt: d.createdAt.toISOString(),
        })),
      },
    },
    200
  );
});

// ─── DELETE /:id (Unregister device) ────────────────────────────
const deleteRoute = createRoute({
  method: "delete",
  path: "/{id}",
  tags: ["Devices"],
  summary: "Unregister device",
  description: "Removes a device. Only the device owner can delete.",
  security: bearerSecurity,
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "Device unregistered",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              deleted: z.boolean(),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
    404: {
      description: "Device not found",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(false),
            error: z.string(),
            message: z.string(),
          }),
        },
      },
    },
  },
});

deviceRoutes.openapi(deleteRoute, async (c) => {
  const user = c.get("user");
  const db = createDb(c.env.DATABASE_URL);
  const { id } = c.req.valid("param");

  const device = await db.query.devices.findFirst({
    where: and(eq(devices.id, id), eq(devices.userId, user.id)),
  });

  if (!device) {
    throw new NotFoundError("Device");
  }

  await db.delete(devices).where(eq(devices.id, id));

  return c.json(
    {
      success: true as const,
      data: { deleted: true },
    },
    200
  );
});

export default deviceRoutes;
