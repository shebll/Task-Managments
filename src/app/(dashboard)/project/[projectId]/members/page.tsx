import Button from "@/components/ui/Button";
import Members from "@/features/members/component/Members";
import { MembersSkeleton } from "@/features/members/component/MemberSkeleton";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";
type Props = {
  params: Promise<{
    projectId: string;
  }>;
};
export const dynamic = "force-dynamic";
async function page({ params }: Props) {
  const { projectId } = await params;
  return (
    <div className="h-full flex flex-col gap-10">
      <div className="flex justify-between items-end ">
        <div className="flex items-start flex-col gap-1">
          <h2 className="text-3xl font-semibold">Project Members</h2>
        </div>
        {/* <Link href={"/project/add"}> */}
        <Button
          variant="primary"
          className="text-lg font-bold flex gap-2.5 py-4 px-8 leading-8"
        >
          <PlusCircle size={20} />
          Invite Member
        </Button>
        {/* </Link> */}
      </div>
      <Suspense fallback={<MembersSkeleton />}>
        <Members projectId={projectId} />
      </Suspense>
    </div>
  );
}

export default page;
