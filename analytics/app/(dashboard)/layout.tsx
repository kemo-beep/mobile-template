"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppProvider } from "@/contexts/app-context";
import { authClient } from "@/lib/auth-client";
import { getApps, getMe } from "@/lib/api";
import type { AppItem, MeResponse } from "@/lib/api";

const titleByPath: Record<string, string> = {
  "/analytics": "Analytics",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [meData, setMeData] = useState<MeResponse | null>(null);
  const [appsData, setAppsData] = useState<AppItem[]>([]);
  const [meLoading, setMeLoading] = useState(true);
  const title = titleByPath[pathname] ?? "Analytics";

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, router, session]);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    setMeLoading(true);
    getMe()
      .then((me) => {
        if (cancelled) return;
        setMeData(me);
        const role = me.profile?.role ?? "developer";
        if (role === "viewer") {
          setMeLoading(false);
          return;
        }
        return getApps().then(({ apps }) => {
          if (!cancelled) setAppsData(apps);
        });
      })
      .catch(() => {
        if (!cancelled) setMeData(null);
      })
      .finally(() => {
        if (!cancelled) setMeLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  // Viewer role: redirect to landing (they cannot access analytics)
  useEffect(() => {
    if (meLoading || !meData) return;
    const role = meData.profile?.role ?? "developer";
    if (role === "viewer") {
      router.replace("/");
    }
  }, [meData, meLoading, router]);

  if (isPending) {
    return (
      <main className="flex min-h-svh w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking session...</p>
      </main>
    );
  }

  if (!session) return null;

  // Viewer gets redirected above; show loading while fetching me
  if (meLoading) {
    return (
      <main className="flex min-h-svh w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <AppProvider profile={meData?.profile ?? null} apps={appsData}>
      <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--header-height": "3rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="min-h-0">
        <SiteHeader title={title} />
        <div
          className="min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-x-none bg-muted dark:bg-background"
          style={{
            minHeight: "calc(100vh - var(--header-height, 3rem))",
          }}
        >
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </AppProvider>
  );
}
