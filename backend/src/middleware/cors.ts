import { cors } from "hono/cors";
import type { Env } from "../env";

const DEFAULT_DEV_ORIGINS = [
  "http://localhost:8787",
  "http://localhost:3000",
  "http://localhost:3001", // Analytics dashboard
  "http://localhost:8081",
  "http://127.0.0.1:8081",
  "exp://localhost",
  "capacitor://localhost",
];

/**
 * CORS middleware configured for mobile app backends.
 *
 * In development: allows common dev origins + all if ALLOWED_ORIGINS unset.
 * In production: strictly uses ALLOWED_ORIGINS (comma-separated) or defaults.
 */
export function corsMiddleware() {
  return cors({
    origin: (origin, c) => {
      if (!origin) return "*";

      const env = c.env as Env;
      const isProd = env?.NODE_ENV === "production";
      const envOrigins = env?.ALLOWED_ORIGINS
        ? env.ALLOWED_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean)
        : null;

      const allowed = envOrigins ?? DEFAULT_DEV_ORIGINS;
      if (allowed.includes(origin)) return origin;

      if (isProd) return null;
      return envOrigins ? null : origin;
    },
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposeHeaders: ["X-Total-Count", "X-Request-Id"],
    credentials: true,
    maxAge: 86400, // 24 hours
  });
}
