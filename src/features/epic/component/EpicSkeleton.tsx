export function EpicSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg bg-card-background p-5"
        >
          <div className="flex justify-between">
            <div className="h-5 w-16 rounded bg-neutral-200" />

            <div className="h-5 w-5 rounded-full bg-neutral-200" />
          </div>

          <div className="mt-5 h-6 w-3/4 rounded bg-neutral-200" />

          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded bg-neutral-200" />

            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-neutral-200" />

              <div className="h-4 w-28 rounded bg-neutral-200" />
            </div>
          </div>

          <div className="mt-8 flex justify-between border-t border-border-divider pt-4">
            <div className="h-3 w-24 rounded bg-neutral-200" />

            <div className="h-3 w-20 rounded bg-neutral-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
