"use client";
import Button from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Logo from "../shared/Logo";
import { useDashboard } from "@/features/dashboard/dashboard-context";
import LogOutButton from "./LogOutButton";
import NavBarLinks from "./NavBarLinks";

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useDashboard();

  return (
    <aside
      className={`transition-all duration-300 p-4 bg-bg-sidebar flex flex-col justify-start h-screen
      ${sidebarCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="pb-8 flex justify-start px-2">
        <Logo icon={sidebarCollapsed} />
      </div>
      <NavBarLinks sidebarCollapsed={sidebarCollapsed} />
      <Button
        onClick={toggleSidebar}
        className="flex items-center justify-start gap-3"
        variant="secondary"
      >
        {sidebarCollapsed ? (
          <ArrowRight size={20} className="text-sidebar-icon" />
        ) : (
          <ArrowLeft size={20} className="text-sidebar-icon" />
        )}
        {!sidebarCollapsed && <p className="text-sidebar-icon">Collapse</p>}
      </Button>
      <LogOutButton sidebarCollapsed={sidebarCollapsed} />
    </aside>
  );
}
