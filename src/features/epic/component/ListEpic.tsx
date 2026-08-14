import ErrorApi from "@/components/shared/ErrorApi";
import EmptyEpics from "./EmptyEpics";
import { getEpics } from "../api/epics-server-api";
import EpicsGrid from "./EpicsGrid";
import { Pagination } from "@/features/projects/components/Pagination";
import { EpicsInfiniteScroll } from "./EpicsInfiniteScroll";
import Link from "next/link";
import { EpicsResponse } from "../types/Epic";

type Props = {
  projectId: string;
  searchParams: Promise<{
    page?: string;
  }>;
};

const PAGE_SIZE = 6;

export default async function ListEpics({ projectId, searchParams }: Props) {
  const params = await searchParams;

  const currentPage = Math.max(1, Number(params?.page) || 1);

  const offset = (currentPage - 1) * PAGE_SIZE;

  let epics: EpicsResponse;
  let total: number;
  let start: number;
  let end: number;

  try {
    const response = await getEpics(projectId, PAGE_SIZE, offset);

    epics = response.epics;
    total = response.total;
    start = response.start;
    end = response.end;
  } catch {
    return <ErrorApi />;
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (total > 0 && currentPage > totalPages) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-text-secondary">Page not found</p>

        <Link
          href={`/project/${projectId}/epics?page=1`}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          Go to first page
        </Link>
      </div>
    );
  }

  if (epics.length === 0) {
    return <EmptyEpics projectId={projectId} />;
  }

  return (
    <div className="flex justify-between flex-col gap-10">
      {/* Desktop grid + pagination */}
      <div className="hidden md:flex justify-between flex-col gap-10">
        <EpicsGrid key={currentPage} epics={epics} />

        <div className="flex flex-col gap-6 border-t border-border-divider pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-secondary">
            Showing{" "}
            <span className="font-medium text-text-primary">
              {start}-{end}
            </span>{" "}
            of <span className="font-medium text-text-primary">{total}</span>{" "}
            epics
          </p>

          <Pagination
            basePath={`/project/${projectId}/epics`}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      {/* Mobile infinite scroll */}
      <div className="md:hidden">
        <EpicsInfiniteScroll projectId={projectId} />
      </div>
    </div>
  );
}
