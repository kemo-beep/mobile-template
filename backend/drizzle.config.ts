import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Verbose logging during migrations
  verbose: true,
  // Strict mode — confirm before applying destructive changes
  strict: true,
});
