import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/component/shared/Container";
import { ListSkeleton } from "@/component/shared/ListSkeleton";
import { PageHero } from "@/component/shared/PageHero";
import { TenderBoard } from "@/component/tenders/TenderBoard";
import { pageImages } from "@/lib/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tenders",
  description:
    "Open tenders from independent boutique hotels: maintenance, inspections and projects. Suppliers send their quote directly to the hotel — 0% commission.",
  path: "/tenders",
});

/** Public Tenders page (Master Briefing v4): anonymous; signed-in suppliers see the hotel and contact email. */
export default function TendersPage({ searchParams }: PageProps<"/tenders">) {
  return (
    <>
      <PageHero
        eyebrow="Tenders"
        title="Open Tenders from Boutique Hotels"
        description="Maintenance, inspections and projects that hotels need done. Hotels stay anonymous here; signed-in suppliers see who it is and reply directly — with zero commission."
        image={pageImages.purchasing}
      />
      <div className="bg-cream pb-24">
        <Container>
          <Suspense fallback={<div className="pt-16"><ListSkeleton tall={false} /></div>}>
            <TenderBoard searchParams={searchParams} />
          </Suspense>
        </Container>
      </div>
    </>
  );
}
