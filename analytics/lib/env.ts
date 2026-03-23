/**
 * Environment variable validation for the analytics dashboard.
 * Call at app entry or in components that need env at runtime.
 */

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value || typeof value !== "string" || value.trim() === "") {
    if (typeof window === "undefined") {
      throw new Error(
        `Missing required environment variable: ${key}. Set it in .env.local or your deployment config.`,
      );
    }
    return "";
  }
  return value.trim();
}

function getOptionalEnv(key: string): string | undefined {
  const value = process.env[key];
  if (!value || typeof value !== "string" || value.trim() === "") {
    return undefined;
  }
  return value.trim();
}

export const env = {
  /** API base URL (e.g. http://localhost:8787 or https://api.example.com) */
  get API_URL(): string {
    return getRequiredEnv("NEXT_PUBLIC_API_URL") || "http://localhost:8787";
  },

  /** App URL for OAuth callbacks (optional, defaults to same origin) */
  get APP_URL(): string | undefined {
    return getOptionalEnv("NEXT_PUBLIC_APP_URL");
  },
};

export function validateEnv(): void {
  getRequiredEnv("NEXT_PUBLIC_API_URL");
}
