import { cacheLife, cacheTag } from "next/cache";
import { listSuppliersAction, type SupplierFilters } from "@/app/actions/supplier";
import { EmptyState } from "@/component/shared/EmptyState";
import { Pager } from "@/component/shared/Pager";
import { SupplierCard } from "./SupplierCard";

/** Directory cards for the current filters. */
export async function SupplierResults({ filters }: { filters: SupplierFilters }) {
  "use cache";
  cacheLife("minutes");
  cacheTag("suppliers");

  const res = await listSuppliersAction({ ...filters, limit: 24 });
  const result = res.data;

  if (!res.ok || !result) {
    return (
      <EmptyState icon="users" title="The supplier directory is not available right now">
        Please try again in a moment.
      </EmptyState>
    );
  }

  if (result.items.length === 0) {
    return (
      <EmptyState icon="users" title="No suppliers found">
        Try another category or region.
      </EmptyState>
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-ink-500">
        {result.total} {result.total === 1 ? "supplier" : "suppliers"}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.items.map((supplier) => (
          <SupplierCard key={supplier._id} supplier={supplier} />
        ))}
      </div>
      <Pager
        page={result.page}
        pages={result.pages}
        basePath="/suppliers"
        query={{ category: filters.category, region: filters.region, q: filters.q }}
      />
    </>
  );
}
