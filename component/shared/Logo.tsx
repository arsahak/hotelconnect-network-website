import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const tones = {
  dark: { name: "text-ink-950", sub: "text-brass-600", mark: "text-brass-500" },
  light: { name: "text-white", sub: "text-brass-400", mark: "text-brass-400" },
  // Follows the header: white over the hero, dark once the header turns solid.
  header: {
    name: "text-ink-950 group-data-[overlay=true]/header:text-white",
    sub: "text-brass-600 group-data-[overlay=true]/header:text-white/70",
    mark: "text-brass-500 group-data-[overlay=true]/header:text-brass-400",
  },
};

/**
 * Placeholder logo. The designer will deliver the real logo — swap this
 * component's content for it (e.g. next/image with /logo.svg).
 */
export function Logo({
  tone = "dark",
  className,
}: {
  tone?: keyof typeof tones;
  className?: string;
}) {
  const colors = tones[tone];
  return (
    <Link
      href="/"
      aria-label={`${site.name} – go to the homepage`}
      className={cn("inline-flex items-center gap-3", className)}
    >
      <svg
        viewBox="0 0 40 32"
        width="40"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("transition-colors", colors.mark)}
      >
        <path d="M20 3c5 6 5 14 0 21-5-7-5-15 0-21Z" />
        <path d="M20 24c-7-1-12-7-12-14 6 1 10 5 12 14Z" />
        <path d="M20 24c7-1 12-7 12-14-6 1-10 5-12 14Z" />
        <path d="M20 26c-8 0-15-4-18-10 7 0 13 3 18 10Z" />
        <path d="M20 26c8 0 15-4 18-10-7 0-13 3-18 10Z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn("text-base leading-none font-bold tracking-[0.14em] uppercase transition-colors", colors.name)}>
          HotelConnect
        </span>
        <span className={cn("mt-1 text-[0.5625rem] leading-none font-semibold tracking-[0.38em] uppercase transition-colors", colors.sub)}>
          Network
        </span>
      </span>
    </Link>
  );
}
