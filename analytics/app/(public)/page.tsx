"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import {
  ChartBarIcon,
  UsersIcon,
  SmartphoneIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  ActivityIcon,
  QuoteIcon,
  ZapIcon,
  DatabaseIcon,
} from "lucide-react";
import { LandingDashboardPreview } from "@/components/landing-dashboard-preview";

const features = [
  {
    icon: UsersIcon,
    title: "User metrics",
    description: "Track total users, signups, and growth trends over time.",
    chartType: "line" as const,
  },
  {
    icon: SmartphoneIcon,
    title: "Device analytics",
    description: "Platform breakdown (iOS vs Android), active devices, and engagement.",
    chartType: "bar" as const,
  },
  {
    icon: TrendingUpIcon,
    title: "Growth charts",
    description: "Visualize daily signups, retention, and cohort performance.",
    chartType: "area" as const,
  },
  {
    icon: ChartBarIcon,
    title: "Session insights",
    description: "Monitor active sessions and real-time usage patterns.",
    chartType: "gauge" as const,
  },
];

const workflowSteps = [
  {
    icon: ZapIcon,
    title: "Connect your app",
    description: "Use your existing backend credentials to sign in.",
  },
  {
    icon: DatabaseIcon,
    title: "Data syncs automatically",
    description: "Users, devices, and sessions flow into your dashboard.",
  },
  {
    icon: ChartBarIcon,
    title: "Export & share",
    description: "CSV, XLSX export and role-based access for your team.",
  },
];

export default function Page() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/analytics");
    }
  }, [isPending, router, session]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-background">
        <div className="absolute inset-0 landing-green-glow" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--muted)_0.5px,transparent_0.5px),linear-gradient(to_bottom,var(--muted)_0.5px,transparent_0.5px)] bg-[length:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,black_40%,transparent)]" />

        <div className="relative pt-16 pb-4 sm:pt-20 sm:pb-6 lg:pt-24 lg:pb-8">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
                New
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/10 bg-emerald-50/50 px-4 py-1.5 text-xs font-medium text-emerald-800/80 dark:border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-400/80">
                <ActivityIcon className="size-3.5" />
                Internal metrics
                <ArrowRightIcon className="size-3 opacity-70" />
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tighter text-balance sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Manage every app metric from a single platform.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Bring users, devices, growth, and session data together — clearly organized, instantly accessible, and built for smarter product decisions.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="h-12 rounded-full px-8 text-base font-semibold shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] ring-1 ring-zinc-900/5 bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Get started
                  <ArrowRightIcon className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-zinc-200 bg-white px-8 text-base font-semibold hover:bg-zinc-50 shadow-sm text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
                >
                  Book a demo
                  <ArrowRightIcon className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>

          <LandingDashboardPreview className="mt-10 sm:mt-14 lg:mt-16" />

          <div className="mx-auto max-w-5xl px-4 pb-14 pt-10 text-center sm:px-6 sm:pb-16 lg:px-8">
            <p className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Trusted by developers building mobile apps
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground opacity-70">
              <span className="text-sm font-semibold">Expo</span>
              <span className="text-sm font-semibold">Cloudflare</span>
              <span className="text-sm font-semibold">Neon</span>
              <span className="text-sm font-semibold">Vercel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section id="about" className="relative scroll-mt-24 py-20 landing-green-section">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            All your app metrics in one place
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Stop switching between tools. Get users, devices, growth, and sessions in a single dashboard — built for mobile app developers.
          </p>
        </div>
      </section>

      {/* Feature cards with chart mockups */}
      <div id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          What you get
        </h2>
        <p className="mt-2 text-center text-2xl font-semibold sm:text-3xl">
          All the metrics you need to understand your app
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="overflow-hidden rounded-[1.75rem] border-border/40 bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="gap-4 p-8">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100/60 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <feature.icon className="size-6 shadow-sm" />
                </div>
                <CardTitle className="text-lg tracking-tight font-semibold mt-2">{feature.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
                <div className="mt-6 h-28 rounded-xl bg-muted/30 p-4 border border-border/50">
                  <ChartMockup type={feature.chartType} />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <section className="relative py-20 landing-green-section">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col overflow-hidden rounded-[2.5rem] border border-border/40 bg-card shadow-xl shadow-emerald-900/5 sm:flex-row">
            <div className="flex shrink-0 items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50/50 to-white dark:from-emerald-950/40 dark:via-emerald-900/10 dark:to-transparent p-12 sm:w-80">
              <div className="flex size-24 items-center justify-center rounded-full bg-white dark:bg-emerald-900/20 shadow-lg shadow-emerald-900/5">
                <QuoteIcon className="size-10 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-center p-10 sm:p-16 relative">
              <div className="absolute inset-0 bg-gradient-to-l from-white via-white to-transparent dark:from-background dark:via-background pointer-events-none" />
              <blockquote className="relative z-10 text-2xl font-semibold leading-relaxed sm:text-[1.75rem] tracking-tight">
                &ldquo;Having users, devices, and sessions in one dashboard saves us hours every week. The exports make reporting a breeze.&rdquo;
              </blockquote>
              <p className="relative z-10 mt-6 text-base font-medium text-emerald-600 dark:text-emerald-500">
                — Developer, Mobile app team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles / insights */}
      <section id="articles" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Articles
        </h2>
        <p className="mt-2 text-center text-2xl font-semibold sm:text-3xl">
          Insights for app teams
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Reading your first cohort report",
              category: "Analytics",
              date: "Mar 18, 2026",
            },
            {
              title: "iOS vs Android: what the device split tells you",
              category: "Growth",
              date: "Mar 12, 2026",
            },
            {
              title: "Exporting metrics for board updates",
              category: "Reporting",
              date: "Mar 2, 2026",
            },
          ].map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-[1.75rem] border border-border/40 bg-card text-left shadow-sm transition-all hover:shadow-xl hover:-translate-y-1.5"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-emerald-100/60 via-emerald-50/30 to-muted/20 dark:from-emerald-900/30 dark:via-emerald-950/20 dark:to-muted group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <div className="p-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {post.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm font-medium text-muted-foreground">{post.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Workflow / How it works */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          How it works
        </h2>
        <p className="mt-2 text-center text-2xl font-semibold sm:text-3xl">
          Get started in minutes
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {workflowSteps.map((step, i) => (
            <Card
              key={step.title}
              className="rounded-[1.75rem] border-border/40 bg-card p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100/60 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shadow-sm mb-6">
                <step.icon className="size-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500">Step {i + 1}</span>
                <h3 className="mt-2 text-xl tracking-tight font-semibold">{step.title}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA / pricing anchor */}
      <div id="pricing" className="relative scroll-mt-24 py-20 landing-green-section">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden flex flex-col items-center justify-between gap-8 rounded-[2.5rem] border border-emerald-200/50 bg-gradient-to-br from-emerald-50 via-white to-green-50/50 dark:from-emerald-950/40 dark:via-background dark:to-emerald-900/10 px-8 py-14 shadow-2xl shadow-emerald-900/5 sm:flex-row sm:px-16 sm:py-20 text-center sm:text-left">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-[30rem] rounded-full bg-gradient-to-b from-emerald-300/30 to-transparent blur-3xl" />
            
            <div className="relative z-10 font-sans">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Unlock actionable insights from your data.</h3>
              <p className="mt-3 text-lg text-muted-foreground max-w-[24rem]">
                Sign in with your backend account to view your analytics immediately.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0">
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="h-14 rounded-full px-10 text-base font-semibold shadow-xl shadow-green-900/10 transition-transform hover:scale-105 active:scale-95 bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Open dashboard
                  <ArrowRightIcon className="ml-2 size-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ChartMockup({ type }: { type: "line" | "bar" | "area" | "gauge" }) {
  if (type === "gauge") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="relative">
          <div className="size-12 rounded-full border-4 border-[rgba(181,255,177,0.8)] border-t-transparent" />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">75%</span>
        </div>
      </div>
    );
  }
  if (type === "line") {
    return (
      <svg viewBox="0 0 120 40" className="h-full w-full">
        <path
          d="M0 30 Q20 25 40 20 T80 15 T120 10"
          fill="none"
          stroke="rgba(181,255,177,0.8)"
          strokeWidth="2"
        />
      </svg>
    );
  }
  if (type === "bar") {
    return (
      <div className="flex h-full items-end gap-1">
        {[40, 70, 50, 90, 60].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-[rgba(181,255,177,0.6)]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    );
  }
  if (type === "area") {
    return (
      <div className="h-full overflow-hidden rounded">
        <div className="h-full bg-gradient-to-t from-[rgba(181,255,177,0.4)] to-transparent" />
      </div>
    );
  }
  return null;
}
