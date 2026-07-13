import React from "react";

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
  return <>{children}</>;
}

export default DashboardLayout;
