/** The golden "H" of the logo (from public/assets/logo/*.svg), without the lettering. */
export const BRAND_MARK_VIEWBOX = "0 21 301 361";

export const BRAND_MARK_PATHS = [
  "M47 326V89L0 123V291L47 326Z",
  "M116 177V21L66 57.5V148.132L116 177Z",
  "M116 214.302L66 176V343.181L116 382V214.302Z",
  "M66 162L235 288V234.5L66 108V162Z",
  "M235 58L185 21V182.5L235 220V58Z",
  "M185 382V226L235 262.5V353.132L185 382Z",
  "M254 326V89L301 123V291L254 326Z",
];

/** The mark as an SVG data URI in the logo's gold, for generated images (app icon). */
export function brandMarkDataUri() {
  const paths = BRAND_MARK_PATHS.map((d) => `<path d="${d}" fill="url(#g)"/>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${BRAND_MARK_VIEWBOX}"><defs><linearGradient id="g" x1="0" y1="21" x2="0" y2="382" gradientUnits="userSpaceOnUse"><stop stop-color="#F8D08F"/><stop offset="1" stop-color="#B0874B"/></linearGradient></defs>${paths}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
