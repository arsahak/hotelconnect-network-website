/**
 * Talks to the HotelConnect API (the Express backend) — the same pattern as
 * the dashboard's lib/api.ts. Only used by the server actions in app/actions.
 */
export const API = `${(process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "")}/api/v1`;

/** What every server action returns to a component. */
export interface ActionResponse<T = unknown> {
  ok: boolean;
  data?: T | null;
  /** A message that can be shown to the visitor. */
  error?: string;
}

type Query = Record<string, string | number | boolean | undefined | null>;

function buildUrl(path: string, query?: Query) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== "") params.set(key, String(value));
  }
  const qs = params.toString();
  return `${API}${path}${qs ? `?${qs}` : ""}`;
}

/**
 * Calls the API and unwraps `{ data }`. JSON bodies are sent as JSON;
 * FormData (the CV upload) is sent as-is. Never throws: a network error or
 * an API error comes back as `{ ok: false, error }`.
 */
export async function apiRequest<T>(
  path: string,
  {
    method = "GET",
    query,
    body,
    fallbackError,
    token,
  }: {
    method?: "GET" | "POST";
    query?: Query;
    body?: unknown;
    fallbackError: string;
    /** The signed-in supplier's token (see app/actions/member.ts). */
    token?: string;
  },
): Promise<ActionResponse<T>> {
  const isForm = body instanceof FormData;
  const headers: Record<string, string> = {};
  if (body !== undefined && !isForm) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(buildUrl(path, query), {
      method,
      headers,
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const details = Array.isArray(json?.errors) && json.errors.length ? json.errors.join(" ") : "";
      return { ok: false, error: details || json?.message || fallbackError };
    }
    return { ok: true, data: (json?.data ?? null) as T };
  } catch (error) {
    console.error(`[api] ${method} ${path} failed:`, error instanceof Error ? error.message : error);
    return { ok: false, error: "We could not reach the server. Please try again in a moment." };
  }
}
