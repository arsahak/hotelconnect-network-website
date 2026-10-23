import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label above a heading, with a short brass line in front. */
export function Eyebrow({
  children,
  tone = "dark",
  centered = false,
  className,
}: {
  children: ReactNode;
  /** "light" = on a dark background. */
  tone?: "dark" | "light";
  /** Adds a line on both sides (for centred headings). */
  centered?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        centered && "justify-center",
        tone === "light" ? "text-brass-400" : "text-brass-600",
        className,
      )}
    >
      <span className="h-px w-7 bg-current" aria-hidden="true" />
      {children}
      {centered && <span className="h-px w-7 bg-current" aria-hidden="true" />}
    </p>
  );
}
