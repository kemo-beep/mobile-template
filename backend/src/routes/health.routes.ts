import { neon } from "@neondatabase/serverless";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import type { Env } from "../env";

/**
 * Health check routes (OpenAPI documented).
 */
const health = new OpenAPIHono<{ Bindings: Env }>();

// ─── GET /health ───────────────────────────────────────────────
const healthCheckRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Health"],
  summary: "Health check",
  description: "Basic health check endpoint for monitoring and uptime checks.",
  responses: {
    200: {
      description: "Service is healthy",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            data: z.object({
              status: z.string().openapi({ example: "ok" }),
              timestamp: z.string().openapi({ example: "2026-03-23T10:00:00.000Z" }),
              version: z.string().openapi({ example: "1.0.0" }),
            }),
          }),
        },
      },
    },
  },
});

health.openapi(healthCheckRoute, (c) => {
  return c.json(
    {
      success: true as const,
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
      },
    },
    200,
  );
});

// ─── GET /health/ready ─────────────────────────────────────────
const readinessRoute = createRoute({
  method: "get",
  path: "/ready",
  tags: ["Health"],
  summary: "Readiness check",
  description: "Detailed readiness check with individual component status.",
  responses: {
    200: {
      description: "All checks passed",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            data: z.object({
              status: z.enum(["ok", "degraded"]),
              checks: z.record(z.string(), z.string()),
              timestamp: z.string(),
            }),
          }),
        },
      },
    },
    503: {
      description: "One or more checks failed",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            data: z.object({
              status: z.enum(["ok", "degraded"]),
              checks: z.record(z.string(), z.string()),
              timestamp: z.string(),
            }),
          }),
        },
      },
    },
  },
});

health.openapi(readinessRoute, async (c) => {
  const checks: Record<string, string> = {
    api: "ok",
  };

  try {
    const sql = neon(c.env.DATABASE_URL);
    await sql`SELECT 1`;
    checks.database = "ok";
  } catch (err) {
    checks.database = "error";
    console.error("Readiness DB check failed:", err);
  }

  const allOk = Object.values(checks).every((v) => v === "ok");

  return c.json(
    {
      success: true as const,
      data: {
        status: allOk ? ("ok" as const) : ("degraded" as const),
        checks,
        timestamp: new Date().toISOString(),
      },
    },
    allOk ? 200 : 503,
  );
});

export default health;
