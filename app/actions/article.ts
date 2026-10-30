"use server";

import { apiRequest, type ActionResponse } from "@/lib/api";
import type { Article, Page } from "@/lib/types";

/** Published stories, newest first (GET /articles). */
export async function listArticlesAction(
  filters: { kind?: string; page?: number; limit?: number } = {},
): Promise<ActionResponse<Page<Article>>> {
  return apiRequest<Page<Article>>("/articles", { query: filters, fallbackError: "Failed to load the stories." });
}

/** One story, with its body. */
export async function getArticleAction(slug: string): Promise<ActionResponse<Article>> {
  return apiRequest<Article>(`/articles/${encodeURIComponent(slug)}`, { fallbackError: "Story not found." });
}
