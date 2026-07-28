import ErrorApi from "@/components/shared/ErrorApi";
import { getMembers } from "../api/getMember";
import { MembersResponse } from "../types/Member";
import { MemberList } from "./MemberList";

async function Members({ projectId }: { projectId: string }) {
  let members: MembersResponse;
  try {
    members = await getMembers(projectId);
  } catch (error) {
    return <ErrorApi />;
  }
  if (members.length !== 0)
    return (
      <div className=" w-full flex justify-center">
        <MemberList members={members} />
      </div>
    );
}

export default Members;
