import { cn } from "@/lib/cn";

/** Initials tile used where a company logo is not available yet. */
export function Monogram({ name, className }: { name: string; className?: string }) {
  const initials = name
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-md border border-line bg-white font-display text-xl text-brass-600 shadow-sm",
        className,
      )}
    >
      {initials}
    </span>
  );
}
