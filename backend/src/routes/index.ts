import { OpenAPIHono } from "@hono/zod-openapi";
import type { Env } from "../env";
import type { AuthVariables } from "../auth/middleware";

import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import deviceRoutes from "./device.routes";
import notificationRoutes from "./notification.routes";
import analyticsRoutes from "./analytics.routes";

/**
 * Route aggregator.
 *
 * Mount all route modules here using `app.route()`.
 * Use versioned paths (e.g. `/api/v1/`) for API routes
 * to support future API versions without breaking changes.
 */
const routes = new OpenAPIHono<{ Bindings: Env; Variables: AuthVariables }>();

// ─── Public Routes ─────────────────────────────────────────────
routes.route("/health", healthRoutes);
routes.route("/api/auth", authRoutes);

// ─── API v1 Routes ─────────────────────────────────────────────
routes.route("/api/v1/users", userRoutes);
routes.route("/api/v1/devices", deviceRoutes);
routes.route("/api/v1/notifications", notificationRoutes);
routes.route("/api/v1/analytics", analyticsRoutes);

export default routes;
