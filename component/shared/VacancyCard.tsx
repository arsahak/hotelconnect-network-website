import Link from "next/link";
import type { Vacancy } from "@/lib/types";
import { emailApplyUrl, whatsappApplyUrl } from "@/lib/apply-links";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";
import { buttonClasses } from "./button-styles";
import { Icon } from "./Icon";

/** Job card with 1-click apply via WhatsApp or email. */
export function VacancyCard({ vacancy, className }: { vacancy: Vacancy; className?: string }) {
  return (
    <article
      className={cn(
        "reveal flex flex-col rounded-lg bg-white p-6 shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(36,30,24,0.35)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {vacancy.urgent ? (
          <Badge tone="ember">
            <span className="size-1.5 rounded-full bg-ember-600" aria-hidden="true" />
            Urgent
          </Badge>
        ) : (
          <Badge tone="outline">{vacancy.category}</Badge>
        )}
        <span className="text-xs text-ink-500">{vacancy.postedLabel}</span>
      </div>

      <h3 className="mt-5 font-display text-2xl leading-snug text-ink-950">
        <Link href={`/jobs/${vacancy.slug}`} className="transition-colors hover:text-brass-600">
          {vacancy.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-ink-700">{vacancy.hotelName}</p>

      <ul className="mt-5 space-y-2 border-t border-line pt-5 text-[0.8125rem] text-ink-500">
        <li className="flex items-center gap-2">
          <Icon name="map-pin" size={15} className="text-brass-500" />
          {vacancy.city}
        </li>
        <li className="flex items-center gap-2">
          <Icon name="briefcase" size={15} className="text-brass-500" />
          {vacancy.category}
        </li>
        <li className="flex items-center gap-2">
          <Icon name="clock" size={15} className="text-brass-500" />
          {vacancy.employmentType}
        </li>
      </ul>

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        <a
          href={whatsappApplyUrl(vacancy)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ size: "sm" })}
        >
          <Icon name="chat" size={15} />
          Apply via WhatsApp
        </a>
        <a href={emailApplyUrl(vacancy)} className={buttonClasses({ variant: "outline", size: "sm" })}>
          <Icon name="mail" size={15} />
          Email
        </a>
      </div>
    </article>
  );
}
