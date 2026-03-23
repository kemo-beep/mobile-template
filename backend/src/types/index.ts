/**
 * Shared TypeScript types for the application.
 * Import from '@/types' (or '../types') in your modules.
 */

// Re-export commonly used types
export type { Env } from "../env";
export type { Database } from "../db";
export type { AuthVariables } from "../auth/middleware";
export type {
  ApiResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
} from "../lib/api-response";

// ─── Utility Types ─────────────────────────────────────────────

/** Make specific keys optional */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Make specific keys required */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/** Pagination metadata */
export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
};
