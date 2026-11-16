import type { Metadata } from "next";
import { LegalDocuments } from "@/component/legal/LegalDocuments";
import { legalDoc } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms and conditions",
  description: "The terms and conditions for hotels and suppliers that are members of HotelConnect Network, the 0% commission network for boutique hotels.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalDocuments
      title="Terms and Conditions"
      intro="Hotels and suppliers each have their own terms. They apply to every membership of HotelConnect Network."
      docs={[legalDoc("terms-hotels"), legalDoc("terms-suppliers")]}
    />
  );
}
