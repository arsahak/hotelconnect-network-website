import { cacheLife, cacheTag } from "next/cache";
import { getOpenTenderCountAction } from "@/app/actions/tender";

/**
 * Master Briefing v4: "Tenders" shows in the menu (between Hotels and Jobs)
 * only while at least one tender is open. Cached for a few minutes.
 */
export async function getCachedOpenTenderCount() {
  "use cache";
  cacheLife("minutes");
  cacheTag("tenders");
  return getOpenTenderCountAction();
}
