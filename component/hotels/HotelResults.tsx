import { cacheLife, cacheTag } from "next/cache";
import { listHotelsAction, type HotelFilters } from "@/app/actions/hotel";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { EmptyState } from "@/component/shared/EmptyState";
import { HotelCard } from "@/component/shared/HotelCard";
import { Pager } from "@/component/shared/Pager";

/** The hotel cards for the current filters. Cached for a few minutes per filter. */
export async function HotelResults({ filters }: { filters: HotelFilters }) {
  "use cache";
  cacheLife("minutes");
  cacheTag("hotels");

  const res = await listHotelsAction({ ...filters, limit: 12 });
  const result = res.data;

  if (!res.ok || !result) {
    return (
      <EmptyState icon="building" title="The hotel guide is not available right now">
        Please try again in a moment.
      </EmptyState>
    );
  }

  if (result.items.length === 0) {
    return (
      <EmptyState
        icon="building"
        title="No hotels found"
        action={<ButtonLink href="/hotels" variant="outline">Show all hotels</ButtonLink>}
      >
        Try another region or search word.
      </EmptyState>
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-ink-500">
        {result.total} {result.total === 1 ? "hotel" : "hotels"}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.items.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
        ))}
      </div>
      <Pager
        page={result.page}
        pages={result.pages}
        basePath="/hotels"
        query={{ region: filters.region, q: filters.q }}
      />
    </>
  );
}
