"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../auth/types/types";

type DashboardContextType = {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  user: User | null;
  setUser: (user: User | null) => void;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <DashboardContext.Provider
      value={{
        sidebarCollapsed,
        toggleSidebar,
        user,
        setUser,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used inside DashboardProvider");
  }

  return context;
}
