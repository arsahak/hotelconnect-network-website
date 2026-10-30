"use client";

import { createContext, useContext, type ReactNode } from "react";

const PlatformContext = createContext({ testPhase: true });

/** Shares the platform settings (test phase on/off) with client components. */
export function PlatformProvider({ testPhase, children }: { testPhase: boolean; children: ReactNode }) {
  return <PlatformContext value={{ testPhase }}>{children}</PlatformContext>;
}

export function usePlatform() {
  return useContext(PlatformContext);
}
