// Shapes of the website's own config, and of the data the API returns.
// Keep the API shapes in sync with backend/models/*.

export type NavItem = {
  label: string;
  href: string;
};

/** A supplier signed in on the website (briefing §2.4). */
export type Member = { memberNumber: string; name: string };

export type MembershipPlan = {
  id: "hotel" | "supplier-contract" | "supplier-project";
  /** Which kind of member signs up with this plan (also the waitlist type). */
  memberType: "hotel" | "supplier";
  name: string;
  /** Who the plan is for, one short line. */
  audience: string;
  priceLabel: string;
  priceNote: string;
  memberNumber: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

/** A paged list from the API. */
export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
};

export type Hotel = {
  _id: string;
  memberNumber: string;
  name: string;
  slug: string;
  city: string;
  region: string;
  address: string;
  description: string;
  image: string;
  bookingUrl: string;
  offer?: string;
  featured: boolean;
};

export type Supplier = {
  _id: string;
  memberNumber: string;
  name: string;
  slug: string;
  logo: string;
  image: string;
  tagline: string;
  description: string;
  categories: string[];
  regions: string[];
  website: string;
  featured: boolean;
};

export type Vacancy = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  employmentType: string;
  /** Hours per week, free text. */
  hours?: string;
  city: string;
  region: string;
  urgent: boolean;
  applyEmail: string;
  applyWhatsapp?: string;
  /** Briefing §3.7: visual (photo/video, WhatsApp first) or traditional (text and form). */
  style?: "traditional" | "visual";
  image?: string;
  videoUrl?: string;
  publishedAt?: string;
  /** Who offers the job (client, 31 Oct): a member hotel or a supplier with a maintenance contract. */
  employer?: "hotel" | "supplier";
  /** Supplier jobs: the main group of the category. */
  categoryGroup?: string;
  hotel: { name: string; slug: string; city: string; image: string } | null;
  supplier?: { name: string; slug: string; logo: string; image: string } | null;
};

export type VoucherTeaser = {
  _id: string;
  title: string;
  teaser: string;
  image: string;
  discountPercent: number;
  category: string;
  region: string;
  promoted?: boolean;
  hotel: { name: string; city: string };
};

export type Voucher = VoucherTeaser & {
  description: string;
  bookingUrl: string;
};

export type Article = {
  _id: string;
  title: string;
  slug: string;
  kind: "Article" | "Interview" | "Column";
  excerpt: string;
  image: string;
  readingMinutes: number;
  publishedAt: string;
  /** HTML, only on the detail page. */
  body?: string;
};

/** Fixed lists for filters (GET /meta/options). */
export type Options = {
  regions: string[];
  /** Country_Tag choices (ISO code + English name). */
  countries: { code: string; name: string }[];
  supplierRegions: string[];
  vacancyCategories: string[];
  /** Supplier jobs: main group → subcategories. */
  supplierVacancyGroups: Record<string, string[]>;
  employmentTypes: string[];
  supplierCategories: string[];
  voucherCategories: string[];
  articleKinds: string[];
};

/** An open tender on the public Tenders page. Hotel and email only for a signed-in supplier. */
export type PublicTender = {
  _id: string;
  type: string;
  title: string;
  category: string;
  country: string;
  region: string;
  description: string;
  deadline: string;
  size: "need" | "tender";
  createdAt: string;
  hotel: { name: string; city: string } | null;
  contactEmail: string | null;
};
