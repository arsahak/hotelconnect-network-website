import type { Metadata } from "next";
import { Suspense } from "react";
import { HotelGuide } from "@/component/hotels/HotelGuide";
import { Container } from "@/component/shared/Container";
import { ListSkeleton } from "@/component/shared/ListSkeleton";
import { PageHero } from "@/component/shared/PageHero";
import { pageImages } from "@/lib/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Hotel guide",
  description: "Boutique hotels from the HotelConnect network. Book directly with the hotel — no middleman, no extra fees.",
  path: "/hotels",
});

/** Hotel guide (briefing §2.3): every member hotel, booked on the hotel's own site. */
export default function HotelsPage({ searchParams }: PageProps<"/hotels">) {
  return (
    <>
      <PageHero
        eyebrow="Hotel guide"
        title="Book a Boutique Hotel"
        description="Hand-picked boutique hotels from our network. You book directly with the hotel: no middleman and no extra fees."
        image={pageImages.hotels}
      />
      <section id="guide" aria-labelledby="hotels-title" className="scroll-mt-24 bg-cream pb-24">
        <h2 id="hotels-title" className="sr-only">
          All hotels
        </h2>
        <Container>
          <Suspense fallback={<div className="pt-28"><ListSkeleton /></div>}>
            <HotelGuide searchParams={searchParams} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
