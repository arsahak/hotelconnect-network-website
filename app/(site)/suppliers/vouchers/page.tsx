import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginNotice } from "@/component/member/LoginNotice";
import { MemberSession } from "@/component/member/MemberSession";
import { Container } from "@/component/shared/Container";
import { PageHero } from "@/component/shared/PageHero";
import { getCachedOptions } from "@/component/shared/cached-options";
import { MemberVouchers } from "@/component/vouchers/MemberVouchers";
import { pageImages } from "@/lib/data/images";
import { regions as fallbackRegions } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getCachedSettings } from "@/component/shared/cached-settings";

export const metadata: Metadata = pageMetadata({
  title: "Corporate vouchers",
  description:
    "Corporate vouchers at boutique hotels in the HotelConnect network: business stays, meeting rooms and dinners at member rates, for supplier members.",
  path: "/suppliers/vouchers",
});

/**
 * All corporate vouchers (briefing §2.5): open right away for a signed-in
 * supplier, otherwise unlocked with a supplier member number.
 */
export default async function VouchersPage() {
  // Phase 2 (Master Briefing v4): no voucher page until an admin switches vouchers on.
  if (!(await getCachedSettings()).features.vouchers) notFound();
  const options = await getCachedOptions();

  return (
    <>
      <PageHero
        eyebrow="Corporate vouchers"
        title="Meet, Stay and Dine for Less"
        description="Meetings, overnight stays, dinners and gifts at member hotels, with a discount for HotelConnect suppliers."
        image={pageImages.vouchers}
      />
      <section aria-labelledby="vouchers-title" className="bg-cream py-16 lg:py-20">
        <h2 id="vouchers-title" className="sr-only">
          All vouchers
        </h2>
        <Container>
          <Suspense fallback={<div className="mx-auto h-72 max-w-xl animate-pulse rounded-xl bg-white ring-1 ring-line" />}>
            <MemberSession>
              <LoginNotice className="mx-auto mb-6 max-w-xl" />
              <MemberVouchers
                categories={options.data?.voucherCategories ?? ["Meeting", "Stay", "Dining", "Gift"]}
                regions={options.data?.regions ?? fallbackRegions}
              />
            </MemberSession>
          </Suspense>
        </Container>
      </section>
    </>
  );
}
