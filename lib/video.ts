/**
 * Turns a YouTube or Vimeo link into an embed link (the dashboard only
 * accepts those two). YouTube uses the no-cookie domain. Anything else → null.
 */
export function videoEmbedUrl(link?: string): string | null {
  if (!link) return null;
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\.|^m\./, "");

  if (host === "youtu.be") return youtube(url.pathname.slice(1));
  if (host === "youtube.com") {
    if (url.pathname === "/watch") return youtube(url.searchParams.get("v"));
    const [, kind, id] = url.pathname.split("/");
    if (kind === "shorts" || kind === "embed" || kind === "live") return youtube(id);
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean).find((part) => /^\d+$/.test(part));
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }
  return null;
}

function youtube(id?: string | null) {
  return id && /^[\w-]{6,20}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}
