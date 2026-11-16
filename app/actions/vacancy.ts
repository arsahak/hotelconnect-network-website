"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";
import type { Page, Vacancy } from "@/lib/types";

export type VacancyFilters = {
  q?: string;
  category?: string;
  region?: string;
  urgent?: boolean;
  /** Jobs at hotels or at suppliers (two lists on the jobs page). */
  employer?: "hotel" | "supplier";
  page?: number;
  limit?: number;
};

const SLUG = /^[a-z0-9-]{1,100}$/;

/** Published jobs, urgent first (GET /vacancies). */
export async function listVacanciesAction(filters: VacancyFilters = {}): Promise<ActionResponse<Page<Vacancy>>> {
  return apiRequest<Page<Vacancy>>("/vacancies", { query: filters, fallbackError: "Failed to load the jobs." });
}

export async function getVacancyAction(slug: string): Promise<ActionResponse<Vacancy>> {
  return apiRequest<Vacancy>(`/vacancies/${encodeURIComponent(slug)}`, { fallbackError: "Job not found." });
}

/**
 * The CV form: the API emails the application (with the CV) straight to the
 * hotel. Nothing is stored — not here, not in the API (briefing §2.2).
 */
export async function applyToVacancyAction(slug: string, formData: FormData): Promise<ActionResponse<null>> {
  if (!SLUG.test(slug)) return { ok: false, error: "This job could not be found." };

  // An empty file input means "no CV": send no file at all.
  const cv = formData.get("cv");
  if (cv instanceof File && cv.size === 0) formData.delete("cv");

  return apiRequest<null>(`/vacancies/${slug}/apply`, {
    method: "POST",
    body: formData,
    fallbackError: "Your application could not be sent. Please try again.",
  });
}
