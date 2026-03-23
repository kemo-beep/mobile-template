import { createMiddleware } from "hono/factory";
import type { Env } from "../env";

/**
 * Variables set by the request ID middleware.
 */
export type RequestIdVariables = {
  requestId: string;
};

/**
 * Request ID middleware.
 *
 * Generates a unique ID per request and sets it on the context.
 * Also sets X-Request-Id response header for debugging and support.
 */
export const requestIdMiddleware = createMiddleware<
  { Bindings: Env; Variables: RequestIdVariables }
>(async (c, next) => {
  const incomingId = c.req.header("X-Request-Id");
  const requestId = incomingId && /^[a-zA-Z0-9\-]{1,64}$/.test(incomingId)
    ? incomingId
    : crypto.randomUUID();

  c.set("requestId", requestId);
  await next();
  c.header("X-Request-Id", requestId);
});
