/**
 * Typed API errors for network and HTTP failures.
 * Thrown by the API client so React Query can handle them.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
