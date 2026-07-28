import { clsx } from "clsx";

interface MemberRoleBadgeProps {
  role: "owner" | "admin" | "member" | "viewer";
}

const variants = {
  owner: "bg-blue-600 text-white",
  admin: "bg-blue-100 text-blue-700",
  member: "bg-slate-100 text-slate-700",
  viewer: "bg-slate-100 text-slate-500",
};

export function MemberRoleBadge({ role }: MemberRoleBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase w-fit",
        variants[role],
      )}
    >
      {role}
    </span>
  );
}
