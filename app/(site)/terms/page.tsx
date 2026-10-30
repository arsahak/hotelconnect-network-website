import type { Metadata } from "next";
import { LegalPlaceholder } from "@/component/legal/LegalPlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms and conditions",
  description: "The terms and conditions for hotels and suppliers that are members of HotelConnect Network, the private network for boutique hotels.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPlaceholder
      title="Terms and Conditions"
      summary="Our lawyer is finalising the terms and conditions for members of HotelConnect. They will be published here before sign-ups open."
    />
  );
}
