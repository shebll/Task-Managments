"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { getEpicsClient } from "../api/epic-api";
import { EpicResponse } from "../types/Epic";
import EpicCard from "./ui/EpicCard";
import EpicDetailsModal from "./ui/EpicDetailsModal";
import { UpdateEpicRequest } from "../types/Epic";
import { updateEpic } from "../api/epic-api";
import { useToast } from "@/provider/ToastProvider";

const PAGE_SIZE = 6;

type Props = {
  projectId: string;
};

export function EpicsInfiniteScroll({ projectId }: Props) {
  const { showToast } = useToast();
  const [epics, setEpics] = useState<EpicResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [selectedEpic, setSelectedEpic] = useState<EpicResponse | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const loadNextPage = async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const offset = (page - 1) * PAGE_SIZE;
      const response = await getEpicsClient(projectId, PAGE_SIZE, offset);

      setEpics((prev) => [...prev, ...response.epics]);
      setTotal(response.total);
      setPage((prev) => prev + 1);
      setHasMore(offset + response.epics.length < response.total);
      setError(false);
    } catch {
      setError(true);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  const onEpicUpdate = async (updatedEpic: Partial<UpdateEpicRequest>) => {
    const prevEpicUi = selectedEpic;
    // ui updated
    setSelectedEpic((prev) => (prev ? { ...prev, ...updatedEpic } : prev));
    setEpics((prev) =>
      prev.map((epic) =>
        epic.id == selectedEpic?.id ? { ...epic, ...updatedEpic } : epic,
      ),
    );

    try {
      await updateEpic(selectedEpic!.id, updatedEpic);

      showToast(`Epic Updated `, "success");
    } catch (error) {
      // ui rollback
      setSelectedEpic(prevEpicUi);
      setEpics((prev) =>
        prev.map((epic) => (epic.id == selectedEpic?.id ? prevEpicUi! : epic)),
      );

      showToast("Something went wrong", "error");
    }
  };

  if (error && epics.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-text-secondary">Failed to load epics</p>
      </div>
    );
  }

  if (!loading && epics.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-text-secondary">No epics found for this project</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {epics.map((epic) => (
          <EpicCard
            key={epic.id}
            epic={epic}
            onClick={() => setSelectedEpic(epic)}
          />
        ))}
      </div>

      <div ref={sentinelRef} />

      {loading && (
        <div className="flex items-center justify-center py-6">
          <Loader2 size={24} className="animate-spin text-text-muted" />
        </div>
      )}

      {error && epics.length > 0 && (
        <div className="flex flex-col items-center gap-3 py-4">
          <p className="text-sm text-text-secondary">Failed to load epics</p>
          <button
            type="button"
            onClick={loadNextPage}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            Retry
          </button>
        </div>
      )}

      {!hasMore && epics.length > 0 && (
        <p className="text-center text-sm text-text-muted">
          Showing {epics.length} of {total} epics
        </p>
      )}

      {selectedEpic && (
        <EpicDetailsModal
          epic={selectedEpic}
          onEpicUpdate={onEpicUpdate}
          onClose={() => setSelectedEpic(null)}
        />
      )}
    </div>
  );
}
