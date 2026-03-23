import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export type Database = NeonHttpDatabase<typeof schema>;

/**
 * Creates a Drizzle ORM database instance connected to NeonDB.
 *
 * This should be called per-request in Cloudflare Workers since each
 * request may run in a different isolate. The Neon HTTP driver is used
 * for optimal performance with serverless (single query, no persistent connection).
 *
 * @param databaseUrl - NeonDB connection string from env bindings
 * @returns Drizzle ORM database instance with full schema types
 */
export function createDb(databaseUrl: string): Database {
  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}
