"use client";

import Link from "next/link";
import { LandingLogoMark } from "@/components/landing-logo-mark";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/40 bg-zinc-50/50 dark:bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 font-bold tracking-tight text-foreground">
              <LandingLogoMark className="text-foreground" />
              <span>Analytics</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Developer dashboard for internal app metrics and mobile backend analytics.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
              <li><Link href="/sign-in" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Sign in</Link></li>
              <li><Link href="/sign-up" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Create account</Link></li>
              <li><Link href="/analytics" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
              <li><span className="text-muted-foreground">Press <kbd className="rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono text-xs shadow-sm">d</kbd> to toggle dark mode</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-border/40 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Analytics. Internal metrics for mobile app developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
