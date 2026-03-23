import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import type { Env } from "../env";
import type { AuthVariables } from "../auth/middleware";
import { authMiddleware } from "../auth/middleware";
import { createDb } from "../db";
import { profiles } from "../db/schema";
import { updateProfileSchema } from "../lib/validators";

/**
 * User profile routes — all protected by auth middleware.
 * OpenAPI documented for Swagger UI.
 */
const users = new OpenAPIHono<{ Bindings: Env; Variables: AuthVariables }>();

// Apply auth middleware to all user routes
users.use("/*", authMiddleware);

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

const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  displayName: z.string().nullable(),
  bio: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  timezone: z.string().nullable(),
  role: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
});

// ─── GET /me ───────────────────────────────────────────────────
const getMeRoute = createRoute({
  method: "get",
  path: "/me",
  tags: ["Users"],
  summary: "Get current user",
  description:
    "Returns the authenticated user's account info and profile data.",
  security: bearerSecurity,
  responses: {
    200: {
      description: "Current user profile",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              user: userSchema,
              profile: profileSchema.nullable(),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

users.openapi(getMeRoute, async (c) => {
  const user = c.get("user");
  const db = createDb(c.env.DATABASE_URL);

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  });

  return c.json(
    {
      success: true as const,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
        },
        profile: profile
          ? {
              ...profile,
              createdAt: profile.createdAt.toISOString(),
              updatedAt: profile.updatedAt.toISOString(),
            }
          : null,
      },
    },
    200,
  );
});

// ─── PATCH /me ─────────────────────────────────────────────────
const updateMeRoute = createRoute({
  method: "patch",
  path: "/me",
  tags: ["Users"],
  summary: "Update current user profile",
  description:
    "Updates the authenticated user's profile. Creates a profile if one doesn't exist.",
  security: bearerSecurity,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              displayName: z.string().min(1).max(100).optional(),
              bio: z.string().max(500).optional(),
              avatarUrl: z.string().url().optional(),
              timezone: z.string().max(50).optional(),
            })
            .openapi("UpdateProfileInput"),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Profile updated",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              profile: profileSchema,
            }),
          }),
        },
      },
    },
    201: {
      description: "Profile created",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              profile: profileSchema,
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

users.openapi(updateMeRoute, async (c) => {
  const user = c.get("user");
  const db = createDb(c.env.DATABASE_URL);
  const body = c.req.valid("json");

  const input = updateProfileSchema.parse(body);

  const existing = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  });

  if (existing) {
    const [updated] = await db
      .update(profiles)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(eq(profiles.userId, user.id))
      .returning();

    return c.json(
      {
        success: true as const,
        data: {
          profile: {
            ...updated,
            createdAt: updated.createdAt.toISOString(),
            updatedAt: updated.updatedAt.toISOString(),
          },
        },
      },
      200,
    );
  } else {
    const [created] = await db
      .insert(profiles)
      .values({
        id: crypto.randomUUID(),
        userId: user.id,
        ...input,
      })
      .returning();

    return c.json(
      {
        success: true as const,
        data: {
          profile: {
            ...created,
            createdAt: created.createdAt.toISOString(),
            updatedAt: created.updatedAt.toISOString(),
          },
        },
      },
      201,
    );
  }
});

export default users;
