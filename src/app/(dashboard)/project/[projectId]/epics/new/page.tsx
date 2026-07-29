import ErrorApi from "@/components/shared/ErrorApi";
import EpicForm from "@/features/epic/component/form/EpicForm";
import { getMembers } from "@/features/members/api/getMember";
import { MembersResponse } from "@/features/members/types/Member";
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
    <div className="h-full w-full max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-4xl font-semibold ">Create New Epic</h1>
        <p>
          Define a major project phase or high-level milestone to group <br />{" "}
          related tasks and track architectural progress.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <EpicForm projectId={projectId} members={members} />
      </div>
    </div>
  );
}

export default page;
