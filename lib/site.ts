import type { MembershipPlan, NavItem } from "./types";

export const site = {
  name: "HotelConnect Network",
  shortName: "HotelConnect",
  // Live address. Used for absolute links in share previews (og:image, og:url).
  url: "https://hotelconnect-network-website.vercel.app",
  description:
    "The private B2B network for boutique hotels in the Netherlands and their trusted suppliers. Compliance, tenders, jobs and group purchasing — all in one place.",
  // TODO: replace with the real contact details from the client.
  email: "info@hotelconnect.nl",
  phone: "+31 (0)20 000 00 00",
  phoneHref: "tel:+31200000000",
  founders: ["Hamid", "Maaike"],
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
  { label: "Purchasing", href: "/purchasing" },
  { label: "About us", href: "/about" },
];

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
  {
    title: "For members",
    items: [
      { label: "Log in", href: "/login" },
      { label: "Corporate vouchers", href: "/suppliers/vouchers" },
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

export const legalNav: NavItem[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms and conditions", href: "/terms" },
];

// Prices and texts from the client's price page (26 Oct 2026).
export const membershipPlans: MembershipPlan[] = [
  {
    id: "hotel",
    memberType: "hotel",
    name: "Hotels",
    audience: "One account for the whole hotel. Less admin, more hospitality.",
    priceLabel: "€499",
    priceNote: "per year",
    memberNumber: "H0001",
    highlighted: true,
    features: [
      "Compliance Radar: reminders for your contracts and permits",
      "Tenders: compare up to 3 quotes",
      "Jobs: post vacancies and get applications directly",
      "Group purchasing: save on energy and other costs",
      "Corporate vouchers and direct room bookings at 0% commission",
      "Useful lists, repair contacts and a knowledge base",
    ],
    cta: "Join as a hotel",
  },
  {
    id: "supplier-contract",
    memberType: "supplier",
    name: "Suppliers with a maintenance contract",
    audience: "For suppliers who work with hotels regularly: maintenance, repairs and inspections.",
    priceLabel: "€49",
    priceNote: "per month, or €539 per year (one month free)",
    memberNumber: "L001",
    features: [
      "Your profile in the supplier directory",
      "An invitation to every tender in your category and region",
      "Rank higher with good reviews",
      "No commission on your contracts",
    ],
    cta: "Join as a supplier",
  },
  {
    id: "supplier-commission",
    memberType: "supplier",
    name: "Suppliers without a contract",
    audience: "For one-off jobs, such as painters, contractors and roofers.",
    priceLabel: "Free",
    priceNote: "commission only when you win a job",
    memberNumber: "L001",
    features: [
      "Free registration and your own dashboard",
      "Invitations to tenders in your category and region",
      "Compete for jobs with your quote",
      "No subscription or monthly fee. You don't win, you don't pay",
    ],
    cta: "Register as a supplier",
  },
];
