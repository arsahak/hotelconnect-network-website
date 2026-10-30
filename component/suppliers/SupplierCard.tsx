import Link from "next/link";
import type { Supplier } from "@/lib/types";
import { Badge } from "@/component/shared/Badge";
import { Icon } from "@/component/shared/Icon";
import { SupplierLogo } from "./SupplierLogo";

/**
 * Directory card (briefing §2.4): name, logo, short description, categories,
 * regions and website. The name/logo open the profile; no contact details.
 */
export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <article className="reveal flex flex-col rounded-lg bg-white p-6 shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(36,30,24,0.35)]">
      <Link href={`/suppliers/${supplier.slug}`} className="group flex items-center gap-4">
        <SupplierLogo name={supplier.name} logo={supplier.logo} />
        <h3 className="font-display text-xl leading-snug text-ink-950 transition-colors group-hover:text-brass-600">
          {supplier.name}
        </h3>
      </Link>

      <p className="mt-4 line-clamp-3 text-[0.8125rem] leading-relaxed text-ink-500 mb-1">
        {supplier.tagline || supplier.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Categories">
        {supplier.categories.map((category) => (
          <li key={category}>
            <Badge tone="brass">{category}</Badge>
          </li>
        ))}
      </ul>

      <p className="mt-3 flex items-start gap-1.5 text-xs text-ink-500">
        <Icon name="map-pin" size={14} className="mt-px shrink-0 text-brass-500" />
        {supplier.regions.join(" · ")}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
        <Link href={`/suppliers/${supplier.slug}`} className="text-[0.8125rem] font-medium text-brass-600 hover:text-brass-700">
          View profile
        </Link>
        {supplier.website && (
          <a
            href={supplier.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[0.8125rem] text-ink-500 hover:text-brass-600"
          >
            Website
            <Icon name="arrow-up-right" size={14} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
