import { getProjectById } from "@/features/projects/api/projects-server-api";
import ProjectForm from "@/features/projects/components/ProjectForm";
import React from "react";
type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

async function page({ params }: Props) {
  const { projectId } = await params;
  const project = await getProjectById(projectId);
  return (
    <div className="h-full flex flex-col gap-10">
      <h1 className="text-4xl font-semibold ">Update Project</h1>
      <ProjectForm projectData={project} />
    </div>
  );
}

export default page;
