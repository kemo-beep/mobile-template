import { createMiddleware } from "hono/factory";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { and, count, eq, gte, gt, lte, sql } from "drizzle-orm";
import type { Env } from "../env";
import type { AuthVariables } from "../auth/middleware";
import { authMiddleware } from "../auth/middleware";
import { requireRole } from "../auth/require-role";
import { createDb } from "../db";
import { apps, devices, session as sessionsTable, user as usersTable } from "../db/schema";
import storeAnalyticsRoutes from "./store-analytics.routes";

const analytics = new OpenAPIHono<{ Bindings: Env; Variables: AuthVariables }>();

analytics.route("/store", storeAnalyticsRoutes);

const CACHE_CONTROL = "public, max-age=60, stale-while-revalidate=120";

function getTimezone(c: { req: { header: (name: string) => string | undefined } }): string {
  const tz = c.req.header("X-Timezone") ?? c.req.header("Accept-Timezone") ?? "UTC";
  if (/^[A-Za-z0-9_+-]+(\/[A-Za-z0-9_+-]+)*$/.test(tz) && tz.length <= 64) return tz;
  return "UTC";
}

const cacheControlMiddleware = createMiddleware<{ Bindings: Env }>(async (c, next) => {
  await next();
  c.header("Cache-Control", CACHE_CONTROL);
});

analytics.use("/*", authMiddleware);
analytics.use("/*", requireRole(["admin", "developer"]));
analytics.use("/*", cacheControlMiddleware);

const bearerSecurity = [{ Bearer: [] }];
const unauthorizedResponse = {
  description: "Authentication required",
  content: {
    "application/json": {
      schema: z.object({
        success: z.literal(false),
        error: z.string().openapi({ example: "UNAUTHORIZED" }),
        message: z.string().openapi({ example: "Authentication required" }),
      }),
    },
  },
};

const periodEnum = z.enum(["7d", "30d", "90d"]);
const optionalAppId = z.object({ appId: z.string().optional() });

const overviewRoute = createRoute({
  method: "get",
  path: "/overview",
  tags: ["Analytics"],
  summary: "Get analytics overview",
  description: "Returns top-level metrics for users, devices, and platform distribution. Optionally filter by appId.",
  security: bearerSecurity,
  request: { query: optionalAppId },
  responses: {
    200: {
      description: "Overview metrics",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              totalUsers: z.number(),
              totalDevices: z.number(),
              usersLast7d: z.number(),
              usersLast30d: z.number(),
              platformBreakdown: z.object({
                ios: z.number(),
                android: z.number(),
                other: z.number(),
              }),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

analytics.openapi(overviewRoute, async (c) => {
  const db = createDb(c.env.DATABASE_URL);
  const { appId } = c.req.valid("query");
  const deviceFilter = appId ? eq(devices.appId, appId) : undefined;
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const [totalUsersRow] = appId
    ? await db
        .select({ count: sql<number>`count(distinct ${devices.userId})::int` })
        .from(devices)
        .where(deviceFilter)
    : await db.select({ count: count() }).from(usersTable);
  const [totalDevicesRow] = deviceFilter
    ? await db.select({ count: count() }).from(devices).where(deviceFilter)
    : await db.select({ count: count() }).from(devices);
  const [usersLast7dRow] = appId
    ? await db
        .select({ count: sql<number>`count(distinct ${devices.userId})::int` })
        .from(devices)
        .where(and(deviceFilter!, gte(devices.createdAt, sevenDaysAgo)))
    : await db
        .select({ count: count() })
        .from(usersTable)
        .where(gte(usersTable.createdAt, sevenDaysAgo));
  const [usersLast30dRow] = appId
    ? await db
        .select({ count: sql<number>`count(distinct ${devices.userId})::int` })
        .from(devices)
        .where(and(deviceFilter!, gte(devices.createdAt, thirtyDaysAgo)))
    : await db
        .select({ count: count() })
        .from(usersTable)
        .where(gte(usersTable.createdAt, thirtyDaysAgo));

  const platformRows = deviceFilter
    ? await db
        .select({ platform: devices.platform, count: count() })
        .from(devices)
        .where(deviceFilter)
        .groupBy(devices.platform)
    : await db
        .select({
          platform: devices.platform,
          count: count(),
        })
        .from(devices)
        .groupBy(devices.platform);

  const platformBreakdown = platformRows.reduce(
    (acc, row) => {
      if (row.platform === "ios") acc.ios = row.count;
      else if (row.platform === "android") acc.android = row.count;
      else acc.other += row.count;
      return acc;
    },
    { ios: 0, android: 0, other: 0 },
  );

  return c.json(
    {
      success: true as const,
      data: {
        totalUsers: totalUsersRow?.count ?? 0,
        totalDevices: totalDevicesRow?.count ?? 0,
        usersLast7d: usersLast7dRow?.count ?? 0,
        usersLast30d: usersLast30dRow?.count ?? 0,
        platformBreakdown,
      },
    },
    200,
  );
});

const growthRoute = createRoute({
  method: "get",
  path: "/users/growth",
  tags: ["Analytics"],
  summary: "Get user growth",
  description: "Returns daily new user counts for the selected period.",
  security: bearerSecurity,
  request: {
    query: z.object({
      period: periodEnum.default("7d"),
      appId: z.string().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "User growth points",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              period: periodEnum,
              points: z.array(
                z.object({
                  date: z.string(),
                  count: z.number(),
                }),
              ),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

analytics.openapi(growthRoute, async (c) => {
  const db = createDb(c.env.DATABASE_URL);
  const tz = getTimezone(c);
  const { period, appId, start: startParam, end: endParam } = c.req.valid("query");
  const days = period === "90d" ? 90 : period === "30d" ? 30 : 7;
  const start = startParam && endParam
    ? new Date(startParam)
    : (() => {
        const s = new Date();
        s.setDate(s.getDate() - days);
        return s;
      })();
  const end = endParam ? new Date(endParam) : new Date();
  const deviceFilter = appId ? eq(devices.appId, appId) : undefined;
  const dateCondition = startParam && endParam
    ? and(gte(usersTable.createdAt, start), lte(usersTable.createdAt, end))
    : gte(usersTable.createdAt, start);
  const deviceDateCondition = startParam && endParam
    ? and(gte(devices.createdAt, start), lte(devices.createdAt, end))
    : gte(devices.createdAt, start);

  const rows = appId
    ? await db
        .select({
          date: sql<string>`to_char(date_trunc('day', ${devices.createdAt} AT TIME ZONE ${sql.raw(`'${tz.replace(/'/g, "''")}'`)}), 'YYYY-MM-DD')`,
          count: count(),
        })
        .from(devices)
        .where(and(deviceFilter!, deviceDateCondition))
        .groupBy(sql`date_trunc('day', ${devices.createdAt} AT TIME ZONE ${sql.raw(`'${tz.replace(/'/g, "''")}'`)})`)
        .orderBy(sql`date_trunc('day', ${devices.createdAt} AT TIME ZONE ${sql.raw(`'${tz.replace(/'/g, "''")}'`)})`)
    : await db
        .select({
          date: sql<string>`to_char(date_trunc('day', ${usersTable.createdAt} AT TIME ZONE ${sql.raw(`'${tz.replace(/'/g, "''")}'`)}), 'YYYY-MM-DD')`,
          count: count(),
        })
        .from(usersTable)
        .where(dateCondition)
        .groupBy(sql`date_trunc('day', ${usersTable.createdAt} AT TIME ZONE ${sql.raw(`'${tz.replace(/'/g, "''")}'`)})`)
        .orderBy(sql`date_trunc('day', ${usersTable.createdAt} AT TIME ZONE ${sql.raw(`'${tz.replace(/'/g, "''")}'`)})`);

  return c.json(
    {
      success: true as const,
      data: {
        period,
        points: rows.map((row) => ({ date: row.date, count: row.count })),
      },
    },
    200,
  );
});

const devicesRoute = createRoute({
  method: "get",
  path: "/devices",
  tags: ["Analytics"],
  summary: "Get device analytics",
  description: "Returns device platform breakdown and active devices in the last 7 days. Optionally filter by appId.",
  security: bearerSecurity,
  request: { query: optionalAppId },
  responses: {
    200: {
      description: "Device analytics",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              totalDevices: z.number(),
              activeDevices7d: z.number(),
              byPlatform: z.array(
                z.object({
                  platform: z.string(),
                  count: z.number(),
                }),
              ),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

analytics.openapi(devicesRoute, async (c) => {
  const db = createDb(c.env.DATABASE_URL);
  const { appId } = c.req.valid("query");
  const deviceFilter = appId ? eq(devices.appId, appId) : undefined;
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const activeWhere = deviceFilter
    ? and(deviceFilter, gte(devices.lastActiveAt, sevenDaysAgo))
    : gte(devices.lastActiveAt, sevenDaysAgo);

  const [totalDevicesRow] = deviceFilter
    ? await db.select({ count: count() }).from(devices).where(deviceFilter)
    : await db.select({ count: count() }).from(devices);
  const [activeDevicesRow] = await db
    .select({ count: count() })
    .from(devices)
    .where(activeWhere);

  const byPlatform = deviceFilter
    ? await db
        .select({ platform: devices.platform, count: count() })
        .from(devices)
        .where(deviceFilter)
        .groupBy(devices.platform)
    : await db
        .select({
          platform: devices.platform,
          count: count(),
        })
        .from(devices)
        .groupBy(devices.platform);

  return c.json(
    {
      success: true as const,
      data: {
        totalDevices: totalDevicesRow?.count ?? 0,
        activeDevices7d: activeDevicesRow?.count ?? 0,
        byPlatform: byPlatform.map((row) => ({
          platform: row.platform,
          count: row.count,
        })),
      },
    },
    200,
  );
});

// ─── GET /apps ─────────────────────────────────────────────────
const appsRoute = createRoute({
  method: "get",
  path: "/apps",
  tags: ["Analytics"],
  summary: "List apps",
  description: "Returns apps the user can access. Admin: all apps. Developer: all apps (assignments TBD).",
  security: bearerSecurity,
  responses: {
    200: {
      description: "List of apps",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              apps: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  slug: z.string(),
                  createdAt: z.string(),
                })
              ),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

analytics.openapi(appsRoute, async (c) => {
  const db = createDb(c.env.DATABASE_URL);
  const allApps = await db.select().from(apps).orderBy(apps.name);
  return c.json(
    {
      success: true as const,
      data: {
        apps: allApps.map((a) => ({
          id: a.id,
          name: a.name,
          slug: a.slug,
          createdAt: a.createdAt.toISOString(),
        })),
      },
    },
    200,
  );
});

const sessionsRoute = createRoute({
  method: "get",
  path: "/sessions",
  tags: ["Analytics"],
  summary: "Get session analytics",
  description: "Returns currently active sessions.",
  security: bearerSecurity,
  responses: {
    200: {
      description: "Session analytics",
      content: {
        "application/json": {
          schema: z.object({
            success: z.literal(true),
            data: z.object({
              activeSessions: z.number(),
            }),
          }),
        },
      },
    },
    401: unauthorizedResponse,
  },
});

analytics.openapi(sessionsRoute, async (c) => {
  const db = createDb(c.env.DATABASE_URL);
  const now = new Date();
  const [activeSessionsRow] = await db
    .select({ count: count() })
    .from(sessionsTable)
    .where(gt(sessionsTable.expiresAt, now));

  return c.json(
    {
      success: true as const,
      data: {
        activeSessions: activeSessionsRow?.count ?? 0,
      },
    },
    200,
  );
});

// ─── GET /export ────────────────────────────────────────────────
analytics.get("/export", async (c) => {
  const format = (c.req.query("format") ?? "csv") as "csv" | "xlsx";
  const period = (c.req.query("period") ?? "7d") as "7d" | "30d" | "90d";
  const startParam = c.req.query("start");
  const endParam = c.req.query("end");
  const appId = c.req.query("appId") ?? undefined;

  const db = createDb(c.env.DATABASE_URL);
  const days = period === "90d" ? 90 : period === "30d" ? 30 : 7;
  const start = startParam && endParam ? new Date(startParam) : (() => { const s = new Date(); s.setDate(s.getDate() - days); return s; })();
  const end = endParam ? new Date(endParam) : new Date();
  const deviceFilter = appId ? eq(devices.appId, appId) : undefined;
  const rangeCondition = startParam && endParam
    ? and(gte(usersTable.createdAt, start), lte(usersTable.createdAt, end))
    : gte(usersTable.createdAt, start);
  const deviceRangeCondition = startParam && endParam
    ? and(gte(devices.createdAt, start), lte(devices.createdAt, end))
    : gte(devices.createdAt, start);
  const sessionRangeCondition = startParam && endParam
    ? and(gte(sessionsTable.createdAt, start), lte(sessionsTable.createdAt, end))
    : gte(sessionsTable.createdAt, start);

  type DayRow = { date: string; users: number; devices: number; sessions: number };
  const dateMap = new Map<string, DayRow>();
  const dayCount = startParam && endParam
    ? Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1
    : days;

  for (let i = 0; i < dayCount; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    dateMap.set(dateStr, { date: dateStr, users: 0, devices: 0, sessions: 0 });
  }

  const usersByDay = appId
    ? await db
        .select({
          date: sql<string>`to_char(date_trunc('day', ${devices.createdAt}), 'YYYY-MM-DD')`,
          count: count(),
        })
        .from(devices)
        .where(and(deviceFilter!, deviceRangeCondition))
        .groupBy(sql`date_trunc('day', ${devices.createdAt})`)
    : await db
        .select({
          date: sql<string>`to_char(date_trunc('day', ${usersTable.createdAt}), 'YYYY-MM-DD')`,
          count: count(),
        })
        .from(usersTable)
        .where(rangeCondition)
        .groupBy(sql`date_trunc('day', ${usersTable.createdAt})`);

  const devicesByDay = deviceFilter
    ? await db
        .select({
          date: sql<string>`to_char(date_trunc('day', ${devices.createdAt}), 'YYYY-MM-DD')`,
          count: count(),
        })
        .from(devices)
        .where(and(deviceFilter, deviceRangeCondition))
        .groupBy(sql`date_trunc('day', ${devices.createdAt})`)
    : await db
        .select({
          date: sql<string>`to_char(date_trunc('day', ${devices.createdAt}), 'YYYY-MM-DD')`,
          count: count(),
        })
        .from(devices)
        .where(deviceRangeCondition)
        .groupBy(sql`date_trunc('day', ${devices.createdAt})`);

  const sessionsByDay = await db
    .select({
      date: sql<string>`to_char(date_trunc('day', ${sessionsTable.createdAt}), 'YYYY-MM-DD')`,
      count: count(),
    })
    .from(sessionsTable)
    .where(sessionRangeCondition)
    .groupBy(sql`date_trunc('day', ${sessionsTable.createdAt})`);

  for (const row of usersByDay) {
    const r = dateMap.get(row.date);
    if (r) r.users = row.count;
  }
  for (const row of devicesByDay) {
    const r = dateMap.get(row.date);
    if (r) r.devices = row.count;
  }
  for (const row of sessionsByDay) {
    const r = dateMap.get(row.date);
    if (r) r.sessions = row.count;
  }

  const rows = Array.from(dateMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, r]) => r);

  const cacheHeaders = { "Cache-Control": CACHE_CONTROL };

  if (format === "csv") {
    const header = "date,users,devices,sessions";
    const body = rows.map((r) => `${r.date},${r.users},${r.devices},${r.sessions}`).join("\n");
    const csv = `${header}\n${body}`;
    return new Response(csv, {
      headers: {
        ...cacheHeaders,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="analytics-${period}.csv"`,
      },
    });
  }

  if (format === "xlsx") {
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Analytics");
    const buf = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    return new Response(buf, {
      headers: {
        ...cacheHeaders,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="analytics-${period}.xlsx"`,
      },
    });
  }

  return c.json({ success: false, error: "Invalid format" }, 400);
});

export default analytics;
