/**
 * Structured logger with optional Axiom log shipping.
 *
 * When AXIOM_TOKEN and AXIOM_DATASET are set, logs are also shipped to Axiom
 * for querying and dashboards. Uses fire-and-forget to avoid blocking.
 */

const AXIOM_URL = "https://api.axiom.co";

export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogEntry = {
  level: LogLevel;
  message: string;
  requestId?: string;
  method?: string;
  path?: string;
  status?: number;
  duration?: string;
  error?: string;
  [key: string]: unknown;
};

function formatTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Log to console (always) and optionally ship to Axiom.
 */
export function log(
  entry: LogEntry,
  env?: { AXIOM_TOKEN?: string; AXIOM_DATASET?: string }
): void {
  const payload = { ...entry, _time: formatTimestamp() };
  const line = JSON.stringify(payload);
  console.log(line);

  if (env?.AXIOM_TOKEN && env?.AXIOM_DATASET) {
    shipToAxiom(env.AXIOM_TOKEN, env.AXIOM_DATASET, [payload]).catch((err) => {
      console.error("Axiom ingest failed:", err);
    });
  }
}

async function shipToAxiom(
  token: string,
  dataset: string,
  events: Record<string, unknown>[]
): Promise<void> {
  const url = `${AXIOM_URL}/v1/ingest/${dataset}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(events),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Axiom ${res.status}: ${text}`);
  }
}
