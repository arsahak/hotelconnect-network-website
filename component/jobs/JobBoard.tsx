import { Suspense } from "react";
import { getCachedOptions } from "@/component/shared/cached-options";
import { FilterBar } from "@/component/shared/FilterBar";
import { ListSkeleton } from "@/component/shared/ListSkeleton";
import { oneOf, pageParam, param } from "@/lib/format";
import { regions } from "@/lib/site";
import { JobFilters } from "./JobFilters";
import { JobResults } from "./JobResults";

type SearchParams = Record<string, string | string[] | undefined>;

/**
 * Jobs page (client, 31 Oct): one search bar on top that searches both lists,
 * then jobs at hotels and jobs at suppliers, each with its own filters
 * (category + region) and its own pages. URL: q · hcategory, hregion, hpage ·
 * scategory, sregion, spage.
 */
export async function JobBoard({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [params, options] = await Promise.all([searchParams, getCachedOptions()]);
  const q = param(params.q);
  const hotel = {
    category: oneOf(param(params.hcategory), options.data?.vacancyCategories ?? []),
    region: oneOf(param(params.hregion), regions),
    page: pageParam(params.hpage),
  };
  const supplier = {
    category: oneOf(param(params.scategory), Object.keys(options.data?.supplierVacancyGroups ?? {})),
    region: oneOf(param(params.sregion), regions),
    page: pageParam(params.spage),
  };
  const hotelQuery = { hcategory: hotel.category, hregion: hotel.region };
  const supplierQuery = { scategory: supplier.category, sregion: supplier.region };

  return (
    <>
      <div className="relative z-10 -mt-12 lg:-mt-14">
        <FilterBar
          action="/jobs"
          hasFilters={Boolean(q)}
          keep={{ ...hotelQuery, ...supplierQuery }}
          fields={[{ type: "search", name: "q", label: "Search all jobs", icon: "search", placeholder: "e.g. chef, electrician or Utrecht", value: q }]}
        />
      </div>

      <section id="hotel-jobs" aria-labelledby="hotel-jobs-title" className="mt-16 scroll-mt-24">
        <h2 id="hotel-jobs-title" className="font-display text-3xl text-ink-950 sm:text-4xl">
          Jobs at Hotels
        </h2>
        <p className="mt-2 text-[0.9375rem] text-ink-500">F&amp;B, housekeeping, reception, management, technical and more at member hotels.</p>
        <div className="mt-6">
          <JobFilters employer="hotel" category={hotel.category} region={hotel.region} keep={{ q, ...supplierQuery }} />
        </div>
        <div className="mt-8">
          <Suspense key={`h|${hotel.category}|${hotel.region}|${q}|${hotel.page}`} fallback={<ListSkeleton tall={false} />}>
            <JobResults employer="hotel" filters={{ ...hotel, q }} query={{ q, ...hotelQuery, ...supplierQuery, spage: params.spage ? String(supplier.page) : undefined }} />
          </Suspense>
        </div>
      </section>

      <section id="supplier-jobs" aria-labelledby="supplier-jobs-title" className="mt-20 scroll-mt-24">
        <h2 id="supplier-jobs-title" className="font-display text-3xl text-ink-950 sm:text-4xl">
          Jobs at Suppliers
        </h2>
        <p className="mt-2 text-[0.9375rem] text-ink-500">Technical, construction, facilities and advisory jobs at the companies that work for our hotels.</p>
        <div className="mt-6">
          <JobFilters employer="supplier" category={supplier.category} region={supplier.region} keep={{ q, ...hotelQuery }} />
        </div>
        <div className="mt-8">
          <Suspense key={`s|${supplier.category}|${supplier.region}|${q}|${supplier.page}`} fallback={<ListSkeleton tall={false} />}>
            <JobResults employer="supplier" filters={{ ...supplier, q }} query={{ q, ...hotelQuery, ...supplierQuery, hpage: params.hpage ? String(hotel.page) : undefined }} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
