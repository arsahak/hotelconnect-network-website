"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { NavItem } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Icon } from "@/component/shared/Icon";
import { setMenuOpen, useMenuOpen } from "./menu-state";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/** Three lines that turn into an X. */
function MenuIcon({ open }: { open: boolean }) {
  const line = cn("absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-300 motion-reduce:transition-none", EASE);
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-5">
      <span className={cn(line, "top-0", open && "top-1/2 -translate-y-1/2 rotate-45")} />
      <span className={cn(line, "top-1/2 -translate-y-1/2", open && "scale-x-0 opacity-0")} />
      <span className={cn(line, "bottom-0", open && "bottom-1/2 translate-y-1/2 -rotate-45")} />
    </span>
  );
}

/**
 * Hamburger menu for small screens. The panel slides and fades in, the links
 * follow one after another; closing plays it back quickly.
 */
export function MobileMenu({ items }: { items: NavItem[] }) {
  const open = useMenuOpen();
  const close = () => setMenuOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    // Back to desktop width: nothing to show, so close.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setMenuOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  // Links come in one by one when opening; all leave together when closing.
  const stagger = (index: number) => ({ transitionDelay: open ? `${90 + index * 45}ms` : "0ms" });
  const item = cn(
    "transition-[opacity,transform] duration-500 motion-reduce:transition-none",
    EASE,
    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setMenuOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid size-11 place-items-center rounded-md border border-ink-900/15 text-ink-900 transition-colors duration-300 hover:border-brass-500 hover:text-brass-600 group-data-[overlay=true]/header:border-white/40 group-data-[overlay=true]/header:text-white"
      >
        <MenuIcon open={open} />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full h-[calc(100dvh_-_100%)] overflow-y-auto border-t border-line bg-cream",
          "origin-top transition-[opacity,transform,visibility] motion-reduce:transition-none",
          EASE,
          open ? "visible translate-y-0 opacity-100 duration-400" : "invisible -translate-y-2 opacity-0 duration-250",
        )}
      >
        {/* Extra bottom padding: the test-phase bar can push the panel below the viewport. */}
        <nav aria-label="Mobile menu" className="px-4 pt-4 pb-20 sm:px-6">
          <ul className="divide-y divide-line">
            {items.map((link, index) => (
              <li key={link.href} className={item} style={stagger(index)}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="group flex items-center justify-between py-4 font-display text-2xl text-ink-950 transition-colors hover:text-brass-600"
                >
                  {link.label}
                  <Icon name="chevron-right" className="text-brass-500 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
