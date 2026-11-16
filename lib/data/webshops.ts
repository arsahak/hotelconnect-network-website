/**
 * Wholesalers and webshops hotels buy from (client, 31 Oct 2026). Shown on the
 * purchasing page for now; later these get an API connection. Name and link
 * only — no logos without permission (briefing §2.6).
 */
export const webshopGroups: { category: string; shops: { name: string; url: string }[] }[] = [
  {
    category: "Food & Beverage",
    shops: [
      { name: "Hanos", url: "https://www.hanos.nl" },
      { name: "Sligro", url: "https://www.sligro.nl" },
    ],
  },
  {
    category: "Non-food, packaging & hygiene",
    shops: [
      { name: "Bunzl Foodservice", url: "https://www.bunzlfoodservice.nl" },
      { name: "Facility Trade Group", url: "https://www.facilitytradegroup.nl" },
      { name: "Total Cleaning Products", url: "https://www.totalcleaningproducts.nl" },
      { name: "JK Verpakking", url: "https://www.jkverpakking.nl" },
    ],
  },
  {
    category: "Technical installation materials",
    shops: [
      { name: "Technische Unie", url: "https://www.technischeunie.nl" },
      { name: "Solar", url: "https://www.solar.nl" },
    ],
  },
  {
    category: "Textiles & linen",
    shops: [{ name: "Smellink", url: "https://www.smellink.nl" }],
  },
  {
    category: "Commercial kitchen equipment",
    shops: [
      { name: "Hakvoort Professional", url: "https://www.hakvoortprofessional.nl" },
      { name: "Hobart", url: "https://www.hobart.nl" },
    ],
  },
];
