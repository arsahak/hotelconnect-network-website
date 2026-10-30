import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/** "← Previous · Page 2 of 5 · Next →" under a list. Keeps the current filters. */
export function Pager({
  page,
  pages,
  basePath,
  query,
}: {
  page: number;
  pages: number;
  basePath: string;
  /** The current filters (without page). */
  query: Record<string, string | undefined>;
}) {
  if (pages <= 1) return null;

  const href = (target: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) if (value) params.set(key, value);
    if (target > 1) params.set("page", String(target));
    const qs = params.toString();
    return `${basePath}${qs ? `?${qs}` : ""}`;
  };

  const linkClass = (disabled: boolean) =>
    cn(
      "inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors",
      disabled ? "pointer-events-none text-ink-300" : "text-brass-600 hover:bg-brass-100",
    );

  return (
    <nav aria-label="Pages" className="mt-12 flex items-center justify-between border-t border-line pt-6">
      <Link href={href(page - 1)} aria-disabled={page <= 1} tabIndex={page <= 1 ? -1 : undefined} className={linkClass(page <= 1)}>
        <Icon name="arrow-left" size={16} />
        Previous
      </Link>
      <span className="text-sm text-ink-500">
        Page <span className="font-semibold text-ink-900">{page}</span> of {pages}
      </span>
      <Link href={href(page + 1)} aria-disabled={page >= pages} tabIndex={page >= pages ? -1 : undefined} className={linkClass(page >= pages)}>
        Next
        <Icon name="arrow-right" size={16} />
      </Link>
    </nav>
  );
}
