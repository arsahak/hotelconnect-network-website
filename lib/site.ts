import type { MembershipPlan, NavItem } from "./types";

export const site = {
  name: "HotelConnect Network",
  shortName: "HotelConnect",
  // Live address. Used for absolute links in share previews (og:image, og:url).
  url: "https://hotelconnect-network-website.vercel.app",
  description:
    "The digital cockpit for independent boutique hotels: daily operations for every department, 100% inspection-proof compliance, and a 0% commission network of trusted suppliers.",
  email: "info@hotelconnectnetwork.com",
  copyrightYear: 2026,
  // Where members sign in (the dashboard app). /login on this site sends them there.
  dashboardUrl: (process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001").replace(/\/+$/, ""),
};

/**
 * Supplier sign-in for booking vouchers: the dashboard signs them in and sends
 * them back to `next` on this site (dashboard route /api/website-login).
 */
export function memberLoginUrl(next: string) {
  return `${site.dashboardUrl}/api/website-login?next=${encodeURIComponent(next)}`;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "Jobs", href: "/jobs" },
  { label: "Suppliers", href: "/suppliers" },
];

/** The menu, with "Tenders" between Hotels and Jobs while a tender is open (v4). */
export function navItems(showTenders: boolean): NavItem[] {
  if (!showTenders) return mainNav;
  return [...mainNav.slice(0, 2), { label: "Tenders", href: "/tenders" }, ...mainNav.slice(2)];
}

/** Regions used by the search bar filters (demo list). */
export const regions = [
  "North Holland",
  "South Holland",
  "Utrecht",
  "North Brabant",
  "Gelderland",
  "Limburg",
  "Overijssel",
  "Friesland",
  "Groningen",
  "Drenthe",
  "Flevoland",
  "Zeeland",
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Platform",
    items: [
      { label: "Hotel guide", href: "/hotels" },
      { label: "Jobs", href: "/jobs" },
      { label: "Suppliers", href: "/suppliers" },
      { label: "Purchasing & webshops", href: "/purchasing" },
    ],
  },
];

// TODO: replace with the client's real social media pages.
export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/", icon: "tiktok" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
] as const;

/** Version of the legal documents (client, 21 Nov 2026); stored with every acceptance at registration. */
export const LEGAL_VERSION = "v1.0 – November 2026";

export type LegalLang = "en" | "nl" | "fr";
export type LegalKey = "hotel-agreement" | "hotel-terms" | "supplier-agreement" | "privacy-cookies" | "privacy-disclaimer";
export type LegalDoc = NavItem & {
  key: LegalKey;
  /** Original title of the document. */
  title: string;
  /** The PDF per language (public/legal). href is the English one, or Dutch when there is no English. */
  files: Partial<Record<LegalLang, string>>;
};

const pdf = (name: string, langs: LegalLang[]) => Object.fromEntries(langs.map((l) => [l, `/legal/${name}-${l}.pdf`])) as Partial<Record<LegalLang, string>>;
const doc = (key: LegalKey, label: string, title: string, files: Partial<Record<LegalLang, string>>): LegalDoc => ({ key, label, title, files, href: files.en ?? files.nl! });

/** The official legal documents (client, 21 Nov 2026). */
export const legalDocs: LegalDoc[] = [
  doc("hotel-agreement", "Cloud Services Agreement (Hotels)", "Overeenkomst tot levering van clouddiensten – Hotels", pdf("hotel-agreement", ["en", "nl", "fr"])),
  doc("hotel-terms", "Terms & Conditions (Hotels)", "SaaS Algemene Voorwaarden – Hotels", pdf("hotel-terms", ["en", "nl", "fr"])),
  doc("supplier-agreement", "Cloud Services & Membership Agreement (Suppliers)", "Overeenkomst tot levering van clouddiensten – Leveranciers", pdf("supplier-agreement", ["en", "nl", "fr"])),
  doc("privacy-cookies", "Cookie & Privacy Statement", "Cookie- en Privacyverklaring", pdf("cookie-privacy", ["nl"])),
  doc("privacy-disclaimer", "Privacy & Disclaimer", "Privacy- en Disclaimerverklaring", pdf("privacy-disclaimer", ["nl"])),
];
export const legalDoc = (key: LegalKey) => legalDocs.find((d) => d.key === key)!;

/** Footer: only the cookie and privacy documents (client, 21 Nov 2026). */
export const legalNav: LegalDoc[] = [legalDoc("privacy-cookies"), legalDoc("privacy-disclaimer")];

/** What a new member accepts (clickwrap) when registering. */
export const signupDocs: Record<"hotel" | "supplier", LegalKey[]> = {
  hotel: ["hotel-agreement", "hotel-terms"],
  supplier: ["supplier-agreement"],
};

// Prices: Master Briefing v4 and the agreements (13 Nov 2026). Excl. VAT, 0% commission.
/** Hotels pay by number of rooms, once a year. */
export const hotelTiers = [
  { name: "Small Boutique", rooms: "Up to 15 rooms", price: "€350" },
  { name: "Medium Boutique", rooms: "16 to 40 rooms", price: "€490" },
  { name: "Large Boutique", rooms: "40+ rooms", price: "€750" },
];

/** Suppliers: free until this date, then one of the two supplier plans. */
export const supplierFreeUntil = "1 May 2028";

export const membershipPlans: MembershipPlan[] = [
  {
    id: "hotel",
    memberType: "hotel",
    name: "Hotels",
    audience: "One account for the whole hotel: compliance, the floor teams, purchasing and tenders.",
    priceLabel: "From €350",
    priceNote: "per year, by number of rooms · Founding Hotels: the first 12 months free",
    memberNumber: "H0001",
    highlighted: true,
    features: [
      "Compliance Radar & Audit Shield: never miss a contract or permit deadline",
      "Floor control for Housekeeping, Maintenance, Front Office and F&B",
      "Procurement & contracts: order from your partners in one tap",
      "Tenders: post anonymously and get quotes from verified suppliers",
      "Jobs: post vacancies and get applications directly",
      "Your hotel in the guide with direct booking at 0% commission",
    ],
    cta: "Join as a hotel",
  },
  {
    id: "supplier-project",
    memberType: "supplier",
    name: "Project & Capex Partner",
    audience: "For one-off projects and investments: contractors, painters, roofers, interior work.",
    priceLabel: "€0",
    priceNote: `until ${supplierFreeUntil} · then €19 per month (€209 per year)`,
    memberNumber: "L001",
    features: [
      "Your profile in the supplier directory",
      "Tenders for one-off projects in your trade and country",
      "Contact hotels directly: 0% commission on won work",
      "Free until 1 May 2028",
    ],
    cta: "Join as a project partner",
  },
  {
    id: "supplier-contract",
    memberType: "supplier",
    name: "Maintenance Partner",
    audience: "For suppliers with recurring work: maintenance, inspections and service contracts.",
    priceLabel: "€0",
    priceNote: `until ${supplierFreeUntil} · then €59 per month (€649 per year)`,
    memberNumber: "L001",
    features: [
      "Everything in Project & Capex Partner",
      "Maintenance tenders and recurring service work",
      "Post vacancies on the jobs page",
      "My Partner Hotels: the hotels you work for in one list",
      "Invite your hotels in one click",
    ],
    cta: "Join as a maintenance partner",
  },
];
