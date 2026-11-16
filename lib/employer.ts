import type { Vacancy } from "./types";

/** The hotel or supplier behind a job, in one shape for cards, pages and apply links. */
export function employerOf(vacancy: Pick<Vacancy, "hotel" | "supplier">) {
  if (vacancy.supplier) {
    return { kind: "supplier" as const, label: "Company", name: vacancy.supplier.name, image: vacancy.supplier.image, href: `/suppliers/${vacancy.supplier.slug}` };
  }
  return { kind: "hotel" as const, label: "Hotel", name: vacancy.hotel?.name ?? "", image: vacancy.hotel?.image ?? "", href: vacancy.hotel ? `/hotels#${vacancy.hotel.slug}` : "/hotels" };
}
