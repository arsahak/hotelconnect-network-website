export type NavItem = {
  label: string;
  href: string;
};

export type Supplier = {
  id: string; // L001, L002, ...
  slug: string;
  name: string;
  tagline: string;
  categories: string[];
  regions: string[];
  website: string;
  image: string;
};

export type Vacancy = {
  id: string;
  slug: string;
  title: string;
  hotelName: string;
  city: string;
  category: string;
  employmentType: string;
  postedLabel: string;
  urgent: boolean;
  whatsapp: string; // international format without "+", e.g. 31612345678
  email: string;
};

export type Hotel = {
  id: string; // H0001, H0002, ...
  slug: string;
  name: string;
  city: string;
  address: string;
  description: string;
  image: string;
  bookingUrl: string;
  offer?: string;
};

export type Story = {
  slug: string;
  kind: "Interview" | "Article" | "Column";
  title: string;
  excerpt: string;
  image: string;
  readingTime: string;
};

export type MembershipPlan = {
  id: "hotel" | "supplier";
  name: string;
  priceLabel: string;
  priceNote: string;
  memberNumber: string;
  features: string[];
  highlighted?: boolean;
};
