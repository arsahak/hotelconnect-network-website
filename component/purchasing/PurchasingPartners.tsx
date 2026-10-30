import { cacheLife, cacheTag } from "next/cache";
import { listSuppliersAction } from "@/app/actions/supplier";
import { EmptyState } from "@/component/shared/EmptyState";
import { Icon, type IconName } from "@/component/shared/Icon";
import type { Supplier } from "@/lib/types";

// Briefing §2.6: no wholesaler logos without permission — names and our own icons only.
const CATEGORY_ICONS: Record<string, IconName> = {
  "Linen & textiles": "sparkles",
  Laundry: "sparkles",
  Cleaning: "sparkles",
  "Technical maintenance": "wrench",
  "Fire safety": "shield-check",
  Security: "lock",
  Energy: "zap",
  "F&B": "star",
  Wholesale: "building",
  "Furniture & interior": "building",
  Amenities: "tag",
  "IT & software": "file",
  Staffing: "users",
};

const iconFor = (supplier: Supplier): IconName =>
  supplier.categories.map((c) => CATEGORY_ICONS[c]).find(Boolean) ?? "tag";

/** Ad blocks of member suppliers on the Purchasing page: name, short text, website. */
export async function PurchasingPartners() {
  "use cache";
  cacheLife("minutes");
  cacheTag("suppliers");

  const res = await listSuppliersAction({ purchasing: true, limit: 50 });
  const suppliers = res.data?.items ?? [];

  if (suppliers.length === 0) {
    return (
      <EmptyState icon="building" title="Partners coming soon">
        The first wholesalers and suppliers will appear here shortly.
      </EmptyState>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {suppliers.map((supplier) => (
        <li key={supplier._id} className="reveal flex flex-col rounded-lg bg-white p-6 shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)]">
          <span className="grid size-12 place-items-center rounded-full bg-brass-100 text-brass-600">
            <Icon name={iconFor(supplier)} size={22} strokeWidth={1.5} />
          </span>
          <h3 className="mt-5 font-display text-2xl text-ink-950">{supplier.name}</h3>
          <p className="mt-1 text-xs text-ink-500">{supplier.categories.join(" · ")}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">{supplier.tagline || supplier.description}</p>
          {supplier.website && (
            <a
              href={supplier.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-sm font-medium text-brass-600 hover:text-brass-700"
            >
              Visit website
              <Icon name="arrow-up-right" size={15} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
