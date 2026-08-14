import Link from "next/link";
import { formatDate } from "../../lib/helper/formatDate";
import { ProjectsData } from "../../types/types";

type Props = {
  project: ProjectsData[number];
};

export function ProjectCard({ project }: Props) {
  return (
    <Link href={`/project/${project.id}/epics`}>
      <article className="flex h-full min-h-60 flex-col rounded-lg bg-card-background p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex flex-1 flex-col gap-3">
          <h3 className="line-clamp-1 text-xl font-semibold">{project.name}</h3>

          <p className="line-clamp-4 text-sm leading-6 text-text-secondary">
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border-divider pt-4">
          <span className="text-xs font-bold text-text-muted">CREATED AT</span>

          <span className="text-sm font-medium">
            {formatDate(project.created_at)}
          </span>
        </div>
      </article>
    </Link>
  );
}
