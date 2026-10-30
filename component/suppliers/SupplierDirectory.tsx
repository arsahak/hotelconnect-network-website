import { Suspense } from "react";
import { getCachedOptions } from "@/component/shared/cached-options";
import { ListSkeleton } from "@/component/shared/ListSkeleton";
import { oneOf, pageParam, param } from "@/lib/format";
import { SupplierFilters } from "./SupplierFilters";
import { SupplierResults } from "./SupplierResults";

type SearchParams = Record<string, string | string[] | undefined>;

/** Reads the filters from the URL, then shows the filter box and the directory. */
export async function SupplierDirectory({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [params, options] = await Promise.all([searchParams, getCachedOptions()]);
  const category = oneOf(param(params.category), options.data?.supplierCategories ?? []);
  const region = oneOf(param(params.region), options.data?.regions ?? []);
  const q = param(params.q);
  const page = pageParam(params.page);

  return (
    <>
      <SupplierFilters category={category} region={region} q={q} />
      <div className="mt-10">
        <Suspense key={`${category}|${region}|${q}|${page}`} fallback={<ListSkeleton tall={false} />}>
          <SupplierResults filters={{ category, region, q, page }} />
        </Suspense>
      </div>
    </>
  );
}
