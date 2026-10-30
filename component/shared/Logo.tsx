import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const LOGOS = {
  black: "/assets/logo/hotelconnect-network-blacklogo.svg",
  white: "/assets/logo/hotelconnect-network-whitelogo.svg",
};

// The SVG files are 1600 × 402. width/height must keep that ratio, or the
// browser squeezes the logo into a too-narrow box and it looks small and soft.
const WIDTH = 1600;
const HEIGHT = 402;

/**
 * The HotelConnect Network logo.
 * - dark: black lettering, for light backgrounds
 * - light: white lettering, for dark backgrounds (footer)
 * - header: follows the header — white over the homepage photo, black once
 *   the header turns solid (see HeaderShell, `data-overlay`)
 */
export function Logo({
  tone = "dark",
  size,
  className,
}: {
  tone?: "dark" | "light" | "header";
  /** Height override, e.g. "h-14" in the footer. Default 48px (h-12). */
  size?: string;
  className?: string;
}) {
  const image = (src: string, extra?: string) => (
    <Image
      src={src}
      alt=""
      width={WIDTH}
      height={HEIGHT}
      unoptimized
      preload={tone === "header"}
      className={cn("w-auto select-none", size ?? "h-12", extra)}
    />
  );

  return (
    <Link
      href="/"
      aria-label={`${site.name} – go to the homepage`}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      {tone === "dark" && image(LOGOS.black)}
      {tone === "light" && image(LOGOS.white)}
      {tone === "header" && (
        <>
          {image(LOGOS.black, "group-data-[overlay=true]/header:hidden")}
          {image(LOGOS.white, "hidden group-data-[overlay=true]/header:block")}
        </>
      )}
    </Link>
  );
}
