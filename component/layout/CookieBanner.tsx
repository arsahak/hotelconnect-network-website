"use client";

import { useSyncExternalStore } from "react";
import { buttonClasses } from "@/component/shared/button-styles";
import { legalNav } from "@/lib/site";

const KEY = "hc-cookies-ok";
const listeners = new Set<() => void>();
/** Also remembered in memory, for browsers that block localStorage. */
let dismissed = false;

function accepted() {
  if (dismissed) return true;
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Essential-cookie notice at the bottom (Master Briefing v4). The site only
 * uses essential cookies, so there is nothing to choose: [ OK ] hides it.
 */
export function CookieBanner() {
  // Hidden on the server (no localStorage there); shown after load until OK is pressed.
  const show = useSyncExternalStore(subscribe, () => !accepted(), () => false);

  if (!show) return null;

  const policy = legalNav.find((item) => item.href.includes("cookie")) ?? legalNav[0];

  function accept() {
    dismissed = true;
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // Private mode: nothing is stored, the banner returns on the next visit.
    }
    listeners.forEach((listener) => listener());
  }

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-3xl animate-hero-in flex-col gap-4 rounded-lg bg-ink-950 p-5 text-sm text-white/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:flex-row sm:items-center sm:gap-6 sm:px-6"
    >
      <p className="flex-1 leading-relaxed">
        We only use essential cookies to keep this site working and secure. No tracking, no advertising.{" "}
        <a href={policy.href} target="_blank" rel="noopener" className="text-brass-400 underline underline-offset-4 hover:text-brass-300">
          Privacy &amp; cookie policy
        </a>
      </p>
      <button type="button" onClick={accept} className={buttonClasses({ size: "sm", className: "shrink-0 sm:min-w-20" })}>
        OK
      </button>
    </div>
  );
}
