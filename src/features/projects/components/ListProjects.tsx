import React from "react";
import { EmptyProjects } from "./EmptyProjects";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { formatDate } from "../lib/helper/formatDate";
import { ProjectsData } from "../types/types";
import { serverApiClient } from "@/lib/api/server-api-client";

export const getProjects = () => {
  return serverApiClient<ProjectsData>("/rest/v1/rpc/get_projects", {
    method: "GET",
    next: {
      tags: ["projects"],
    },
  });
};

async function ListProjects() {
  const projects = await getProjects();

  if (projects.length === 0)
    return (
      <div className="flex justify-between items-center h-full w-full">
        <EmptyProjects />
      </div>
    );
  return (
    <div className="flex justify-between flex-col gap-10">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/project/${project.id}/epics`}>
            <article className="flex h-full min-h-60 flex-col rounded-lg bg-card-background p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="line-clamp-1 text-xl font-semibold">
                  {project.name}
                </h3>

                <p className="line-clamp-4 text-sm leading-6 text-text-secondary">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border-divider pt-4">
                <span className="text-xs font-bold text-text-muted">
                  CREATED AT
                </span>

                <span className="text-sm font-medium">
                  {formatDate(project.created_at)}
                </span>
              </div>
            </article>
          </Link>
        ))}
        <Link
          href="/project/add"
          className="flex items-center justify-center gap-4 h-full min-h-60 flex-col rounded-lg bg-card-background p-6 transition-shadow hover:shadow-md border border-dashed border-border-divider"
        >
          <div className="p-4 rounded-md bg-blue-100">
            <PlusCircle size={26} />
          </div>
          <p className="font-bold text-text-secondary">ADD PROJECT</p>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <p>Showing 5 of 24 active projects</p>
      </div>
    </div>
  );
}

export default ListProjects;
