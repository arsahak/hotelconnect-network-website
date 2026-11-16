import { cacheLife } from "next/cache";
import { getOptionsAction } from "@/app/actions/options";
import { FilterBar } from "@/component/shared/FilterBar";
import { regions as fallbackRegions } from "@/lib/site";

/**
 * Category + region filter for one of the two job lists (client, 31 Oct).
 * Hotel jobs use the hotel categories; supplier jobs the five main groups.
 * `keep` carries the search and the other list's filters along.
 */
export async function JobFilters({
  employer,
  category,
  region,
  keep,
}: {
  employer: "hotel" | "supplier";
  category?: string;
  region?: string;
  keep: Record<string, string | undefined>;
}) {
  "use cache";
  cacheLife("hours");
  const options = await getOptionsAction();
  const prefix = employer === "hotel" ? "h" : "s";
  const categories = employer === "hotel" ? (options.data?.vacancyCategories ?? []) : Object.keys(options.data?.supplierVacancyGroups ?? {});
  const clear = new URLSearchParams(Object.entries(keep).filter(([, v]) => v) as [string, string][]).toString();

  return (
    <FilterBar
      action={`/jobs#${employer}-jobs`}
      hasFilters={Boolean(category || region)}
      keep={keep}
      clearHref={`/jobs${clear ? `?${clear}` : ""}#${employer}-jobs`}
      fields={[
        { type: "select", name: `${prefix}category`, label: "Category", icon: "briefcase", allLabel: "All categories", options: categories, value: category },
        { type: "select", name: `${prefix}region`, label: "Region", icon: "map-pin", allLabel: "All regions", options: options.data?.regions ?? fallbackRegions, value: region },
      ]}
    />
  );
}
