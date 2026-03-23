import { createMiddleware } from "hono/factory";
import type { Env } from "../env";
import { AppError } from "../lib/errors";

/**
 * Global error handler middleware.
 *
 * Catches all errors thrown in route handlers and returns
 * a standardized JSON error response. Distinguishes between
 * known AppErrors and unexpected errors.
 */
export const errorHandler = createMiddleware<{ Bindings: Env }>(
  async (c, next) => {
    try {
      await next();
    } catch (err: unknown) {
      const requestId = (c as { get?: (k: string) => unknown }).get?.("requestId") as string | undefined;

      const withRequestId = (body: object) =>
        requestId ? { ...body, requestId } : body;

      // Known application errors
      if (err instanceof AppError) {
        return c.json(
          withRequestId({
            success: false,
            error: err.code,
            message: err.message,
            ...(err.details ? { details: err.details } : {}),
          }),
          err.statusCode as 400,
        );
      }

      // Zod validation errors
      if (err instanceof Error && err.name === "ZodError") {
        return c.json(
          withRequestId({
            success: false,
            error: "VALIDATION_ERROR",
            message: "Request validation failed",
            details: JSON.parse(err.message),
          }),
          400,
        );
      }

      // Unexpected errors — don't leak internals in production
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      const { log } = await import("../lib/logger");
      log(
        { level: "error", message: "Unhandled error", requestId, error: message },
        c.env
      );
      return c.json(
        withRequestId({
          success: false,
          error: "INTERNAL_ERROR",
          message: "An unexpected error occurred",
        }),
        500,
      );
    }
  },
);
