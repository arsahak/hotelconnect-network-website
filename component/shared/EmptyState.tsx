import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/** Shown when a list has nothing to show (no results, or the API is down). */
export function EmptyState({
  icon = "search",
  title,
  children,
  action,
  className,
}: {
  icon?: IconName;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-dashed border-line bg-white/60 px-6 py-16 text-center", className)}>
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-brass-100 text-brass-600">
        <Icon name={icon} size={24} strokeWidth={1.5} />
      </span>
      <h3 className="mt-5 font-display text-2xl text-ink-950">{title}</h3>
      {children && <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">{children}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
