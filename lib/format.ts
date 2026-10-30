/** Dates in Dutch time, written the English way: "24 Oct 2026". */
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Europe/Amsterdam",
});

export function formatDate(value?: string | Date | null): string {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? "" : dateFormat.format(date);
}

/** Reads one string from Next's searchParams (arrays and empties become undefined). */
export function param(value: string | string[] | undefined): string | undefined {
  const text = Array.isArray(value) ? value[0] : value;
  const trimmed = text?.trim();
  return trimmed ? trimmed.slice(0, 100) : undefined;
}

/** ?page=3 → 3 (at least 1). */
export function pageParam(value: string | string[] | undefined): number {
  const n = Number.parseInt(param(value) ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 500) : 1;
}

/** Only allows a filter value that is in the list (protects the API call). */
export function oneOf(value: string | undefined, allowed: readonly string[]): string | undefined {
  return value && allowed.includes(value) ? value : undefined;
}
