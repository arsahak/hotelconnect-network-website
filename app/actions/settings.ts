"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";

/** Phase 2 features (Master Briefing v4) are hidden until an admin switches them on. */
export type Features = { vouchers: boolean; advertising: boolean; reviews: boolean };
export type PlatformSettings = { testPhase: boolean; features?: Features };

/** Is the platform in its test phase? (GET /settings — an admin switches it in the dashboard.) */
export async function getPlatformSettingsAction(): Promise<ActionResponse<PlatformSettings>> {
  return apiRequest<PlatformSettings>("/settings", { fallbackError: "Failed to load the settings." });
}
