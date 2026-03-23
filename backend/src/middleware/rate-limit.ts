import { createMiddleware } from "hono/factory";
import type { Env } from "../env";

/**
 * Simple in-memory rate limiter for Cloudflare Workers.
 *
 * NOTE: This is per-isolate, meaning each isolate has its own counter.
 * For distributed rate limiting, use Cloudflare Rate Limiting rules
 * or a KV/Durable Objects-based solution.
 *
 * This provides basic protection against abuse within a single isolate.
 *
 * @param maxRequests - Maximum requests per window
 * @param windowMs - Time window in milliseconds
 */
export function rateLimiter(maxRequests: number = 100, windowMs: number = 60000) {
  const requests = new Map<string, { count: number; resetAt: number }>();

  // Cleanup old entries periodically
  const cleanup = () => {
    const now = Date.now();
    for (const [key, value] of requests) {
      if (now > value.resetAt) {
        requests.delete(key);
      }
    }
  };

  return createMiddleware<{ Bindings: Env }>(async (c, next) => {
    // Use IP + path as key for rate limiting
    const ip = c.req.header("cf-connecting-ip") ?? c.req.header("x-forwarded-for") ?? "unknown";
    const key = `${ip}`;
    const now = Date.now();

    // Cleanup every 100 requests
    if (requests.size > 1000) {
      cleanup();
    }

    const existing = requests.get(key);

    if (existing && now < existing.resetAt) {
      if (existing.count >= maxRequests) {
        return c.json(
          {
            success: false,
            error: "RATE_LIMIT_EXCEEDED",
            message: "Too many requests, please try again later",
            retryAfter: Math.ceil((existing.resetAt - now) / 1000),
          },
          429,
        );
      }
      existing.count++;
    } else {
      requests.set(key, { count: 1, resetAt: now + windowMs });
    }

    await next();
  });
}
