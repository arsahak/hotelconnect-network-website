import Link from "next/link";
import { Badge } from "@/component/shared/Badge";
import { Icon } from "@/component/shared/Icon";
import { formatDate } from "@/lib/format";
import type { PublicTender } from "@/lib/types";

/** Text of a tender for a card: no tags, one paragraph. */
export const tenderExcerpt = (text: string, max = 180) => {
  const plain = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > max ? `${plain.slice(0, max).trimEnd()}…` : plain;
};

/** One open tender in the public list (Master Briefing v4: anonymous unless a supplier is signed in). */
export function TenderCard({ tender, countryName }: { tender: PublicTender; countryName: string }) {
  const where = [tender.hotel?.city, tender.region || countryName].filter(Boolean).join(" · ");
  return (
    <article className="reveal group relative flex h-full flex-col rounded-lg bg-white p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(36,30,24,0.45)] hover:ring-brass-500/50">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brass">{tender.category}</Badge>
        <Badge tone="outline">{tender.type}</Badge>
      </div>
      <h3 className="mt-4 font-display text-2xl leading-snug text-ink-950">
        <Link href={`/tenders/${tender._id}`} className="after:absolute after:inset-0">
          {tender.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-ink-500">{tender.hotel ? `${tender.hotel.name} · ${where}` : where}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">{tenderExcerpt(tender.description)}</p>
      <p className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
        <span className="inline-flex items-center gap-2 text-ink-500">
          <Icon name="calendar" size={16} className="text-brass-500" />
          Quotes until {formatDate(tender.deadline)}
        </span>
        <Icon name="arrow-right" size={17} className="text-brass-500 transition-transform group-hover:translate-x-1" />
      </p>
    </article>
  );
}
