import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDb } from "../db";
import * as schema from "../db/schema";
import type { Env } from "../env";

/**
 * Creates a Better Auth instance configured for this application.
 *
 * This is a factory function — called per-request in Cloudflare Workers
 * since env bindings are only available in the request context.
 *
 * @param env - Cloudflare Workers environment bindings
 * @returns Configured Better Auth instance
 */
export function createAuth(env: Env) {
  const db = createDb(env.DATABASE_URL);

  return betterAuth({
    plugins: [expo()],
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),

    // Secret for signing tokens — must be at least 32 characters
    secret: env.BETTER_AUTH_SECRET,

    // Base URL of the API — used for redirects and callbacks
    baseURL: env.BETTER_AUTH_URL,

    // ─── Email & Password Auth ───────────────────────────────
    emailAndPassword: {
      enabled: true,
      // Customize password requirements:
      // minPasswordLength: 8,
      // maxPasswordLength: 128,
    },

    // ─── Session Configuration ───────────────────────────────
    session: {
      // How long sessions last (in seconds) — 7 days default
      expiresIn: 60 * 60 * 24 * 7,
      // How often to refresh the session — 1 day
      updateAge: 60 * 60 * 24,
    },

    // ─── Trusted Origins ─────────────────────────────────────
    // Covers Expo, native deep links, and web
    trustedOrigins: [
      "http://localhost:8787",
      "http://localhost:3000", // Web landing
      "http://localhost:3001", // Analytics dashboard
      "http://localhost:8081", // Expo web
      "http://127.0.0.1:8081",
      "exp://", // Expo Go dev
      "exp://localhost",
      "capacitor://localhost", // Capacitor hybrid apps
      "mobile://", // Expo app scheme (app.json)
      "myapp://", // Generic scheme for other apps
      // Add production origins: "https://your-app.com"
    ],

    // ─── Social Providers ────────────────────────────────────
    // Apple Sign-In — required for iOS app store if you offer social login
    socialProviders: {
      ...(env.APPLE_CLIENT_ID &&
        env.APPLE_CLIENT_SECRET && {
          apple: {
            clientId: env.APPLE_CLIENT_ID,
            clientSecret: env.APPLE_CLIENT_SECRET,
          },
        }),
      ...(env.GOOGLE_CLIENT_ID &&
        env.GOOGLE_CLIENT_SECRET && {
          google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          },
        }),
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
