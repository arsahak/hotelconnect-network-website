import { Suspense } from "react";
import { oneOf, pageParam, param } from "@/lib/format";
import { regions } from "@/lib/site";
import { ListSkeleton } from "@/component/shared/ListSkeleton";
import { HotelFilters } from "./HotelFilters";
import { HotelResults } from "./HotelResults";

type SearchParams = Record<string, string | string[] | undefined>;

/** Reads the filters from the URL, then shows the filter box and the results. */
export async function HotelGuide({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const region = oneOf(param(params.region), regions);
  const q = param(params.q);
  const page = pageParam(params.page);

  return (
    <>
      <div className="relative z-10 -mt-12 lg:-mt-14">
        <HotelFilters region={region} q={q} />
      </div>
      <div className="mt-12">
        <Suspense key={`${region}|${q}|${page}`} fallback={<ListSkeleton />}>
          <HotelResults filters={{ region, q, page }} />
        </Suspense>
      </div>
    </>
  );
}
