import type { Vacancy } from "./types";

/** Pre-filled 1-click application links (briefing §2.2). */
export function whatsappApplyUrl(vacancy: Pick<Vacancy, "title" | "hotel" | "applyWhatsapp">) {
  const text = `Hello ${vacancy.hotel.name}, I would like to apply for the "${vacancy.title}" job I saw on HotelConnect.`;
  return `https://wa.me/${vacancy.applyWhatsapp}?text=${encodeURIComponent(text)}`;
}

export function emailApplyUrl(vacancy: Pick<Vacancy, "title" | "hotel" | "applyEmail">) {
  const subject = `Application: ${vacancy.title}`;
  const body = `Dear ${vacancy.hotel.name},\n\nI would like to apply for the "${vacancy.title}" job I saw on HotelConnect.\n\nKind regards,\n`;
  return `mailto:${vacancy.applyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
