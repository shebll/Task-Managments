import ErrorApi from "@/components/shared/ErrorApi";
import TaskForm from "@/features/tasks/component/form/TaskForm";
import { getAllEpics } from "@/features/epic/api/epics-server-api";
import { EpicsResponse } from "@/features/epic/types/Epic";
import { getMembers } from "@/features/members/api/getMember";
import { MembersResponse } from "@/features/members/types/Member";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    epicId?: string;
  }>;
};

async function page({ params, searchParams }: Props) {
  const { projectId } = await params;
  const { epicId } = await searchParams;

  let epics: EpicsResponse;
  let members: MembersResponse;

  try {
    [epics, members] = await Promise.all([
      getAllEpics(projectId),
      getMembers(projectId) as Promise<MembersResponse>,
    ]);
  } catch (error) {
    return <ErrorApi />;
  }

  return (
    <div className="h-full w-full max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-4xl font-semibold ">Create New Task</h1>
        <p>
          Break down your epic into actionable tasks and track them <br /> to
          completion.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <TaskForm
          projectId={projectId}
          epics={epics}
          members={members}
          preselectedEpicId={epicId}
        />
      </div>
    </div>
  );
}

export default page;
