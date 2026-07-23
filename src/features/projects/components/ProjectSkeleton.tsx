export const ProjectSkeleton = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex min-h-60 animate-pulse flex-col rounded-lg bg-card-background p-6"
        >
          <div className="flex flex-1 flex-col gap-4">
            {/* Title */}
            <div className="h-8 w-3/5 rounded-md bg-neutral-200" />

            {/* Description */}
            <div className="space-y-3">
              <div className="h-3 w-full rounded-md bg-neutral-200" />
              <div className="h-3 w-11/12 rounded-md bg-neutral-200" />
              <div className="h-3 w-4/5 rounded-md bg-neutral-200" />
              <div className="h-3 w-2/3 rounded-md bg-neutral-200" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-border-divider pt-4">
            <div className="space-y-2">
              <div className="h-3 w-20 rounded-md bg-neutral-200" />
            </div>

            <div className="h-4 w-20 rounded-md bg-neutral-200" />
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between w-full">
        <div className="h-6 w-60 rounded-md bg-neutral-200" />

        <div className="h-4 w-20 rounded-md bg-neutral-200" />
      </div>
    </div>
  );
};
