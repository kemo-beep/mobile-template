import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import type { Env } from "./env";
import type { AuthVariables } from "./auth/middleware";
import type { RequestIdVariables } from "./middleware/request-id";

// Middleware
import { corsMiddleware } from "./middleware/cors";
import { errorHandler } from "./middleware/error-handler";
import { logger } from "./middleware/logger";
import { rateLimiter } from "./middleware/rate-limit";
import { requestIdMiddleware } from "./middleware/request-id";
import { securityHeaders } from "./middleware/security-headers";

// Routes
import routes from "./routes";

// ─── App Instance ──────────────────────────────────────────────
type AppVariables = AuthVariables & RequestIdVariables;
const app = new OpenAPIHono<{ Bindings: Env; Variables: AppVariables }>();

// ─── Global Middleware ─────────────────────────────────────────
// Order: error handler (outermost), request ID, CORS, logger, rate limit, security headers
app.use("*", errorHandler);
app.use("*", requestIdMiddleware);
app.use("*", corsMiddleware());
app.use("*", logger);
app.use("*", rateLimiter(100, 60_000)); // 100 requests per minute per IP
app.use("*", securityHeaders);

// ─── Root ──────────────────────────────────────────────────────
app.get("/", (c) => {
  return c.json({
    name: "Mobile Backend API",
    version: "1.0.0",
    docs: "/swagger",
    openapi: "/doc",
  });
});

// ─── Mount All Routes ──────────────────────────────────────────
app.route("/", routes);

// ─── OpenAPI Spec ──────────────────────────────────────────────
app.doc("/doc", {
  openapi: "3.1.0",
  info: {
    title: "Mobile Backend API",
    version: "1.0.0",
    description:
      "Production-ready REST API for mobile applications. Built with Hono, NeonDB, Drizzle ORM, and Better Auth.",
  },
  servers: [
    { url: "http://localhost:8787", description: "Local development" },
    {
      url: "https://backend.{worker}.workers.dev",
      description: "Production (replace {worker} with your worker name)",
      variables: { worker: { default: "backend" } },
    },
  ],
  security: [{ Bearer: [] }],
});

// Register the Bearer auth security scheme
app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description:
    "Use the session token from Better Auth sign-in response as the Bearer token.",
});

// ─── Swagger UI ────────────────────────────────────────────────
app.get(
  "/swagger",
  swaggerUI({
    url: "/doc",
  }),
);

// ─── 404 Handler ───────────────────────────────────────────────
app.notFound((c) => {
  const requestId = (c as { get?: (k: string) => unknown }).get?.("requestId") as string | undefined;
  return c.json(
    {
      success: false,
      error: "NOT_FOUND",
      message: `Route ${c.req.method} ${c.req.path} not found`,
      ...(requestId ? { requestId } : {}),
    },
    404,
  );
});

export default app;
