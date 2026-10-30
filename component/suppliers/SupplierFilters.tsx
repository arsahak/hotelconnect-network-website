import { cacheLife } from "next/cache";
import { getOptionsAction } from "@/app/actions/options";
import { FilterBar } from "@/component/shared/FilterBar";

/** Category + region + keyword filter for the supplier directory. */
export async function SupplierFilters({ category, region, q }: { category?: string; region?: string; q?: string }) {
  "use cache";
  cacheLife("hours");
  const options = await getOptionsAction();

  return (
    <FilterBar
      action="/suppliers"
      hasFilters={Boolean(category || region || q)}
      fields={[
        {
          type: "select",
          name: "category",
          label: "Category",
          icon: "tag",
          allLabel: "All categories",
          options: options.data?.supplierCategories ?? [],
          value: category,
        },
        {
          type: "select",
          name: "region",
          label: "Region",
          icon: "map-pin",
          allLabel: "All regions",
          options: options.data?.regions ?? [],
          value: region,
        },
        {
          type: "search",
          name: "q",
          label: "Keyword",
          icon: "search",
          placeholder: "e.g. linen or energy",
          value: q,
        },
      ]}
    />
  );
}
