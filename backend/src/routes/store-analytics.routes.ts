import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import type { Env } from "../env";
import type { AuthVariables } from "../auth/middleware";
import { authMiddleware } from "../auth/middleware";
import { requireRole } from "../auth/require-role";

const storeAnalytics = new OpenAPIHono<{ Bindings: Env; Variables: AuthVariables }>();

storeAnalytics.use("/*", authMiddleware);
storeAnalytics.use("/*", requireRole(["admin", "developer"]));

const bearerSecurity = [{ Bearer: [] }];
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

const rankingsRoute = createRoute({
  method: "get",
  path: "/rankings",
  tags: ["Store Analytics"],
  summary: "Get store rankings",
  description: "Returns app store rankings (stub — empty until sync is implemented).",
  security: bearerSecurity,
  request: {
    query: z.object({
      appId: z.string().optional(),
      store: z.enum(["ios", "android", "amazon"]).optional(),
      period: z.enum(["7d", "30d"]).default("7d"),
    }),
  },
  responses: {
    200: {
      description: "Store rankings (stub)",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              rankings: z.array(z.unknown()),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

storeAnalytics.openapi(rankingsRoute, async (c) => {
  return c.json(
    {
      success: true as const,
      data: { rankings: [] },
    },
    200,
  );
});

const reviewsRoute = createRoute({
  method: "get",
  path: "/reviews",
  tags: ["Store Analytics"],
  summary: "Get store reviews",
  description: "Returns app store reviews (stub — empty until sync is implemented).",
  security: bearerSecurity,
  request: {
    query: z.object({
      appId: z.string().optional(),
      store: z.enum(["ios", "android", "amazon"]).optional(),
    }),
  },
  responses: {
    200: {
      description: "Store reviews (stub)",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              reviews: z.array(z.unknown()),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

storeAnalytics.openapi(reviewsRoute, async (c) => {
  return c.json(
    {
      success: true as const,
      data: { reviews: [] },
    },
    200,
  );
});

export default storeAnalytics;
