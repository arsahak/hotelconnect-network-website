import type { ReactNode } from "react";
import { Footer } from "@/component/layout/Footer";
import { Navbar } from "@/component/layout/Navbar";
import { TestPhaseBar } from "@/component/layout/TestPhaseBar";

/** Layout for the public pages. Member dashboards will get their own layout. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <TestPhaseBar />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
