import type { Vacancy } from "./types";

/** Pre-filled 1-click application links (briefing §2.2). */
export function whatsappApplyUrl(vacancy: Vacancy) {
  const text = `Hello ${vacancy.hotelName}, I would like to apply for the "${vacancy.title}" job I saw on HotelConnect.`;
  return `https://wa.me/${vacancy.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function emailApplyUrl(vacancy: Vacancy) {
  const subject = `Application: ${vacancy.title}`;
  const body = `Dear ${vacancy.hotelName},\n\nI would like to apply for the "${vacancy.title}" job I saw on HotelConnect.\n\nKind regards,\n`;
  return `mailto:${vacancy.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
