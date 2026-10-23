/**
 * The lotus mark as an SVG data URI, for generated images (app icon, social
 * share image). Placeholder until the designer delivers the real logo.
 */
export function lotusDataUri(color: string, strokeWidth = 2.2) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 32" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linejoin="round"><path d="M20 3c5 6 5 14 0 21-5-7-5-15 0-21Z"/><path d="M20 24c-7-1-12-7-12-14 6 1 10 5 12 14Z"/><path d="M20 24c7-1 12-7 12-14-6 1-10 5-12 14Z"/><path d="M20 26c-8 0-15-4-18-10 7 0 13 3 18 10Z"/><path d="M20 26c8 0 15-4 18-10-7 0-13 3-18 10Z"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
