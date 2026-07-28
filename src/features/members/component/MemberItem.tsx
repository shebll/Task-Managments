import { MoreVertical } from "lucide-react";
import { MemberResponse } from "../types/Member";
import { MemberAvatar } from "./ui/MemberAvatar";
import { MemberRoleBadge } from "./ui/MemberRoleBadge";

interface MemberItemProps {
  member: MemberResponse;
}

export function MemberItem({ member }: MemberItemProps) {
  return (
    <div className="grid grid-cols-[1fr_260px_60px] items-center border-b border-border-divider px-6 py-5 last:border-none">
      <div className="flex items-center gap-4">
        <MemberAvatar name={member.metadata.name} />

        <div>
          <p className="font-medium text-slate-900">{member.metadata.name}</p>

          <p className="text-sm text-slate-500">{member.email}</p>
        </div>
      </div>

      <MemberRoleBadge role={member.role} />

      <button className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100">
        <MoreVertical className="h-4 w-4" />
      </button>
    </div>
  );
}
