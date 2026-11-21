import type { Metadata } from "next";
import { LegalDocuments } from "@/component/legal/LegalDocuments";
import { legalDoc } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms and conditions",
  description: "The cloud services agreements and terms and conditions for hotels and suppliers on HotelConnect Network, the 0% commission network for boutique hotels.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalDocuments
      title="Terms and Conditions"
      intro="Hotels and suppliers accept these documents when they register: by ticking the box on the sign-up form they sign them digitally."
      docs={[legalDoc("hotel-agreement"), legalDoc("hotel-terms"), legalDoc("supplier-agreement")]}
    />
  );
}
