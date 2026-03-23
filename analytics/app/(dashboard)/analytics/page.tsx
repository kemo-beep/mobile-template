"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DevicesAnalytics,
  getAnalyticsExport,
  getAnalyticsOverview,
  getDevicesAnalytics,
  getSessionsAnalytics,
  getUserGrowth,
} from "@/lib/api";
import { useApp } from "@/contexts/app-context";
import { TrendingUpIcon } from "lucide-react";

type GrowthPeriod = "7d" | "30d" | "90d";

type DashboardState = {
  overview: Awaited<ReturnType<typeof getAnalyticsOverview>> | null;
  devices: DevicesAnalytics | null;
  growth: Awaited<ReturnType<typeof getUserGrowth>> | null;
  activeSessions: number;
};

const growthChartConfig = {
  count: { label: "New users", color: "var(--chart-1)" },
} satisfies ChartConfig;

const barChartConfig = {
  ios: { label: "iOS", color: "var(--chart-1)" },
  android: { label: "Android", color: "var(--chart-2)" },
} satisfies ChartConfig;

const PIE_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export default function AnalyticsPage() {
  const { selectedAppId } = useApp();
  const [period, setPeriod] = useState<GrowthPeriod>("7d");
  const [customStart, setCustomStart] = useState<string>("");
  const [customEnd, setCustomEnd] = useState<string>("");
  const [exporting, setExporting] = useState<"csv" | "xlsx" | null>(null);
  const useCustomRange = !!customStart && !!customEnd;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<DashboardState>({
    overview: null,
    devices: null,
    growth: null,
    activeSessions: 0,
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [overview, growth, devices, sessions] = await Promise.all([
          getAnalyticsOverview(selectedAppId),
          getUserGrowth(period, selectedAppId, useCustomRange ? customStart : undefined, useCustomRange ? customEnd : undefined),
          getDevicesAnalytics(selectedAppId),
          getSessionsAnalytics(),
        ]);
        setState({
          overview,
          growth,
          devices,
          activeSessions: sessions.activeSessions,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [period, selectedAppId, customStart, customEnd, useCustomRange]);

  const pieData = useMemo(() => {
    const byPlatform = state.devices?.byPlatform ?? [];
    return byPlatform.map((entry, i) => ({
      name: entry.platform || "unknown",
      value: entry.count,
      fill: PIE_COLORS[i % PIE_COLORS.length],
    }));
  }, [state.devices]);

  const barData = useMemo(() => {
    const pb = state.overview?.platformBreakdown;
    if (!pb) return [];
    return [
      { platform: "iOS", count: pb.ios, fill: "var(--chart-1)" },
      { platform: "Android", count: pb.android, fill: "var(--chart-2)" },
      { platform: "Other", count: pb.other, fill: "var(--chart-3)" },
    ].filter((d) => d.count > 0);
  }, [state.overview]);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">App metrics</h2>
          <p className="text-sm text-muted-foreground">
            Internal growth, devices, and session metrics for developers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={period === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("7d")}
          >
            Last 7 days
          </Button>
          <Button
            variant={period === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("30d")}
          >
            Last 30 days
          </Button>
          <Button
            variant={period === "90d" ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod("90d")}
          >
            Last 90 days
          </Button>
          <span className="text-sm text-muted-foreground">or</span>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="rounded border border-input bg-background px-2 py-1 text-sm"
            />
            –
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="rounded border border-input bg-background px-2 py-1 text-sm"
            />
          </label>
          <Button
            variant="outline"
            size="sm"
            disabled={!!exporting}
            onClick={async () => {
              setExporting("csv");
              try {
                const blob = await getAnalyticsExport("csv", period, selectedAppId, useCustomRange ? customStart : undefined, useCustomRange ? customEnd : undefined);
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `analytics-${period}.csv`;
                a.click();
                URL.revokeObjectURL(url);
              } finally {
                setExporting(null);
              }
            }}
          >
            {exporting === "csv" ? "Exporting…" : "Export CSV"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!!exporting}
            onClick={async () => {
              setExporting("xlsx");
              try {
                const blob = await getAnalyticsExport("xlsx", period, selectedAppId, useCustomRange ? customStart : undefined, useCustomRange ? customEnd : undefined);
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `analytics-${period}.xlsx`;
                a.click();
                URL.revokeObjectURL(url);
              } finally {
                setExporting(null);
              }
            }}
          >
            {exporting === "xlsx" ? "Exporting…" : "Export XLSX"}
          </Button>
        </div>
      </section>

      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}

      <section className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={state.overview?.totalUsers ?? 0}
          loading={loading}
          badge="All time"
        />
        <MetricCard
          title="Total Devices"
          value={state.overview?.totalDevices ?? 0}
          loading={loading}
          badge="Registered"
        />
        <MetricCard
          title="Active Devices (7d)"
          value={state.devices?.activeDevices7d ?? 0}
          loading={loading}
          badge="Last week"
        />
        <MetricCard
          title="Active Sessions"
          value={state.activeSessions}
          loading={loading}
          badge="Now"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">User Growth</CardTitle>
            <CardDescription>Daily new signups ({period})</CardDescription>
            <CardAction>
              <Badge variant="outline">
                <TrendingUpIcon className="size-3" />
                {period}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-0">
            {loading ? (
              <Skeleton className="h-48 w-full rounded-lg" />
            ) : (
              <ChartContainer config={growthChartConfig} className="max-h-[200px] w-full">
                <AreaChart
                  data={state.growth?.points ?? []}
                  margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={8}
                    axisLine={false}
                    tickFormatter={(v) => String(v).slice(5)}
                  />
                  <YAxis allowDecimals={false} hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" hideLabel />}
                  />
                  <Area
                    dataKey="count"
                    type="linear"
                    fill="var(--color-count)"
                    fillOpacity={0.4}
                    stroke="var(--color-count)"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl pb-0">
          <CardHeader>
            <CardTitle className="text-lg">Device Platform Breakdown</CardTitle>
            <CardDescription>By platform</CardDescription>
            <CardAction>
              <Badge variant="secondary">
                {state.devices?.totalDevices ?? 0} total
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0">
            {loading ? (
              <Skeleton className="mx-4 h-48 w-[calc(100%-2rem)] rounded-lg" />
            ) : pieData.length > 0 ? (
              <ChartContainer config={{}} className="h-48 w-full">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideIndicator />}
                  />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                No device data yet
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {barData.length > 0 && (
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">Platform distribution</CardTitle>
            <CardDescription>iOS vs Android vs Other</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-0">
            <ChartContainer config={barChartConfig} className="max-h-[180px] w-full">
              <BarChart
                data={barData}
                layout="vertical"
                margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
              >
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="platform"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={60}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="count" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function MetricCard({
  title,
  value,
  loading,
  badge,
}: {
  title: string;
  value: number;
  loading: boolean;
  badge?: string;
}) {
  return (
    <Card className="@container/card rounded-2xl">
      <CardHeader>
        <CardDescription className="text-xs font-medium uppercase tracking-wider">
          {title}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {loading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            value.toLocaleString()
          )}
        </CardTitle>
        {badge ? (
          <CardAction>
            <Badge variant="outline">{badge}</Badge>
          </CardAction>
        ) : null}
      </CardHeader>
    </Card>
  );
}
