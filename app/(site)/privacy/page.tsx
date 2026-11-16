import type { Metadata } from "next";
import { LegalDocuments } from "@/component/legal/LegalDocuments";
import { legalDoc } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: "How HotelConnect Network handles your data and cookies: our privacy, cookie and disclaimer statements (AVG / GDPR).",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalDocuments
      title="Privacy Policy"
      intro="We follow the AVG (GDPR). We only use essential cookies, never store job applications or CVs, and only use your email address for what you signed up for. The full statements:"
      docs={[legalDoc("privacy-cookies"), legalDoc("privacy-disclaimer")]}
    />
  );
}
