"use client";

import { dashboardLinks } from "@/lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";
import { ArrowLeft, ArrowRight, LogOut } from "lucide-react";
import Logo from "../shared/Logo";
import { useDashboard } from "@/features/dashboard/dashboard-context";
import Image from "next/image";
import { useLogout } from "@/features/auth/hooks/useLogout";

export default function Sidebar() {
  const pathname = usePathname();

  const { sidebarCollapsed, toggleSidebar } = useDashboard();
  const { mutate: logoutUser, isPending } = useLogout();

  return (
    <aside
      className={`transition-all duration-300 p-4 bg-blue-100 flex flex-col justify-start h-screen
      ${sidebarCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="pb-8 flex justify-start px-2">
        <Logo icon={sidebarCollapsed} />
      </div>
      <nav className="h-full flex flex-col justify-start gap-1">
        {dashboardLinks.map((item) => {
          const active = pathname === item.href;

          const icon = item.desktopIcon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={` transition-all duration-300 text-sm
              flex items-center gap-3 rounded-sm px-3 py-2.5 
              ${active && "text-primary bg-white"}
              `}
            >
              <Image
                className="text-green-900 w-5 h-5"
                src={icon}
                alt={item.title}
                width={20}
                height={20}
              />
              {!sidebarCollapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>
      <Button
        onClick={toggleSidebar}
        className="flex items-center justify-start gap-[12px] "
        variant="secondary"
      >
        {sidebarCollapsed ? (
          <ArrowRight size={20} className="text-[#041b3c]" />
        ) : (
          <ArrowLeft size={20} className="text-[#041b3c]" />
        )}
        {!sidebarCollapsed && <p className="text-[#041b3c]">Collapse</p>}
      </Button>
      <Button
        className="flex items-center justify-start gap-[12px]"
        onClick={() => logoutUser()}
        disabled={isPending}
        variant="secondary"
      >
        <LogOut size={18} className="text-[#BA1A1A]" />
        {!sidebarCollapsed && <p className="text-[#BA1A1A]">LogOut </p>}
      </Button>
    </aside>
  );
}
