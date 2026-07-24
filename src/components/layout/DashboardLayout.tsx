import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-10">{children}</main>
      </div>
    </div>
  );
}
