import { AboutStory } from "@/component/home/AboutStory";
import { FeaturedHotels } from "@/component/home/FeaturedHotels";
import { Hero } from "@/component/home/Hero";
import { HighlightsStrip } from "@/component/home/HighlightsStrip";
import { PlatformFeatures } from "@/component/home/PlatformFeatures";
import { Stories } from "@/component/home/Stories";
import { SupplierSpotlight } from "@/component/home/SupplierSpotlight";
import { UrgentVacancies } from "@/component/home/UrgentVacancies";
import { WaitlistCta } from "@/component/home/WaitlistCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HighlightsStrip />

      {/* The three fixed homepage blocks from the briefing (§2.1) */}
      <SupplierSpotlight />
      <UrgentVacancies />
      <FeaturedHotels />

      <AboutStory />
      <PlatformFeatures />
      <Stories />
      <WaitlistCta />
    </>
  );
}
