"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { AppItem, MeResponse } from "@/lib/api";

type AppContextValue = {
  profile: MeResponse["profile"];
  apps: AppItem[];
  selectedAppId: string | undefined;
  setSelectedAppId: (id: string | undefined) => void;
  role: string;
  isViewer: boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({
  children,
  profile,
  apps,
}: {
  children: React.ReactNode;
  profile: MeResponse["profile"];
  apps: AppItem[];
}) {
  const [selectedAppId, setSelectedAppId] = useState<string | undefined>(undefined);

  const role = profile?.role ?? "developer";
  const isViewer = role === "viewer";

  const value = useMemo<AppContextValue>(
    () => ({
      profile,
      apps,
      selectedAppId,
      setSelectedAppId,
      role,
      isViewer,
    }),
    [profile, apps, selectedAppId, role, isViewer],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
