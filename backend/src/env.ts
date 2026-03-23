/**
 * Cloudflare Workers environment bindings.
 * These are the environment variables and bindings available in your Worker.
 *
 * For local development, set these in `.dev.vars`.
 * For production, use `wrangler secret put <KEY>`.
 */
export type Env = {
  // ─── Database ────────────────────────────────────────────────
  /** NeonDB PostgreSQL connection string */
  DATABASE_URL: string;

  // ─── Authentication ──────────────────────────────────────────
  /** Secret key for Better Auth token signing (min 32 chars) */
  BETTER_AUTH_SECRET: string;

  /** Public URL of this API (e.g. https://api.example.com) */
  BETTER_AUTH_URL: string;

  // ─── Apple Sign-In (optional) ────────────────────────────────
  /** Apple Services ID — required for Apple Sign-In on iOS */
  APPLE_CLIENT_ID?: string;
  /** Apple client secret (JWT) — server-generated for Sign in with Apple */
  APPLE_CLIENT_SECRET?: string;

  // ─── Google OAuth (optional) ─────────────────────────────────
  /** Google OAuth client ID — from Google Cloud Console */
  GOOGLE_CLIENT_ID?: string;
  /** Google OAuth client secret */
  GOOGLE_CLIENT_SECRET?: string;

  // ─── CORS ────────────────────────────────────────────────────
  /** Comma-separated allowed origins. If unset, uses permissive defaults. */
  ALLOWED_ORIGINS?: string;

  // ─── Push Notifications ──────────────────────────────────────
  /** FCM: Firebase project ID */
  FCM_PROJECT_ID?: string;
  /** FCM: Service account client email */
  FCM_CLIENT_EMAIL?: string;
  /** FCM: Service account private key (PEM, with \n) */
  FCM_PRIVATE_KEY?: string;
  /** APNs: Key ID from Apple Developer */
  APNS_KEY_ID?: string;
  /** APNs: Team ID */
  APNS_TEAM_ID?: string;
  /** APNs: Bundle ID (e.g. com.yourapp) */
  APNS_BUNDLE_ID?: string;
  /** APNs: .p8 private key content (PEM) */
  APNS_PRIVATE_KEY?: string;
  /** APNs: true for production, false for sandbox */
  APNS_PRODUCTION?: string;

  // ─── Logging / APM ───────────────────────────────────────────
  /** Axiom API token for log shipping */
  AXIOM_TOKEN?: string;
  /** Axiom dataset name */
  AXIOM_DATASET?: string;

  // ─── Environment ─────────────────────────────────────────────
  /** 'development' | 'production' */
  NODE_ENV?: string;

  /** Analytics data retention in days (default 90). Used by data-retention module. */
  ANALYTICS_RETENTION_DAYS?: string;

  // ─── Optional Cloudflare Bindings ────────────────────────────
  /** KV namespace for analytics response caching (optional) */
  KV_ANALYTICS?: KVNamespace;
  // MY_BUCKET: R2Bucket;
  // MY_DB: D1Database;
};
