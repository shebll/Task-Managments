import React from "react";
import { EmptyProjects } from "./EmptyProjects";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getProjects } from "../api/projects-server-api";
import { ProjectsData } from "../types/types";
import ErrorApi from "@/components/shared/ErrorApi";
import { Pagination } from "./Pagination";
import { ProjectsInfiniteScroll } from "./ProjectsInfiniteScroll";
import { ProjectCard } from "./ui/ProjectCard";
interface ProjectPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}
const PAGE_SIZE = 5;
async function ListProjects({ searchParams }: ProjectPageProps) {
  const params = await searchParams;

  const currentPage = Math.max(1, Number(params?.page) || 1);

  const offset = (currentPage - 1) * PAGE_SIZE;

  let projects: ProjectsData;
  let total;
  let start;
  let end;

  try {
    const response = await getProjects(PAGE_SIZE, offset);

    projects = response.projects;
    total = response.total;
    start = response.start;
    end = response.end;
  } catch (error) {
    return <ErrorApi />;
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (total > 0 && currentPage > totalPages) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-text-secondary">Page not found</p>

        <Link
          href="/project?page=1"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          Go to first page
        </Link>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-between">
        <EmptyProjects />
      </div>
    );
  }

  // const startItem = offset + 1;
  // const endItem = Math.min(offset + projects.length, total);

  return (
    <div className="flex justify-between flex-col gap-10">
      {/* Desktop grid + pagination */}
      <div className="hidden md:flex justify-between flex-col gap-10">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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

        <div className="flex flex-col gap-6 border-t border-border-divider pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-secondary">
            Showing{" "}
            <span className="font-medium text-text-primary">
              {start}-{end}
            </span>{" "}
            of <span className="font-medium text-text-primary">{total}</span>{" "}
            active projects
          </p>

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>

      {/* Mobile infinite scroll */}
      <div className="md:hidden">
        <ProjectsInfiniteScroll />
      </div>
    </div>
  );
}

export default ListProjects;
