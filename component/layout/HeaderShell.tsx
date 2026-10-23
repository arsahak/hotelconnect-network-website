"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore, type ReactNode } from "react";

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export const headerClasses =
  "group/header sticky top-0 z-40 border-b transition-colors duration-300 border-line bg-cream/95 shadow-sm shadow-ink-950/5 backdrop-blur-md data-[overlay=true]:border-transparent data-[overlay=true]:bg-transparent data-[overlay=true]:shadow-none data-[overlay=true]:backdrop-blur-none";

/**
 * The header is transparent (white text over the hero photo) on the homepage
 * until the visitor scrolls; everywhere else it is solid.
 * Children style themselves with `group-data-[overlay=true]/header:*`.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const overlay = pathname === "/" && !scrolled;

  return (
    <header data-overlay={overlay} className={headerClasses}>
      {children}
    </header>
  );
}
