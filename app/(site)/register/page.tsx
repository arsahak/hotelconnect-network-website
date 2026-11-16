import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/component/shared/Container";
import { PageHero } from "@/component/shared/PageHero";
import { WaitlistForm } from "@/component/shared/WaitlistForm";
import { RegisterForm } from "@/component/register/RegisterForm";
import { getCachedOptions } from "@/component/shared/cached-options";
import { getCachedSettings } from "@/component/shared/cached-settings";
import { pageImages } from "@/lib/data/images";
import { regions as fallbackRegions, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Become a member",
  description: `Register your boutique hotel or supply company with ${site.name}. Hotels from €350 per year by number of rooms; suppliers free until 1 May 2028. 0% commission.`,
  path: "/register",
});

/** The form, with ?type=hotel|supplier and ?plan=contract|commission from the price popup. */
async function RegisterSection({ searchParams }: { searchParams: PageProps<"/register">["searchParams"] }) {
  const [params, settings, options] = await Promise.all([searchParams, getCachedSettings(), getCachedOptions()]);

  if (settings.testPhase) {
    return (
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-[0_10px_40px_-18px_rgba(27,22,17,0.35)] ring-1 ring-line sm:p-10">
        <h2 className="font-display text-3xl text-ink-950">Sign-ups open soon</h2>
        <p className="mt-2 mb-6 text-sm text-ink-500">
          We are in our test phase with the first hotels and suppliers. Leave your email address and you will be the first
          to know when you can register.
        </p>
        <WaitlistForm />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <RegisterForm
        initialType={params.type === "supplier" ? "supplier" : "hotel"}
        initialPlan={params.plan === "contract" ? "contract" : "commission"}
        invite={typeof params.invite === "string" && /^[a-f0-9]{16,64}$/.test(params.invite) ? params.invite : undefined}
        regions={options.data?.regions ?? fallbackRegions}
        countries={options.data?.countries ?? [{ code: "NL", name: "Netherlands" }]}
        supplierRegions={options.data?.supplierRegions ?? ["All of the Netherlands", ...fallbackRegions]}
        supplierCategories={options.data?.supplierCategories ?? []}
      />
    </div>
  );
}

/** Sign-up page (briefing §3.1, §4.1). Closed during the test phase. */
export default function RegisterPage({ searchParams }: PageProps<"/register">) {
  return (
    <>
      <PageHero
        eyebrow="Become a member"
        title="Join HotelConnect Network"
        description="Register your hotel or company. We check every new member, so the network stays trusted."
        image={pageImages.hotels}
      />
      <section className="bg-cream py-16 lg:py-20">
        <Container>
          <Suspense fallback={<div className="mx-auto h-96 max-w-3xl animate-pulse rounded-xl bg-white" />}>
            <RegisterSection searchParams={searchParams} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
