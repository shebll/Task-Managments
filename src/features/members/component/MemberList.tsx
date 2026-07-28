import { MemberResponse } from "../types/Member";
import { MemberItem } from "./MemberItem";
import { MemberHeader } from "./ui/MemberHeader";

interface MemberListProps {
  members: MemberResponse[];
}

export function MemberList({ members }: MemberListProps) {
  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-md border-r-0 border-6 border-blue-100  bg-card-background">
      <MemberHeader />

      <div>
        {members.map((member) => (
          <MemberItem key={member.member_id} member={member} />
        ))}
      </div>
    </div>
  );
}
