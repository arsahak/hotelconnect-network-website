"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";
import type { Hotel, Supplier, Vacancy } from "@/lib/types";

export type Sponsored = { suppliers: Supplier[]; hotels: Hotel[]; jobs: Vacancy[] };

/** Paid homepage spots that are live now, in position order (GET /ads/sponsored). */
export async function getSponsoredAction(): Promise<ActionResponse<Sponsored>> {
  return apiRequest<Sponsored>("/ads/sponsored", { fallbackError: "Failed to load the sponsored items." });
}
