import { createMiddleware } from "hono/factory";
import type { Env } from "../env";
import type { RequestIdVariables } from "./request-id";
import { log } from "../lib/logger";

/**
 * Request logger middleware.
 *
 * Logs incoming requests with method, path, response status, duration, and request ID.
 * When AXIOM_TOKEN and AXIOM_DATASET are set, also ships logs to Axiom for APM.
 */
export const logger = createMiddleware<{ Bindings: Env; Variables: RequestIdVariables }>(async (c, next) => {
  const start = Date.now();
  const method = c.req.method;
  const path = c.req.path;
  const requestId = c.get("requestId");

  await next();

  const duration = Date.now() - start;
  const status = c.res.status;

  log(
    {
      level: status >= 500 ? "error" : status >= 400 ? "warn" : "info",
      message: `${method} ${path} ${status}`,
      requestId,
      method,
      path,
      status,
      duration: `${duration}ms`,
    },
    c.env
  );
});
