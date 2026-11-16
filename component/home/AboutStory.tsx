import Image from "next/image";
import { homeImages } from "@/lib/data/images";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { sectionTitleClasses } from "@/component/shared/SectionHeading";
import { cn } from "@/lib/cn";

/** Photo / text split: the single "Our story" section (Master Briefing v4, corporate voice). */
export function AboutStory() {
  return (
    <section id="our-story" aria-labelledby="about-title" className="grid scroll-mt-24 bg-sand lg:grid-cols-2">
      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[30rem]">
        <Image
          src={homeImages.about}
          alt="A boutique hotel lounge at dusk"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex items-center px-4 py-16 sm:px-12 lg:px-16 xl:px-24">
        <div className="reveal max-w-lg">
          <Eyebrow>Our story</Eyebrow>
          <h2 id="about-title" className={cn("mt-4 text-ink-950", sectionTitleClasses)}>
            Built by Hoteliers, for Hoteliers
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-500">
            We know the hospitality industry from the inside out. Having managed daily operations on the hotel floor
            ourselves, we saw firsthand how much time gets lost to scattered paperwork, compliance stress, and high
            commission platforms.
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-500">
            That is why we built HotelConnect Network: one clear, practical workspace designed to protect boutique hotels
            from inspection fines, simplify communication across all departments, and connect independent properties
            with trusted local suppliers — with zero commission.
          </p>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brass-700 ring-1 ring-brass-500/30">
            <span className="size-1.5 rounded-full bg-brass-500" aria-hidden="true" />
            0% Commission Boutique Network
          </p>
        </div>
      </div>
    </section>
  );
}
