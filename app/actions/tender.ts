"use server";

import { cookies } from "next/headers";
import { apiRequest, type ActionResponse } from "@/lib/api";
import type { Page, PublicTender } from "@/lib/types";

// Public Tenders page (Master Briefing v4). Anonymous for visitors; with the
// signed-in supplier's cookie (see member.ts) the API adds the hotel and email.

async function memberToken() {
  return (await cookies()).get("hc_member")?.value;
}

export async function getPublicTendersAction(query: { q?: string; category?: string; page?: number }): Promise<
  ActionResponse<Page<PublicTender> & { signedIn: boolean }>
> {
  return apiRequest("/public-tenders", { query: { ...query, limit: 12 }, token: await memberToken(), fallbackError: "Failed to load the tenders." });
}

export async function getPublicTenderAction(id: string): Promise<ActionResponse<PublicTender & { signedIn: boolean }>> {
  return apiRequest(`/public-tenders/${encodeURIComponent(id)}`, { token: await memberToken(), fallbackError: "This tender is closed or does not exist." });
}

/** For the menu: no cookies, so it can be cached. */
export async function getOpenTenderCountAction(): Promise<number> {
  const res = await apiRequest<{ open: number }>("/public-tenders/count", { fallbackError: "Failed to count the tenders." });
  return res.data?.open ?? 0;
}
