import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

// ─── Application-Specific Tables ───────────────────────────────

/** Roles: admin (full access), developer (view analytics), viewer (read-only) */
export const ROLE_VALUES = ["admin", "developer", "viewer"] as const;
export type Role = (typeof ROLE_VALUES)[number];

/**
 * Apps — projects/products whose metrics are tracked.
 * id is generated (e.g. nanoid).
 */
export const apps = pgTable("apps", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * User profiles — extended user data beyond what Better Auth stores.
 * Includes role for RBAC.
 */
export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  timezone: text("timezone").default("UTC"),
  role: text("role").default("developer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Store connections — credentials for App Store Connect / Play Console sync.
 * credentials: encrypted JSON or reference to secrets.
 */
export const appStoreConnections = pgTable("app_store_connections", {
  id: text("id").primaryKey(),
  appId: text("app_id").notNull().references(() => apps.id, { onDelete: "cascade" }),
  store: text("store").notNull(), // 'ios' | 'android' | 'amazon'
  credentials: text("credentials"), // encrypted JSON or ref
  lastSyncAt: timestamp("last_sync_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Store rankings — daily app store ranking data.
 */
export const appStoreRankings = pgTable("app_store_rankings", {
  id: text("id").primaryKey(),
  appId: text("app_id").notNull().references(() => apps.id, { onDelete: "cascade" }),
  store: text("store").notNull(),
  date: timestamp("date").notNull(),
  category: text("category"),
  rank: text("rank").notNull(),
  country: text("country").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Store reviews — app store reviews synced from Apple/Google.
 */
export const appStoreReviews = pgTable("app_store_reviews", {
  id: text("id").primaryKey(),
  appId: text("app_id").notNull().references(() => apps.id, { onDelete: "cascade" }),
  store: text("store").notNull(),
  externalId: text("external_id").notNull(),
  rating: text("rating").notNull(),
  body: text("body"),
  author: text("author"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Device registrations — for push notifications in mobile apps.
 * appId optional: when set, device metrics are scoped to that app.
 */
export const devices = pgTable("devices", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  appId: text("app_id").references(() => apps.id, { onDelete: "set null" }),
  platform: text("platform").notNull(), // 'ios' | 'android'
  pushToken: text("push_token").notNull(),
  deviceName: text("device_name"),
  lastActiveAt: timestamp("last_active_at").defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Type Exports ──────────────────────────────────────────────
export type AppStoreConnection = typeof appStoreConnections.$inferSelect;
export type NewAppStoreConnection = typeof appStoreConnections.$inferInsert;
export type AppStoreRanking = typeof appStoreRankings.$inferSelect;
export type NewAppStoreRanking = typeof appStoreRankings.$inferInsert;
export type AppStoreReview = typeof appStoreReviews.$inferSelect;
export type NewAppStoreReview = typeof appStoreReviews.$inferInsert;
export type App = typeof apps.$inferSelect;
export type NewApp = typeof apps.$inferInsert;
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Device = typeof devices.$inferSelect;
export type NewDevice = typeof devices.$inferInsert;
