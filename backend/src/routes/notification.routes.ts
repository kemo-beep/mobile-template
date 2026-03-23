import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import type { Env } from "../env";
import type { AuthVariables } from "../auth/middleware";
import { authMiddleware } from "../auth/middleware";
import { sendPushToUser } from "../lib/push";

/**
 * Notification routes — send push notifications.
 * Uses registered device tokens from /api/v1/devices.
 */
const notifications = new OpenAPIHono<{ Bindings: Env; Variables: AuthVariables }>();

notifications.use("/*", authMiddleware);

const bearerSecurity = [{ Bearer: [] }];
const unauthorizedResponse = {
  description: "Authentication required",
  content: {
    "application/json": {
      schema: z.object({
        success: z.literal(false),
        error: z.string(),
        message: z.string(),
      }),
    },
  },
};

// ─── POST /send (Send push to current user — for testing) ───────
const sendRoute = createRoute({
  method: "post",
  path: "/send",
  tags: ["Notifications"],
  summary: "Send test push to current user",
  description:
    "Sends a push notification to all devices registered for the authenticated user. Useful for testing. For production, call sendPushToUser() from your business logic.",
  security: bearerSecurity,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            title: z.string().min(1).max(100),
            body: z.string().max(500).optional(),
            data: z.record(z.string(), z.string()).optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Push sent",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              sent: z.number(),
              failed: z.number(),
              errors: z.array(z.string()),
            }),
          }),
        },
      },
    },
    400: {
      description: "Push not configured",
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
    401: unauthorizedResponse,
  },
});

notifications.openapi(sendRoute, async (c) => {
  const user = c.get("user");
  const body = c.req.valid("json");

  try {
    const result = await sendPushToUser(c.env, user.id, {
      title: body.title,
      body: body.body,
      data: body.data,
    });

    return c.json(
      {
        success: true as const,
        data: result,
      },
      200
    );
  } catch (err) {
    return c.json(
      {
        success: false as const,
        error: "PUSH_ERROR",
        message: err instanceof Error ? err.message : "Failed to send push",
      },
      400
    );
  }
});

export default notifications;
