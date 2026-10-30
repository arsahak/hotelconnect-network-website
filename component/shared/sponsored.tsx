import { cn } from "@/lib/cn";

/**
 * Briefing §2.1: paid spots come first in a homepage block and are marked
 * "Sponsored". Fills the block up to `limit` with the regular items.
 */
export function withSponsored<T extends { _id: string }>(sponsored: T[], regular: T[], limit: number) {
  const ids = new Set(sponsored.map((item) => item._id));
  const items = [...sponsored, ...regular.filter((item) => !ids.has(item._id))].slice(0, limit);
  return items.map((item) => ({ item, sponsored: ids.has(item._id) }));
}

export function SponsoredTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-ink-950/80 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm",
        className,
      )}
    >
      Sponsored
    </span>
  );
}
