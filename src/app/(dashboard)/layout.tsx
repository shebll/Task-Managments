import DashboardLayout from "@/components/layout/DashboardLayout";
import { DashboardProvider } from "@/features/dashboard/dashboard-context";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <DashboardProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardProvider>
  );
}

export default Layout;
