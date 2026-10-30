import type { Metadata } from "next";
import { Suspense } from "react";
import { PurchasingPartners } from "@/component/purchasing/PurchasingPartners";
import { Container } from "@/component/shared/Container";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { Icon } from "@/component/shared/Icon";
import { ListSkeleton } from "@/component/shared/ListSkeleton";
import { PageHero } from "@/component/shared/PageHero";
import { SectionHeading } from "@/component/shared/SectionHeading";
import { pageImages } from "@/lib/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Purchasing & webshops",
  description:
    "Every wholesaler and webshop boutique hotels buy from, in one place. Find trusted suppliers for linen, food, cleaning, energy and more.",
  path: "/purchasing",
});

/** Purchasing & webshops (briefing §2.6). */
export default function PurchasingPage() {
  return (
    <>
      <PageHero
        eyebrow="Purchasing & webshops"
        title="Every Wholesaler in One Place"
        description="Hotels buy from dozens of wholesalers every day. But there is no single place where you find them all. Until now."
        image={pageImages.purchasing}
      />

      <section aria-labelledby="partners-title" className="bg-cream py-20 lg:py-24">
        <Container>
          <SectionHeading
            id="partners-title"
            eyebrow="Our partners"
            title="Suppliers in the Network"
            description="These suppliers are already part of HotelConnect. Visit their webshop or website to order."
            className="mb-12"
          />
          <Suspense fallback={<ListSkeleton tall={false} />}>
            <PurchasingPartners />
          </Suspense>
        </Container>
      </section>

      <section aria-labelledby="webshop-title" className="bg-cream pb-24">
        <Container>
          <div className="reveal relative isolate overflow-hidden rounded-2xl bg-ink-900 p-8 text-white sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-brass-500/20 blur-3xl" />
            <Eyebrow tone="light">Coming soon</Eyebrow>
            <h2 id="webshop-title" className="heading-strong mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
              Our Own Webshop
            </h2>
            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-white/75">
              In phase 2 we open our own webshop, where you find every wholesaler in one place. With one login, one
              overview, and extra discounts.
            </p>
            <ul className="mt-8 grid max-w-2xl gap-3 text-sm text-white/85 sm:grid-cols-3">
              {["One login", "One overview", "Extra discounts"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded-full bg-brass-500">
                    <Icon name="check" size={13} strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
