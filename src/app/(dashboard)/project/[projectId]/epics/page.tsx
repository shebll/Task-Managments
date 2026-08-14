import EpicHeader from "@/features/epic/component/ui/EpicHeader";
import { EpicSkeleton } from "@/features/epic/component/EpicSkeleton";
import ListEpic from "@/features/epic/component/ListEpic";
import { Suspense } from "react";
type Props = {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};
async function page({ params, searchParams }: Props) {
  const { projectId } = await params;
  return (
    <div className="h-full flex flex-col gap-10">
      <EpicHeader projectId={projectId} />
      <Suspense fallback={<EpicSkeleton />}>
        <ListEpic projectId={projectId} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default page;
