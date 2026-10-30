import { cacheLife, cacheTag } from "next/cache";
import { getOptionsAction } from "@/app/actions/options";

/**
 * The filter lists (regions, categories) change rarely, so pages that read
 * the URL can still reuse them from the cache instead of asking the API on
 * every request.
 */
export async function getCachedOptions() {
  "use cache";
  cacheLife("hours");
  cacheTag("options");
  return getOptionsAction();
}
