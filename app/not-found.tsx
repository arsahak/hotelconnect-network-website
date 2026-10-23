import type { Metadata } from "next";
import { Footer } from "@/component/layout/Footer";
import { Navbar } from "@/component/layout/Navbar";
import { TestPhaseBar } from "@/component/layout/TestPhaseBar";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { Icon } from "@/component/shared/Icon";
import { sectionTitleClasses } from "@/component/shared/SectionHeading";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * 404 page for unknown URLs and for pages that are not built yet.
 * It renders in the root layout, so it brings its own header and footer.
 */
export default function NotFound() {
  return (
    <>
      <TestPhaseBar />
      <Navbar />
      <main id="main" className="relative isolate flex flex-1 items-center overflow-hidden bg-sand py-24 lg:py-32">
        {/* Large faded lotus in the background */}
        <svg
          viewBox="0 0 40 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[44rem] max-w-none -translate-x-1/2 -translate-y-1/2 text-brass-500/10"
        >
          <path d="M20 3c5 6 5 14 0 21-5-7-5-15 0-21Z" />
          <path d="M20 24c-7-1-12-7-12-14 6 1 10 5 12 14Z" />
          <path d="M20 24c7-1 12-7 12-14-6 1-10 5-12 14Z" />
          <path d="M20 26c-8 0-15-4-18-10 7 0 13 3 18 10Z" />
          <path d="M20 26c8 0 15-4 18-10-7 0-13 3-18 10Z" />
        </svg>

        <Container className="text-center">
          <div className="mx-auto max-w-xl">
            <p className="heading-strong font-display text-7xl text-brass-500 sm:text-8xl">404</p>
            <Eyebrow centered className="mt-6">
              Page not found
            </Eyebrow>
            <h1 className={cn("mt-4 text-ink-950", sectionTitleClasses)}>This Page Is Not Ready Yet</h1>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-500">
              We are still building parts of HotelConnect. The page you are looking for may be coming
              soon, or the link may be wrong.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/" size="lg">
                <Icon name="arrow-left" size={17} />
                Back to home
              </ButtonLink>
              <ButtonLink href="/#waitlist" variant="outline" size="lg">
                Join the waitlist
              </ButtonLink>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
