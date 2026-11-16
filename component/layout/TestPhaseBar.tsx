import Link from "next/link";
import { getCachedSettings } from "@/component/shared/cached-settings";

/**
 * Thin bar at the very top (Master Briefing v4): the network's one-line pitch,
 * plus the waitlist link while the test phase is on.
 */
export async function TestPhaseBar() {
  const { testPhase } = await getCachedSettings();

  return (
    <div className="bg-ink-950 text-white/80">
      <p className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-xs">
        <span>The 0% Commission Network for Independent Boutique Hotels &amp; Trusted Suppliers.</span>
        {testPhase && (
          <>
            <span className="hidden size-1 rounded-full bg-brass-500 sm:inline-block" aria-hidden="true" />
            <span className="text-white/60">Test phase: sign-ups open soon.</span>
            <Link href="/#waitlist" className="font-medium text-brass-400 underline-offset-4 hover:underline">
              Join the waitlist
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
