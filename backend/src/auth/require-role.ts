import { createMiddleware } from "hono/factory";
import { eq } from "drizzle-orm";
import type { Env } from "../env";
import type { AuthVariables } from "./middleware";
import { createDb } from "../db";
import { profiles } from "../db/schema";
import { ForbiddenError } from "../lib/errors";
import type { Role } from "../db/schema";

/**
 * Role-checking middleware. Must run after authMiddleware.
 *
 * Fetches the user's profile to get their role, then returns 403
 * if the role is not in the allowed list.
 *
 * @param allowedRoles - Roles that can access the route (e.g. ["admin", "developer"])
 *
 * @example
 * analytics.use("/*", authMiddleware);
 * analytics.use("/*", requireRole(["admin", "developer"]));
 */
export function requireRole(allowedRoles: string[]) {
  return createMiddleware<{
    Bindings: Env;
    Variables: AuthVariables;
  }>(async (c, next) => {
    const user = c.get("user");
    const db = createDb(c.env.DATABASE_URL);

    const [profile] = await db
      .select({ role: profiles.role })
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    const role = (profile?.role ?? "developer") as Role;

    if (!allowedRoles.includes(role)) {
      throw new ForbiddenError("Insufficient permissions");
    }

    await next();
  });
}
