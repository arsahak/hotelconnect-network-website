import type { Metadata } from "next";
import { LegalPlaceholder } from "@/component/legal/LegalPlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: "How HotelConnect Network handles your data: no stored job applications or CVs, and we follow the AVG (GDPR).",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPlaceholder
      title="Privacy Policy"
      summary="Our lawyer is finalising the privacy policy. In short: we never store job applications or CVs, we only use your email address for what you signed up for, and we follow the AVG (GDPR)."
    />
  );
}
