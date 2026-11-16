import type { Metadata } from "next";
import { Suspense } from "react";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { Icon, type IconName } from "@/component/shared/Icon";
import { JoinButton } from "@/component/shared/JoinButton";
import { MemberBar } from "@/component/member/MemberBar";
import { MemberSession } from "@/component/member/MemberSession";
import { ListSkeleton } from "@/component/shared/ListSkeleton";
import { PageHero } from "@/component/shared/PageHero";
import { SectionHeading } from "@/component/shared/SectionHeading";
import { SupplierDirectory } from "@/component/suppliers/SupplierDirectory";
import { VoucherSlideshow } from "@/component/vouchers/VoucherSlideshow";
import { pageImages } from "@/lib/data/images";
import { pageMetadata } from "@/lib/seo";
import { getCachedSettings } from "@/component/shared/cached-settings";

export const metadata: Metadata = pageMetadata({
  title: "Suppliers",
  description:
    "The supplier directory of HotelConnect Network, open tenders from boutique hotels, and why suppliers join: free until 1 May 2028, 0% commission.",
  path: "/suppliers",
});

const benefits: { icon: IconName; title: string; text: string }[] = [
  { icon: "bell", title: "Requests, not cold calls", text: "Get an invitation for every tender in your category and region." },
  { icon: "users", title: "Your own profile", text: "Be found in the directory by independent boutique hotels." },
  { icon: "sparkles", title: "Free until 1 May 2028", text: "No membership fee until then. After that from €19 a month, billed yearly." },
  { icon: "tag", title: "0% commission", text: "Win a job, keep the full amount. We never take a cut of your work." },
];

/**
 * Suppliers page (briefing §2.4): benefits, the voucher slideshow, the tender
 * teaser and the public supplier directory.
 */
export default function SuppliersPage({ searchParams }: PageProps<"/suppliers">) {
  return (
    <>
      <PageHero
        eyebrow="For suppliers"
        title="Work with Boutique Hotels"
        description="A private network where independent boutique hotels find trusted suppliers. Free until 1 May 2028 and 0% commission on every job."
        image={pageImages.suppliers}
      >
        <JoinButton size="lg" tab="supplier">
          Join as a supplier
          <Icon name="arrow-right" size={17} />
        </JoinButton>
        <ButtonLink href="#directory" variant="outline-light" size="lg">
          Browse the directory
        </ButtonLink>
      </PageHero>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="bg-sand py-20 lg:py-24">
        <Container>
          <SectionHeading
            id="benefits-title"
            eyebrow="The network"
            title="Why Suppliers Join HotelConnect"
            description="Hotels post what they need; the right suppliers hear about it automatically. No cold calls, no long tender documents."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="reveal rounded-lg bg-white p-6">
                <span className="grid size-12 place-items-center rounded-full bg-brass-100 text-brass-600">
                  <Icon name={benefit.icon} size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink-950">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{benefit.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Corporate vouchers */}
      <VoucherSection />

      {/* Tender teaser */}
      <section aria-label="Tenders" className="bg-ink-900 py-14 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 text-brass-400">
              <Icon name="lock" size={20} />
            </span>
            <div>
              <h2 className="font-display text-2xl">Log in to see tenders in your category and region</h2>
              <p className="mt-1 text-sm text-white/70">Hotels send each tender to at most three matching suppliers.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/login" variant="light">
              Log in
            </ButtonLink>
            <JoinButton variant="outline-light" tab="supplier" />
          </div>
        </Container>
      </section>

      {/* Directory */}
      <section id="directory" aria-labelledby="directory-title" className="scroll-mt-24 bg-cream py-20 lg:py-24">
        <Container>
          <SectionHeading
            id="directory-title"
            eyebrow="Directory"
            title="Suppliers in the Network"
            description="Every supplier is checked before joining. Click a name for the full profile."
            className="mb-10"
          />
          <Suspense fallback={<ListSkeleton tall={false} />}>
            <SupplierDirectory searchParams={searchParams} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}

/** Corporate vouchers (briefing §2.4) — Phase 2 (Master Briefing v4): hidden until an admin switches vouchers on. */
async function VoucherSection() {
  const { features } = await getCachedSettings();
  if (!features.vouchers) return null;
  return (
      <section id="vouchers" aria-labelledby="vouchers-title" className="scroll-mt-24 bg-cream py-20 lg:py-24">
        <Container>
          <SectionHeading
            id="vouchers-title"
            eyebrow="Corporate vouchers"
            title="Business Deals at Member Hotels"
            description="Meetings, stays, dinners and gifts with a member discount. Log in as a supplier to book directly with the hotel."
            action={
              <ButtonLink href="/suppliers/vouchers" variant="outline">
                View all vouchers
                <Icon name="arrow-right" size={16} />
              </ButtonLink>
            }
          />
          <Suspense fallback={<div className="mt-12 h-80 animate-pulse rounded-xl bg-sand" />}>
            <MemberSession>
              <MemberBar className="mt-8" />
              <div className="mt-12">
                <VoucherSlideshow />
              </div>
            </MemberSession>
          </Suspense>
        </Container>
      </section>
  );
}
