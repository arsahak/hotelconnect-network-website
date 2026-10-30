import { cn } from "@/lib/cn";
import { BRAND_MARK_PATHS, BRAND_MARK_VIEWBOX } from "@/lib/brand-mark";

/**
 * The golden "H" of the HotelConnect logo, without the lettering.
 * `tone="gold"` uses the logo's gold gradient; `tone="current"` takes the
 * text colour (e.g. a faded watermark).
 */
export function BrandMark({ tone = "gold", className }: { tone?: "gold" | "current"; className?: string }) {
  return (
    <svg viewBox={BRAND_MARK_VIEWBOX} aria-hidden="true" className={cn("h-auto", className)}>
      {tone === "gold" && (
        <defs>
          <linearGradient id="brand-mark-gold" x1="0" y1="21" x2="0" y2="382" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F8D08F" />
            <stop offset="1" stopColor="#B0874B" />
          </linearGradient>
        </defs>
      )}
      {BRAND_MARK_PATHS.map((d) => (
        <path key={d} d={d} fill={tone === "gold" ? "url(#brand-mark-gold)" : "currentColor"} />
      ))}
    </svg>
  );
}
