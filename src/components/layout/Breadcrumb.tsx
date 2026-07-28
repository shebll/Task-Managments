"use client";

import { usePathname } from "next/navigation";

type Props = { projectName: string };

function Breadcrumb({ projectName }: Props) {
  const pathName = usePathname();
  return (
    <div className="font-bold text-xs text-text-muted">
      {`PROJECTS  > ${projectName.toUpperCase()} > `}
      <span className="text-primary">
        {pathName.split("/").pop()?.toUpperCase()}
      </span>
    </div>
  );
}

export default Breadcrumb;
