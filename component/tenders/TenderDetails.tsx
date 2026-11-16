import { notFound } from "next/navigation";
import { getPublicTenderAction } from "@/app/actions/tender";
import { Badge } from "@/component/shared/Badge";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { getCachedOptions } from "@/component/shared/cached-options";
import { Container } from "@/component/shared/Container";
import { Icon, type IconName } from "@/component/shared/Icon";
import { formatDate } from "@/lib/format";
import { memberLoginUrl } from "@/lib/site";

/** One open tender. The hotel and its email only for a signed-in supplier (Master Briefing v4). */
export async function TenderDetails({ params }: { params: PageProps<"/tenders/[id]">["params"] }) {
  const { id } = await params;
  const [res, options] = await Promise.all([getPublicTenderAction(id), getCachedOptions()]);
  const tender = res.data;
  if (!tender) notFound();
  const country = options.data?.countries.find((c) => c.code === tender.country)?.name ?? tender.country;

  const facts: { icon: IconName; label: string; value: string }[] = [
    { icon: "wrench", label: "Trade", value: tender.category },
    { icon: "file", label: "Type", value: tender.type },
    { icon: "map-pin", label: "Location", value: [tender.hotel?.city, tender.region, country].filter(Boolean).join(", ") },
    { icon: "calendar", label: "Quotes until", value: formatDate(tender.deadline) },
  ];
  const subject = encodeURIComponent(`Quote: ${tender.title}`);

  return (
    <div className="bg-cream py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ButtonLink href="/tenders" variant="ghost" size="sm" className="-ml-3">
            <Icon name="arrow-left" size={16} />
            All tenders
          </ButtonLink>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="brass">{tender.category}</Badge>
            <Badge tone="outline">{tender.size === "need" ? "Small job" : "Tender"}</Badge>
          </div>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink-950 sm:text-5xl">{tender.title}</h1>
          <p className="mt-3 text-ink-500">{tender.hotel ? `${tender.hotel.name}, ${tender.hotel.city}` : "A boutique hotel (name visible to signed-in suppliers)"}</p>

          <h2 className="mt-10 font-display text-3xl text-ink-950">What the hotel needs</h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed whitespace-pre-line text-ink-700">{tender.description}</p>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-xl bg-white p-6 shadow-[0_10px_40px_-18px_rgba(27,22,17,0.35)] ring-1 ring-line sm:p-8 lg:sticky lg:top-28">
            <dl className="grid gap-4">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brass-100 text-brass-600">
                    <Icon name={fact.icon} size={17} />
                  </span>
                  <div>
                    <dt className="text-xs text-ink-500">{fact.label}</dt>
                    <dd className="text-sm font-medium text-ink-900">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-7 border-t border-line pt-6">
              {tender.signedIn && tender.contactEmail ? (
                <>
                  <h2 className="font-display text-2xl text-ink-950">Send your quote</h2>
                  <p className="mt-2 text-sm text-ink-500">Reply directly to the hotel. 0% commission, always.</p>
                  <ButtonLink href={`mailto:${tender.contactEmail}?subject=${subject}`} className="mt-5 w-full">
                    <Icon name="mail" size={17} />
                    Email {tender.contactEmail}
                  </ButtonLink>
                </>
              ) : (
                <>
                  <h2 className="font-display text-2xl text-ink-950">Are you a supplier?</h2>
                  <p className="mt-2 text-sm text-ink-500">
                    Log in to see the hotel and its contact email. Free for suppliers until 1 May 2028.
                  </p>
                  <ButtonLink href={memberLoginUrl(`/tenders/${tender._id}`)} className="mt-5 w-full">
                    <Icon name="lock" size={17} />
                    Log in as supplier
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </aside>
      </Container>
    </div>
  );
}
