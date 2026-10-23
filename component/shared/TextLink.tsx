import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/** Small "View details →" style link. */
export function TextLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
        tone === "dark" ? "text-brass-600 hover:text-brass-700" : "text-brass-400 hover:text-white",
        className,
      )}
    >
      {children}
      <Icon name="arrow-right" size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
