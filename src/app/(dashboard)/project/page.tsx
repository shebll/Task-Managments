import Button from "@/components/ui/Button";
import ListProjects from "@/features/projects/components/ListProjects";
import { ProjectSkeleton } from "@/features/projects/components/ProjectSkeleton";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function Projects() {
  return (
    <div className="h-full flex flex-col gap-10">
      <div className="flex justify-between items-end ">
        <div className="flex items-start flex-col gap-1">
          <h2 className="text-3xl font-semibold">Projects</h2>
          <p className="text-text-secondary">Manage and curate your projects</p>
        </div>
        <Link href={"/project/add"}>
          <Button
            variant="primary"
            className="text-lg font-bold flex gap-2.5 py-4 px-8 leading-8"
          >
            <PlusCircle size={20} />
            Create New Project
          </Button>
        </Link>
      </div>
      <Suspense fallback={<ProjectSkeleton />}>
        <ListProjects />
      </Suspense>
    </div>
  );
}

export default Projects;
