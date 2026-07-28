"use client";
import { dashboardLinks } from "@/const/navigation";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function NavBarLinks({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {
  const pathname = usePathname();
  const params = useParams();

  const projectId = params.projectId as string | undefined;
  const links = dashboardLinks.map((item) => ({
    ...item,
    href:
      item.projectRoute !== "/project"
        ? projectId
          ? `/project/${projectId}${item.projectRoute}`
          : "/project"
        : item.projectRoute,
  }));
  return (
    <nav className="h-full flex flex-col justify-start gap-1">
      {links.map((item) => {
        const active =
          item.projectRoute === "/project"
            ? pathname === "/project"
            : pathname.endsWith(item.projectRoute);
        const icon = item.desktopIcon;

        return (
          <Link
            key={item.projectRoute}
            href={item.href}
            className={` transition-all duration-300 text-sm
              flex items-center gap-3 rounded-sm px-3 py-2.5 
              ${active && "text-sidebar-active-text bg-bg-active"}
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
  );
}

export default NavBarLinks;
