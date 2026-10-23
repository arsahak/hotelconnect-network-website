import Link from "next/link";
import { site } from "@/lib/site";

/** Thin bar at the very top during the test phase (briefing §2.1). */
export function TestPhaseBar() {
  if (!site.testPhase) return null;

  return (
    <div className="bg-ink-950 text-white/80">
      <p className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-xs">
        <span>We are in our test phase. Sign-ups open soon.</span>
        <Link href="/#waitlist" className="font-medium text-brass-400 underline-offset-4 hover:underline">
          Join the waitlist
        </Link>
      </p>
    </div>
  );
}
