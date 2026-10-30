import { notFound } from "next/navigation";
import { getSupplierAction } from "@/app/actions/supplier";
import { Badge } from "@/component/shared/Badge";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { Icon } from "@/component/shared/Icon";
import { JoinButton } from "@/component/shared/JoinButton";
import { Photo } from "@/component/shared/Photo";
import { TextLink } from "@/component/shared/TextLink";
import { SupplierLogo } from "./SupplierLogo";

/** Public supplier profile (briefing §2.4). Contact details are for members only. */
export async function SupplierProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supplier = (await getSupplierAction(slug)).data;
  if (!supplier) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <Photo src={supplier.image} alt="" sizes="100vw" priority className="-z-20 opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/90 via-ink-950/60 to-ink-950/30" />
        <Container className="py-14 sm:py-16">
          <TextLink href="/suppliers" tone="light">
            Supplier directory
          </TextLink>
          <div className="mt-6 flex items-center gap-4 sm:gap-5">
            <SupplierLogo name={supplier.name} logo={supplier.logo} className="size-16 shrink-0 text-xl sm:size-20 sm:text-2xl" />
            <div className="min-w-0">
              <h1 className="font-display text-3xl leading-tight break-words [-webkit-text-stroke:0.8px_currentColor] sm:text-5xl">
                {supplier.name}
              </h1>
              <p className="mt-2 text-white/75">{supplier.tagline}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl text-ink-950">About {supplier.name}</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed whitespace-pre-line text-ink-700">
              {supplier.description || supplier.tagline}
            </p>

            <h3 className="mt-10 eyebrow text-brass-600">Categories</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {supplier.categories.map((category) => (
                <li key={category}>
                  <Badge tone="brass">{category}</Badge>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 eyebrow text-brass-600">Regions</h3>
            <p className="mt-3 flex items-start gap-2 text-sm text-ink-700">
              <Icon name="map-pin" size={16} className="mt-0.5 shrink-0 text-brass-500" />
              {supplier.regions.join(" · ")}
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-xl bg-white p-6 shadow-[0_10px_40px_-18px_rgba(27,22,17,0.35)] ring-1 ring-line sm:p-8">
              <p className="text-xs text-ink-500">Member number</p>
              <p className="font-display text-2xl text-ink-950">{supplier.memberNumber}</p>

              {supplier.website && (
                <ButtonLink href={supplier.website} external className="mt-6 w-full">
                  Visit website
                </ButtonLink>
              )}

              <div className="mt-6 rounded-lg bg-sand p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-ink-900">
                  <Icon name="lock" size={16} className="text-brass-600" />
                  Contact details are for members
                </p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-500">
                  Member hotels see this supplier&apos;s contact details and can invite them to tenders.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <ButtonLink href="/login" variant="dark" size="sm">
                    Log in
                  </ButtonLink>
                  <JoinButton variant="outline" size="sm" />
                </div>
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
