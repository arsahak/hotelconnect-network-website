import { cacheLife } from "next/cache";
import { getOptionsAction } from "@/app/actions/options";
import { FilterBar } from "@/component/shared/FilterBar";
import { regions as fallbackRegions } from "@/lib/site";

/** Region + keyword filter for the hotel guide. */
export async function HotelFilters({ region, q }: { region?: string; q?: string }) {
  "use cache";
  cacheLife("hours");
  const options = await getOptionsAction();

  return (
    <FilterBar
      action="/hotels"
      hasFilters={Boolean(region || q)}
      fields={[
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
          label: "Hotel or city",
          icon: "building",
          placeholder: "e.g. Amsterdam or canal",
          value: q,
        },
      ]}
    />
  );
}
