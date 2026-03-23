"use client";

import type { ReactNode } from "react";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  FilterIcon,
  LayoutDashboardIcon,
  PlusIcon,
  SearchIcon,
  SmartphoneIcon,
  TrendingUpIcon,
} from "lucide-react";
import { LandingLogoMark } from "@/components/landing-logo-mark";
import { cn } from "@/lib/utils";

/**
 * Stylized product preview — wide desktop aspect (~2.2–2.5∶1), extra vertical room
 * for metrics + board (inspired by full analytics dashboards).
 */
export function LandingDashboardPreview({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_24px_80px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/5",
          "dark:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.4)] dark:ring-white/10",
          /* Taller preview: reference reads as ~1.8–2∶1 width∶height (not a short strip) */
          "min-h-[min(62vw,460px)] sm:min-h-[min(56vw,520px)] md:min-h-[min(50vw,540px)]",
          "lg:min-h-[580px] lg:aspect-9/5 lg:max-h-[min(90vh,720px)]",
          "xl:min-h-[620px] xl:aspect-15/8 xl:max-h-[min(90vh,760px)]"
        )}
      >
        <div className="flex h-full min-h-0 flex-col lg:flex-row">
          {/* Left sidebar */}
          <aside className="hidden w-[210px] shrink-0 flex-col border-b border-border/60 bg-muted/30 p-5 lg:flex lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-2.5 font-semibold text-foreground">
              <LandingLogoMark />
              <span className="text-sm">Analytics</span>
            </div>
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Favorites
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              {[
                "User growth",
                "Device breakdown",
                "Session overview",
                "Export reports",
              ].map((label, i) => (
                <li
                  key={label}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-2.5 py-2",
                    i === 0 ? "bg-muted/80 text-foreground" : "hover:bg-muted/60"
                  )}
                >
                  <FileTextIcon className="size-3.5 shrink-0 opacity-70" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto hidden pt-8 lg:block">
              <div className="rounded-xl border border-border/50 bg-card/80 p-3 text-[10px] text-muted-foreground">
                <p className="font-medium text-foreground">API status</p>
                <p className="mt-1">All systems operational</p>
              </div>
            </div>
          </aside>

          {/* Main analytics */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="text-foreground/80">App</span>
                <span className="text-muted-foreground/60">/</span>
                <span className="font-medium text-foreground">Overview</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-9 min-w-[180px] items-center gap-2 rounded-full border border-border/80 bg-muted/30 px-3.5 text-xs text-muted-foreground sm:min-w-[220px]">
                  <SearchIcon className="size-3.5 shrink-0" />
                  <span className="hidden flex-1 sm:inline">Search metrics…</span>
                  <kbd className="ml-auto hidden rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:inline">
                    ⌘ /
                  </kbd>
                </div>
                <button
                  type="button"
                  className="flex size-9 items-center justify-center rounded-full border border-border/80 bg-muted/20"
                  aria-label="Notifications"
                >
                  <BellIcon className="size-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total registered users
                </p>
                <p className="mt-1 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl lg:text-5xl">
                  12,847
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-medium"
                >
                  <CalendarIcon className="size-3.5" />
                  Select dates
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-medium"
                >
                  <FilterIcon className="size-3.5" />
                  Filters
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <MetricPreviewCard
                title="New signups (7d)"
                value="342"
                delta="+18%"
                deltaPositive
                bars="green"
                icon={<TrendingUpIcon className="size-4" />}
              />
              <MetricPreviewCard
                title="Active devices"
                value="8.2k"
                delta="+6%"
                deltaPositive
                bars="orange"
                icon={<SmartphoneIcon className="size-4" />}
              />
              <MetricPreviewCard
                title="Active sessions"
                value="124"
                delta="Live"
                deltaPositive
                bars="purple"
                icon={<LayoutDashboardIcon className="size-4" />}
              />
            </div>

            {/* Lower board — adds vertical mass like campaign / kanban rows in reference */}
            <div className="mt-6 flex min-h-0 flex-1 flex-col border-t border-border/40 pt-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-foreground">
                  Growth overview
                </span>
                <button
                  type="button"
                  className="text-[10px] font-medium text-muted-foreground hover:text-foreground"
                >
                  View all
                </button>
              </div>
              <div className="mt-4 grid min-h-[120px] flex-1 grid-cols-1 gap-3 sm:min-h-[140px] sm:grid-cols-3 lg:min-h-[160px]">
                <BoardColumn title="Last 7 days" count={4} accent="emerald" />
                <BoardColumn title="Last 30 days" count={6} accent="violet" />
                <BoardColumn title="Exports" count={3} accent="orange" />
              </div>
            </div>
          </div>

          {/* Right column — recent (lg+ to match wide dashboard) */}
          <aside className="hidden w-[240px] shrink-0 flex-col border-t border-border/60 bg-muted/20 p-5 lg:flex lg:border-l lg:border-t-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Recent exports
            </p>
            <ul className="mt-4 flex flex-1 flex-col space-y-3">
              {[
                { title: "Growth report — March", time: "Updated 4 min ago" },
                { title: "Devices CSV", time: "Updated 2 hours ago" },
                { title: "Sessions snapshot", time: "Updated 1 day ago" },
                { title: "Weekly summary", time: "Updated 3 days ago" },
              ].map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-border/50 bg-card p-3 shadow-sm"
                >
                  <div className="flex gap-2.5">
                    <div className="size-11 shrink-0 rounded-lg bg-linear-to-br from-[rgba(181,255,177,0.55)] to-muted" />
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-xs font-medium leading-snug">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-border/40 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Team
              </p>
              <ul className="mt-3 space-y-2.5 text-xs">
                {["Alex — Admin", "Sam — Developer"].map((name) => (
                  <li key={name} className="flex items-center gap-2">
                    <span className="relative flex size-8 items-center justify-center rounded-full bg-muted text-[10px] font-medium">
                      {name[0]}
                      <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-2 ring-card" />
                    </span>
                    <span className="text-muted-foreground">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function BoardColumn({
  title,
  count,
  accent,
}: {
  title: string;
  count: number;
  accent: "emerald" | "violet" | "orange";
}) {
  const dot = {
    emerald: "bg-emerald-500",
    violet: "bg-violet-500",
    orange: "bg-orange-400",
  }[accent];

  return (
    <div className="flex min-h-[120px] flex-col rounded-2xl border border-border/50 bg-muted/20 p-3 sm:min-h-0">
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        <span>{title}</span>
        <span className="rounded-md bg-muted/80 px-1.5 py-0.5 tabular-nums text-foreground">
          {count}
        </span>
      </div>
      <div className="mt-3 flex flex-1 flex-col gap-2">
        <div className="flex flex-1 flex-col justify-center rounded-xl border border-border/40 bg-card p-2.5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className={cn("size-2 rounded-full", dot)} />
            <span className="text-[10px] font-medium leading-tight text-foreground">
              Daily active users trend
            </span>
          </div>
          <div className="mt-2 h-10 rounded-md bg-muted/40">
            <div className="flex h-full items-end gap-0.5 px-1 pb-1">
              {[35, 55, 40, 70, 50, 85, 65, 90].map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-sm",
                    accent === "emerald" && "bg-emerald-500/70",
                    accent === "violet" && "bg-violet-500/70",
                    accent === "orange" && "bg-orange-400/80"
                  )}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-[9px] text-muted-foreground">Updated 12 min ago</p>
        </div>
        <button
          type="button"
          className="flex h-8 items-center justify-center gap-1 rounded-xl border border-dashed border-border/60 text-[10px] font-medium text-muted-foreground hover:bg-muted/40"
        >
          <PlusIcon className="size-3" />
          Add view
        </button>
      </div>
    </div>
  );
}

function MetricPreviewCard({
  title,
  value,
  delta,
  deltaPositive,
  bars,
  icon,
}: {
  title: string;
  value: string;
  delta: string;
  deltaPositive?: boolean;
  bars: "green" | "orange" | "purple";
  icon: ReactNode;
}) {
  const barColors = {
    green: "bg-emerald-500/80",
    orange: "bg-orange-400/90",
    purple: "bg-violet-500/80",
  };
  const deltaClass =
    delta === "Live"
      ? "text-emerald-600 dark:text-emerald-400"
      : deltaPositive
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-orange-600 dark:text-orange-400";

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums sm:text-[1.65rem]">{value}</p>
          <p className={`mt-0.5 text-[10px] font-medium ${deltaClass}`}>{delta}</p>
        </div>
        <div className="rounded-xl bg-muted/50 p-2 text-muted-foreground">{icon}</div>
      </div>
      <div className="mt-4 flex h-11 items-end gap-1">
        {[40, 65, 45, 80, 55, 90, 70, 50, 75].map((h, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-md",
              barColors[bars]
            )}
            style={{ height: `${h}%`, opacity: 0.35 + (i % 3) * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
