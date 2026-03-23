import { z } from "zod";

/**
 * Shared Zod validation schemas.
 *
 * Define reusable schemas here and import them in route handlers
 * for request validation.
 */

// ─── Common Field Schemas ──────────────────────────────────────

/** UUID or nanoid-style ID */
export const idSchema = z.string().min(1).max(255);

/** Email address */
export const emailSchema = z.string().email().max(255);

/** Standard pagination query params */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

/** Sort order */
export const sortSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// ─── User / Profile Schemas ────────────────────────────────────

export const updateProfileSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
  timezone: z.string().max(50).optional(),
});

// ─── Device Registration Schema ────────────────────────────────

export const registerDeviceSchema = z.object({
  platform: z.enum(["ios", "android"]),
  pushToken: z.string().min(1).max(500),
  deviceName: z.string().max(100).optional(),
});

// ─── Type Exports ──────────────────────────────────────────────
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type RegisterDeviceInput = z.infer<typeof registerDeviceSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
