"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, PlusCircle } from "lucide-react";
import { getProjectsClient } from "../api/projects-client-api";
import { ProjectsData } from "../types/types";
import { ProjectCard } from "./ui/ProjectCard";

const PAGE_SIZE = 5;

export function ProjectsInfiniteScroll() {
  const [projects, setProjects] = useState<ProjectsData>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const loadNextPage = async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const offset = (page - 1) * PAGE_SIZE;
      const response = await getProjectsClient(PAGE_SIZE, offset);

      setProjects((prev) => [...prev, ...response.projects]);
      setTotal(response.total);
      setPage((prev) => prev + 1);
      setHasMore(offset + response.projects.length < response.total);
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

  if (error && projects.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-text-secondary">Failed to load projects</p>
      </div>
    );
  }

  if (!loading && projects.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-text-secondary">No projects found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <Link
          href="/project/add"
          className="flex items-center justify-center gap-4 h-full min-h-60 flex-col rounded-lg bg-card-background p-6 transition-shadow hover:shadow-md border border-dashed border-border-divider"
        >
          <div className="p-4 rounded-md bg-blue-100">
            <PlusCircle size={26} />
          </div>
          <p className="font-bold text-text-secondary">ADD PROJECT</p>
        </Link>
      </div>

      <div ref={sentinelRef} />

      {loading && (
        <div className="flex items-center justify-center py-6">
          <Loader2 size={24} className="animate-spin text-text-muted" />
        </div>
      )}

      {error && projects.length > 0 && (
        <div className="flex flex-col items-center gap-3 py-4">
          <p className="text-sm text-text-secondary">Failed to load projects</p>
          <button
            type="button"
            onClick={loadNextPage}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            Retry
          </button>
        </div>
      )}

      {!hasMore && projects.length > 0 && (
        <p className="text-center text-sm text-text-muted">
          Showing {projects.length} of {total} projects
        </p>
      )}
    </div>
  );
}
