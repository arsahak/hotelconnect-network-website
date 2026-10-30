import { cacheLife, cacheTag } from "next/cache";
import { getPlatformSettingsAction } from "@/app/actions/settings";

/**
 * The platform settings, cached for a few minutes: when an admin opens
 * registration, the website follows shortly after. If the API can't be
 * reached, the site stays in test phase (registration closed) to be safe.
 */
export async function getCachedSettings() {
  "use cache";
  cacheLife("minutes");
  cacheTag("settings");
  const res = await getPlatformSettingsAction();
  return { testPhase: res.data?.testPhase ?? true };
}
