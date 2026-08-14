import Breadcrumb from "@/components/layout/Breadcrumb";
import { getProjectById } from "@/features/projects/api/projects-server-api";
import { ProjectsData } from "@/features/projects/types/types";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    projectId: string;
  }>;
};

async function ProjectLayout({ children, params }: Props) {
  const { projectId } = await params;
  const projectData = (await getProjectById(projectId)) as ProjectsData;
  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb projectName={projectData[0].name.toUpperCase()} />
      {children}
    </div>
  );
}

export default ProjectLayout;
