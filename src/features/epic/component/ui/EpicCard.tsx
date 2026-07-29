import { CalendarDays, MoreVertical, User2Icon } from "lucide-react";
import { EpicResponse } from "../../types/Epic";
import { formatDate } from "../../lib/helper";

type Props = {
  epic: EpicResponse;
  onClick: () => void;
};
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function EpicCard({ epic, onClick }: Props) {
  return (
    <article
      onClick={onClick}
      role="button"
      className="cursor-pointer rounded-lg border-l-6
  border-text-success
    bg-card-background
    p-5 transition-shadow
    hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span className="rounded bg-success px-2 py-1 text-xs font-bold text-text-success ">
          {epic.epic_id}
        </span>

        <button>
          <MoreVertical size={18} className="text-text-placeholder" />
        </button>
      </div>

      <h3 className="mt-4 line-clamp-2 text-lg font-semibold">{epic.title}</h3>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-success font-bold text-text-success">
          {epic.assignee?.name ? getInitials(epic.assignee.name) : "--"}
        </div>

        <div>
          <p className="text-xs text-text-muted">Assignee</p>

          <p className="font-medium">{epic.assignee?.name ?? "Unassigned"}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border-divider pt-4 text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <User2Icon size={14} />

          <span>
            Created by{" "}
            <span className="text-text-secondary font-bold">
              {epic.created_by.name}
            </span>
          </span>
        </div>

        {epic.deadline && (
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />

            {formatDate(epic.deadline)}
          </div>
        )}
      </div>
    </article>
  );
}
