import { Hono } from "hono";
import type { Env } from "../env";
import { createAuth } from "../auth";

/**
 * Authentication routes.
 *
 * Mounts the Better Auth handler at `/api/auth/**`.
 * All auth endpoints (sign-up, sign-in, sign-out, session management)
 * are automatically handled by Better Auth.
 *
 * Available endpoints (handled by Better Auth):
 * - POST /api/auth/sign-up/email     — Register with email/password
 * - POST /api/auth/sign-in/email     — Sign in with email/password
 * - POST /api/auth/sign-out          — Sign out (invalidate session)
 * - GET  /api/auth/get-session       — Get current session
 * - POST /api/auth/forget-password   — Request password reset
 * - POST /api/auth/reset-password    — Reset password with token
 * - POST /api/auth/change-password   — Change password (authenticated)
 */
const auth = new Hono<{ Bindings: Env }>();

auth.all("/*", async (c) => {
  const authInstance = createAuth(c.env);
  return authInstance.handler(c.req.raw);
});

export default auth;
