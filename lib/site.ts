import type { MembershipPlan, NavItem } from "./types";

export const site = {
  name: "HotelConnect Network",
  shortName: "HotelConnect",
  // Live address. Used for absolute links in share previews (og:image, og:url).
  url: "https://hotelconnect-network-website.vercel.app",
  description:
    "The private B2B network for boutique hotels and their suppliers. Compliance, tenders, jobs and group purchasing in one place.",
  // TODO: replace with the real contact details from the client.
  email: "info@hotelconnect.nl",
  phone: "+31 (0)20 000 00 00",
  phoneHref: "tel:+31200000000",
  founders: ["Hamid", "Maaike"],
  copyrightYear: 2026,
  testPhase: true,
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "Jobs", href: "/jobs" },
  { label: "Suppliers", href: "/suppliers" },
  { label: "Purchasing", href: "/purchasing" },
  { label: "Forum", href: "/forum" },
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
      { label: "Forum", href: "/forum" },
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

// TODO: prices are not in the briefing yet — fill in once the client confirms.
export const membershipPlans: MembershipPlan[] = [
  {
    id: "hotel",
    name: "Hotel",
    priceLabel: "Coming soon",
    priceNote: "Paid membership, monthly or yearly",
    memberNumber: "H0001",
    highlighted: true,
    features: [
      "Compliance Radar with automatic reminders",
      "Send tenders to verified suppliers",
      "Post jobs on the public jobs page",
      "Listing in the hotel guide with your own booking link",
      "Group purchasing and the private forum",
    ],
  },
  {
    id: "supplier",
    name: "Supplier",
    priceLabel: "Free",
    priceNote: "During phase 1",
    memberNumber: "L001",
    features: [
      "Tenders in your category and region",
      "Profile in the supplier directory",
      "Corporate vouchers from member hotels",
      "Access to the private forum",
    ],
  },
];
