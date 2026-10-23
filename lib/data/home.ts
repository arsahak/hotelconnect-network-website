/**
 * Demo content for the homepage.
 * Later this comes from the backend (hotels/suppliers manage their own data
 * in their dashboard). Keep the shapes in lib/types.ts in sync.
 */
import type { Hotel, Story, Supplier, Vacancy } from "@/lib/types";

const photo = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Mood photos used by the homepage sections. */
export const heroSlides = [
  { src: photo("1618773928121-c32242e63f39", 2400), alt: "A warm, softly lit boutique hotel room" },
  { src: photo("1582719478250-c89cae4dc85b", 2400), alt: "A sunlit hotel bedroom with tall windows" },
  { src: photo("1578683010236-d716f9a3f461", 2400), alt: "A modern hotel suite with a view" },
];

export const homeImages = {
  about: photo("1564078516393-cf04bd966897", 1600),
  waitlist: photo("1543007630-9710e4a00a20", 2400),
};

export const spotlightSuppliers: Supplier[] = [
  {
    id: "L001",
    slug: "linnen-en-co",
    name: "Linnen & Co",
    tagline:
      "Hotel linen to rent or buy, freshly washed every week and always delivered on time, even in high season.",
    categories: ["Linen & textiles", "Laundry"],
    regions: ["North Holland", "Utrecht"],
    website: "https://example.com",
    image: photo("1505693416388-ac5ce068fe85", 1200),
  },
  {
    id: "L002",
    slug: "technisch-beheer-west",
    name: "Technisch Beheer West",
    tagline:
      "Maintenance and a 24/7 repair service for installations, lifts and fire alarm systems. NEN 3140 certified.",
    categories: ["Technical maintenance", "Fire safety"],
    regions: ["South Holland", "North Holland"],
    website: "https://example.com",
    image: photo("1584622650111-993a426fbf0a", 1200),
  },
  {
    id: "L003",
    slug: "smaakmakers-food-supply",
    name: "Smaakmakers Food Supply",
    tagline:
      "Fresh produce from local farmers for breakfast and the restaurant, delivered daily and HACCP-compliant.",
    categories: ["F&B", "Wholesale"],
    regions: ["All of the Netherlands"],
    website: "https://example.com",
    image: photo("1551218808-94e220e084d2", 1200),
  },
];

export const urgentVacancies: Vacancy[] = [
  {
    id: "V-101",
    slug: "independent-cook",
    title: "Independent cook",
    hotelName: "Hotel De Gracht",
    city: "Amsterdam",
    category: "Kitchen",
    employmentType: "Full-time",
    postedLabel: "2 days ago",
    urgent: true,
    whatsapp: "31600000000",
    email: "jobs@example.com",
  },
  {
    id: "V-102",
    slug: "receptionist-evening-shift",
    title: "Receptionist, evening shift",
    hotelName: "Het Pakhuis Hotel",
    city: "Utrecht",
    category: "Front Office",
    employmentType: "Part-time · 24 hours",
    postedLabel: "Today",
    urgent: true,
    whatsapp: "31600000000",
    email: "jobs@example.com",
  },
  {
    id: "V-103",
    slug: "all-round-maintenance-technician",
    title: "All-round maintenance technician",
    hotelName: "Boetiekhotel Maasoever",
    city: "Maastricht",
    category: "Technical",
    employmentType: "Full-time",
    postedLabel: "4 days ago",
    urgent: true,
    whatsapp: "31600000000",
    email: "jobs@example.com",
  },
];

export const featuredHotels: Hotel[] = [
  {
    id: "H0001",
    slug: "hotel-de-gracht",
    name: "Hotel De Gracht",
    city: "Amsterdam",
    address: "Herengracht 120, Amsterdam",
    description:
      "Eighteen rooms in a 17th-century canal house, with breakfast from local bakers and views over the water.",
    image: photo("1611892440504-42a792e24d32"),
    bookingUrl: "https://example.com",
    offer: "15% off midweek",
  },
  {
    id: "H0002",
    slug: "het-pakhuis-hotel",
    name: "Het Pakhuis Hotel",
    city: "Utrecht",
    address: "Oudegracht 45, Utrecht",
    description:
      "A former warehouse on the wharf, now a characterful boutique hotel with its own bar and restaurant.",
    image: photo("1631049307264-da0ec9d70304", 1200),
    bookingUrl: "https://example.com",
  },
  {
    id: "H0003",
    slug: "boetiekhotel-maasoever",
    name: "Boetiekhotel Maasoever",
    city: "Maastricht",
    address: "Maasboulevard 8, Maastricht",
    description:
      "Peace and quiet, rich Burgundian cuisine and rooms overlooking the Maas, a short walk from the Vrijthof.",
    image: photo("1590490360182-c33d57733427", 1200),
    bookingUrl: "https://example.com",
    offer: "Free late check-out",
  },
];

export const stories: Story[] = [
  {
    slug: "interview-staying-compliant-as-a-small-hotel",
    kind: "Interview",
    title: "How to keep a small hotel compliant without a full-time office manager",
    excerpt:
      "A hotel manager from Haarlem on permits, contracts and the reminder that saved her from a fine.",
    image: photo("1625244724120-1fd1d34d00f6", 1200),
    readingTime: "6 min",
  },
  {
    slug: "group-energy-purchasing-2027",
    kind: "Article",
    title: "Buying energy together: why ten hotels are stronger than one",
    excerpt: "What group purchasing delivers, how it works and why the deadline matters.",
    image: photo("1559329007-40df8a9345d8", 1200),
    readingTime: "4 min",
  },
  {
    slug: "column-finding-staff-in-2026",
    kind: "Column",
    title: "Finding staff in 2026: stop using long application forms",
    excerpt:
      "Applicants drop out after three fields. A case for 1-click applications via WhatsApp.",
    image: photo("1517248135467-4c7edcad34c4", 1200),
    readingTime: "3 min",
  },
];
