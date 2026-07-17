import DashboardLayout from "@/components/layout/DashboardLayout";
import { DashboardProvider } from "@/features/dashboard/dashboard-context";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <DashboardProvider>
      <DashboardLayout>
        {/* <div className="flex items-start h-full"> */}

        {children}
        {/* </div> */}
      </DashboardLayout>
    </DashboardProvider>
  );
}

export default Layout;
