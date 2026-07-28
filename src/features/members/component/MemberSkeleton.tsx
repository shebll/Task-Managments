export const MembersSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="w-full max-w-4xl  *:overflow-hidden rounded-lg border border-border-divider bg-card-background">
        {/* Header */}
        <div className="grid grid-cols-[1fr_160px_80px] border-b border-border-divider px-6 py-4">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
        </div>

        {/* Rows */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid animate-pulse grid-cols-[1fr_160px_80px] items-center border-b border-border-divider px-6 py-5 last:border-b-0"
          >
            {/* Member */}
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-neutral-200" />

              <div className="space-y-2">
                <div className="h-4 w-36 rounded bg-neutral-200" />
                <div className="h-3 w-52 rounded bg-neutral-200" />
              </div>
            </div>

            {/* Role */}
            <div>
              <div className="h-7 w-20 rounded-full bg-neutral-200" />
            </div>

            {/* Actions */}
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-md bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
