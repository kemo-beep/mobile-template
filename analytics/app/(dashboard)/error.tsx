"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-lg font-semibold">Dashboard error</h1>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Something went wrong loading the dashboard. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
