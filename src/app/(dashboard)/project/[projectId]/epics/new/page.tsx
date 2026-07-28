import ErrorApi from "@/components/shared/ErrorApi";
import EpicForm from "@/features/epic/component/EpicForm";
import { getMembers } from "@/features/members/api/getMember";
import { MembersResponse } from "@/features/members/types/Member";
import React from "react";
type Props = {
  params: Promise<{
    projectId: string;
  }>;
};
async function page({ params }: Props) {
  const { projectId } = await params;
  let members: MembersResponse;
  try {
    members = await getMembers(projectId);
  } catch (error) {
    return <ErrorApi />;
  }
  return (
    <div className="h-full flex flex-col gap-10">
      <div className="flex flex-col max-w-md">
        <h1 className="text-4xl font-semibold ">Create New Epic</h1>
        <p>
          Define a major project phase or high-level milestone to group related
          tasks and track architectural progress.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <EpicForm projectId={projectId} members={members} />
      </div>
    </div>
  );
}

export default page;
