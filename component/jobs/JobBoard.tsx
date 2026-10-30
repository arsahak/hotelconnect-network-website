import { Suspense } from "react";
import { getCachedOptions } from "@/component/shared/cached-options";
import { ListSkeleton } from "@/component/shared/ListSkeleton";
import { oneOf, pageParam, param } from "@/lib/format";
import { regions } from "@/lib/site";
import { JobFilters } from "./JobFilters";
import { JobResults } from "./JobResults";

type SearchParams = Record<string, string | string[] | undefined>;

/** Reads the filters from the URL, then shows the filter box and the jobs. */
export async function JobBoard({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [params, options] = await Promise.all([searchParams, getCachedOptions()]);
  const category = oneOf(param(params.category), options.data?.vacancyCategories ?? []);
  const region = oneOf(param(params.region), regions);
  const q = param(params.q);
  const page = pageParam(params.page);

  return (
    <>
      <div className="relative z-10 -mt-12 lg:-mt-14">
        <JobFilters category={category} region={region} q={q} />
      </div>
      <div className="mt-12">
        <Suspense key={`${category}|${region}|${q}|${page}`} fallback={<ListSkeleton tall={false} />}>
          <JobResults filters={{ category, region, q, page }} />
        </Suspense>
      </div>
    </>
  );
}
