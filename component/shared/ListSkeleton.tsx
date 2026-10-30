/** Grey placeholder cards while a list loads. */
export function ListSkeleton({ count = 6, tall = true }: { count?: number; tall?: boolean }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg bg-white shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)]">
          {tall && <div className="aspect-[4/3] animate-pulse bg-sand" />}
          <div className="space-y-3 p-5">
            <div className="h-3 w-24 animate-pulse rounded bg-sand" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-sand" />
            <div className="h-3 w-full animate-pulse rounded bg-sand" />
          </div>
        </div>
      ))}
    </div>
  );
}
