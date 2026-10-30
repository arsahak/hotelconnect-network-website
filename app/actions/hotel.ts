"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";
import type { Hotel, Page } from "@/lib/types";

export type HotelFilters = {
  q?: string;
  region?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
};

/** Hotel guide (GET /hotels): member hotels, featured first. */
export async function listHotelsAction(filters: HotelFilters = {}): Promise<ActionResponse<Page<Hotel>>> {
  return apiRequest<Page<Hotel>>("/hotels", { query: filters, fallbackError: "Failed to load the hotels." });
}

export async function getHotelAction(slug: string): Promise<ActionResponse<Hotel>> {
  return apiRequest<Hotel>(`/hotels/${encodeURIComponent(slug)}`, { fallbackError: "Hotel not found." });
}
