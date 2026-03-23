import type { Context } from "hono";

/**
 * Standardized API response helpers.
 * Use these in all route handlers for consistent response format.
 */

export type ApiSuccessResponse<T = unknown> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: string;
  message: string;
  details?: unknown;
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Send a success response with data.
 *
 * @example
 * ```ts
 * return success(c, { user: { id: "1", name: "John" } });
 * return success(c, { created: true }, 201);
 * ```
 */
export function success<T>(c: Context, data: T, status: number = 200) {
  return c.json({ success: true, data } as ApiSuccessResponse<T>, status as 200);
}

/**
 * Send a paginated success response.
 *
 * @example
 * ```ts
 * return paginated(c, items, { page: 1, pageSize: 20, total: 100 });
 * ```
 */
export function paginated<T>(
  c: Context,
  data: T[],
  pagination: { page: number; pageSize: number; total: number },
) {
  return c.json(
    {
      success: true,
      data,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.pageSize),
        hasMore: pagination.page * pagination.pageSize < pagination.total,
      },
    },
    200,
  );
}

/**
 * Send an error response.
 *
 * @example
 * ```ts
 * return error(c, "NOT_FOUND", "User not found", 404);
 * ```
 */
export function error(
  c: Context,
  code: string,
  message: string,
  status: number = 400,
  details?: unknown,
) {
  return c.json(
    {
      success: false,
      error: code,
      message,
      ...(details ? { details } : {}),
    } as ApiErrorResponse,
    status as 400,
  );
}
