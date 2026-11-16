import { employerOf } from "./employer";
import type { Vacancy } from "./types";

/** Pre-filled 1-click application links (briefing §2.2). */
export function whatsappApplyUrl(vacancy: Pick<Vacancy, "title" | "hotel" | "supplier" | "applyWhatsapp">) {
  const text = `Hello ${employerOf(vacancy).name}, I would like to apply for the "${vacancy.title}" job I saw on HotelConnect.`;
  return `https://wa.me/${vacancy.applyWhatsapp}?text=${encodeURIComponent(text)}`;
}

export function emailApplyUrl(vacancy: Pick<Vacancy, "title" | "hotel" | "supplier" | "applyEmail">) {
  const subject = `Application: ${vacancy.title}`;
  const body = `Dear ${employerOf(vacancy).name},\n\nI would like to apply for the "${vacancy.title}" job I saw on HotelConnect.\n\nKind regards,\n`;
  return `mailto:${vacancy.applyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
