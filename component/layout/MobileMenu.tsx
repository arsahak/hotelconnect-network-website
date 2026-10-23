"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/site";
import { AboutButton } from "@/component/shared/AboutButton";
import { buttonClasses } from "@/component/shared/button-styles";
import { Icon } from "@/component/shared/Icon";
import { JoinButton } from "@/component/shared/JoinButton";

/** Hamburger menu for small screens. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid size-11 place-items-center rounded-md border border-ink-900/15 text-ink-900 transition-colors group-data-[overlay=true]/header:border-white/40 group-data-[overlay=true]/header:text-white"
      >
        <Icon name={open ? "x" : "menu"} />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full h-[calc(100dvh_-_100%)] overflow-y-auto border-t border-line bg-cream"
        >
          {/* Extra bottom padding: the test-phase bar can push the panel below the viewport. */}
          <nav aria-label="Mobile menu" className="px-4 pt-4 pb-20 sm:px-6">
            <ul className="divide-y divide-line">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex items-center justify-between py-4 font-display text-2xl text-ink-950"
                  >
                    {item.label}
                    <Icon name="chevron-right" className="text-brass-500" />
                  </Link>
                </li>
              ))}
              <li>
                <AboutButton
                  unstyled
                  className="flex w-full items-center justify-between py-4 text-left font-display text-2xl text-ink-950"
                >
                  About us
                  <Icon name="chevron-right" className="text-brass-500" />
                </AboutButton>
              </li>
            </ul>

            <div className="mt-8 grid gap-3">
              <JoinButton size="lg" className="w-full" />
              <Link
                href="/login"
                onClick={close}
                className={buttonClasses({ variant: "outline", size: "lg", className: "w-full" })}
              >
                Log in
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
