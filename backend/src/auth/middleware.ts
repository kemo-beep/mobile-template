import { createMiddleware } from "hono/factory";
import { createAuth } from "./index";
import type { Env } from "../env";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type AuthSession = {
  id: string;
  expiresAt: Date;
  token: string;
  userId: string;
  ipAddress: string | null;
  userAgent: string | null;
};

/**
 * Variables set by the auth middleware on the Hono context.
 * Access via `c.get('user')` and `c.get('session')` in route handlers.
 */
export type AuthVariables = {
  user: AuthUser;
  session: AuthSession;
};

/**
 * Authentication middleware for protected routes.
 *
 * Validates the session from the request headers (Bearer token or cookies).
 * If valid, sets `user` and `session` on the Hono context.
 * If invalid, returns 401 Unauthorized.
 *
 * Usage:
 * ```ts
 * import { authMiddleware } from '../auth/middleware';
 *
 * const app = new Hono<{ Bindings: Env; Variables: AuthVariables }>();
 * app.use('/*', authMiddleware);
 * app.get('/me', (c) => {
 *   const user = c.get('user');
 *   return c.json({ user });
 * });
 * ```
 */
export const authMiddleware = createMiddleware<{
  Bindings: Env;
  Variables: AuthVariables;
}>(async (c, next) => {
  const auth = createAuth(c.env);

  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json(
      {
        success: false,
        error: "UNAUTHORIZED",
        message: "Authentication required",
      },
      401,
    );
  }

  c.set("user", session.user as AuthUser);
  c.set("session", session.session as AuthSession);
  await next();
});
