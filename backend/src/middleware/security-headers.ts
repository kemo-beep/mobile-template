import { createMiddleware } from "hono/factory";
import type { Env } from "../env";

/**
 * Security headers middleware.
 *
 * Adds standard security headers for production APIs.
 */
export const securityHeaders = createMiddleware<{ Bindings: Env }>(async (c, next) => {
  await next();

  // Prevent MIME type sniffing
  c.header("X-Content-Type-Options", "nosniff");
  // Prevent clickjacking
  c.header("X-Frame-Options", "DENY");
  // XSS protection (legacy, but harmless)
  c.header("X-XSS-Protection", "1; mode=block");
  // Referrer policy — only send origin for cross-origin
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");

  // HSTS — only in production over HTTPS
  if (c.env.NODE_ENV === "production" && c.req.url.startsWith("https://")) {
    c.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
});
