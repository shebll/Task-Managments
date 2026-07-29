import EpicHeader from "@/features/epic/component/ui/EpicHeader";
import { EpicSkeleton } from "@/features/epic/component/EpicSkeleton";
import ListEpic from "@/features/epic/component/ListEpic";
import { Suspense } from "react";
type Props = {
  params: Promise<{
    projectId: string;
  }>;
};
async function page({ params }: Props) {
  const { projectId } = await params;
  return (
    <div className="h-full flex flex-col gap-10">
      <EpicHeader projectId={projectId} />
      <Suspense fallback={<EpicSkeleton />}>
        <ListEpic projectId={projectId} />
      </Suspense>
    </div>
  );
}

export default page;
