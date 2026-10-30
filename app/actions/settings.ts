"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";

export type PlatformSettings = { testPhase: boolean };

/** Is the platform in its test phase? (GET /settings — an admin switches it in the dashboard.) */
export async function getPlatformSettingsAction(): Promise<ActionResponse<PlatformSettings>> {
  return apiRequest<PlatformSettings>("/settings", { fallbackError: "Failed to load the settings." });
}
