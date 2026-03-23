"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useApp } from "@/contexts/app-context";

export function SiteHeader({ title = "Analytics" }: { title?: string }) {
  const { apps, selectedAppId, setSelectedAppId } = useApp();
  const showAppSelector = apps.length > 1;

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <h1 className="text-base font-medium">{title}</h1>
        {showAppSelector && (
          <>
            <Separator
              orientation="vertical"
              className="mx-2 h-4 data-vertical:self-auto"
            />
            <select
              value={selectedAppId ?? ""}
              onChange={(e) =>
                setSelectedAppId(e.target.value || undefined)
              }
              className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">All apps</option>
              {apps.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </header>
  );
}
