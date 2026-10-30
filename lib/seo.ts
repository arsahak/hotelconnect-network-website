import type { Metadata } from "next";
import { site } from "./site";

const DEFAULT_IMAGE = { width: 1200, height: 630, alt: `${site.name} – the private network for boutique hotels and their suppliers` };

/**
 * Metadata for one page: its own title, description, canonical URL and
 * share preview (Open Graph + X/Twitter). Without an `image` the preview uses
 * app/opengraph-image.png (the logo on black, 1200 × 630).
 */
export function pageMetadata({
  title,
  description = site.description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description?: string;
  /** e.g. "/jobs" — made absolute with metadataBase. */
  path: string;
  /** A photo of this hotel, supplier, job or story. */
  image?: string;
  type?: "website" | "article";
}): Metadata {
  // Google shows about 60 characters: a long title (e.g. a story) goes without the brand suffix.
  const long = `${title} | ${site.name}`.length > 65;
  const shareTitle = long ? title : `${title} | ${site.name}`;
  // A page's own openGraph replaces the root one, so the default image is set here too.
  const og = image ? [{ url: image, alt: title }] : [{ ...DEFAULT_IMAGE, url: "/opengraph-image.png" }];
  const tw = image ? [{ url: image, alt: title }] : [{ ...DEFAULT_IMAGE, url: "/twitter-image.png" }];
  return {
    title: long ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type, url: path, siteName: site.name, locale: "en_US", title: shareTitle, description, images: og },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: tw },
  };
}

/** Search snippets are cut at about 160 characters. */
export const snippet = (text: string, max = 160) =>
  text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
