import { cacheLife } from "next/cache";
import { getOptionsAction } from "@/app/actions/options";
import { FilterBar } from "@/component/shared/FilterBar";
import { regions as fallbackRegions } from "@/lib/site";

/** Category + region + keyword filter for the jobs page (briefing §2.2). */
export async function JobFilters({ category, region, q }: { category?: string; region?: string; q?: string }) {
  "use cache";
  cacheLife("hours");
  const options = await getOptionsAction();

  return (
    <FilterBar
      action="/jobs"
      hasFilters={Boolean(category || region || q)}
      fields={[
        {
          type: "select",
          name: "category",
          label: "Category",
          icon: "briefcase",
          allLabel: "All categories",
          options: options.data?.vacancyCategories ?? [],
          value: category,
        },
        {
          type: "select",
          name: "region",
          label: "Region",
          icon: "map-pin",
          allLabel: "All regions",
          options: options.data?.regions ?? fallbackRegions,
          value: region,
        },
        {
          type: "search",
          name: "q",
          label: "Keyword",
          icon: "search",
          placeholder: "e.g. chef or Utrecht",
          value: q,
        },
      ]}
    />
  );
}
