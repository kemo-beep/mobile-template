"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartBarIcon, LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace("/sign-in");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/analytics" />}
            >
              <ChartBarIcon className="size-5!" />
              <span className="text-base font-semibold">Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Analytics"
              render={<Link href="/analytics" />}
              isActive
            >
              <ChartBarIcon />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="aria-expanded:bg-muted"
              render={<button type="button" onClick={handleSignOut} />}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <LogOutIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session?.user?.name ?? "Developer"}
                </span>
                <span className="truncate text-xs text-foreground/70">
                  Sign out
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
