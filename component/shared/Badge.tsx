import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "brass" | "ink" | "ember" | "moss" | "outline" | "glass";

const tones: Record<BadgeTone, string> = {
  brass: "bg-brass-100 text-brass-700",
  ink: "bg-ink-900 text-white",
  ember: "bg-ember-100 text-ember-600",
  moss: "bg-moss-100 text-moss-600",
  outline: "border border-line text-ink-700",
  glass: "bg-white/90 text-ink-900 backdrop-blur",
};

/** Small label (e.g. "Urgent", an offer). */
export function Badge({
  children,
  tone = "brass",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2 py-1 text-[0.6875rem] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
