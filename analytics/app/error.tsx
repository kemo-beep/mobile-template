"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
