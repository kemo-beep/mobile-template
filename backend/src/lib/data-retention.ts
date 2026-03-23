/**
 * Data retention configuration for analytics and related data.
 *
 * ANALYTICS_RETENTION_DAYS: How long to retain analytics data (default 90).
 * No automated purge in MVP — manual cleanup or future cron job.
 *
 * To enable retention enforcement, add a scheduled worker or cron that
 * deletes rows older than ANALYTICS_RETENTION_DAYS from relevant tables.
 */
export const ANALYTICS_RETENTION_DAYS = parseInt(
  process.env.ANALYTICS_RETENTION_DAYS ?? "90",
  10,
);

export function getRetentionCutoffDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() - ANALYTICS_RETENTION_DAYS);
  return d;
}
