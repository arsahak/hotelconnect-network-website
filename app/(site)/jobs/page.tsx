import type { Metadata } from "next";
import { Suspense } from "react";
import { JobBoard } from "@/component/jobs/JobBoard";
import { Container } from "@/component/shared/Container";
import { ListSkeleton } from "@/component/shared/ListSkeleton";
import { PageHero } from "@/component/shared/PageHero";
import { pageImages } from "@/lib/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Jobs",
  description: "Jobs at independent boutique hotels and their suppliers. Apply in one click via WhatsApp or email — no account needed.",
  path: "/jobs",
});

/** Jobs page (briefing §2.2; client 31 Oct): jobs at member hotels and at suppliers with a maintenance contract. */
export default function JobsPage({ searchParams }: PageProps<"/jobs">) {
  return (
    <>
      <PageHero
        eyebrow="Jobs"
        title="Work in Hospitality"
        description="Jobs at boutique hotels and at the companies that keep them running. Apply in one click via WhatsApp or email, or send your CV — no account needed."
        image={pageImages.jobs}
      />
      <div className="bg-cream pb-24">
        <Container>
          <Suspense fallback={<div className="pt-28"><ListSkeleton tall={false} /></div>}>
            <JobBoard searchParams={searchParams} />
          </Suspense>
          <p className="mt-10 flex items-start gap-2 text-[0.8125rem] text-ink-500 sm:items-center">
            HotelConnect does not store applications or CVs — they go straight to the hotel or company.
          </p>
        </Container>
      </div>
    </>
  );
}
