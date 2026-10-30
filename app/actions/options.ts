"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";
import type { Options } from "@/lib/types";

/** Regions and categories behind every filter (GET /meta/options). */
export async function getOptionsAction(): Promise<ActionResponse<Options>> {
  return apiRequest<Options>("/meta/options", { fallbackError: "Failed to load the filters." });
}
