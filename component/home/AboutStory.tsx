import Image from "next/image";
import { homeImages } from "@/lib/data/home";
import { site } from "@/lib/site";
import { AboutButton } from "@/component/shared/AboutButton";
import { Icon } from "@/component/shared/Icon";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { sectionTitleClasses } from "@/component/shared/SectionHeading";
import { cn } from "@/lib/cn";

/** Photo / text split about who is behind the platform. "About us" opens the popup. */
export function AboutStory() {
  return (
    <section aria-labelledby="about-title" className="grid bg-sand lg:grid-cols-2">
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
            {site.founders.join(" and ")} know the hotel world from the inside. They are building
            the platform they always wished they had: one place for everything that keeps a
            boutique hotel running, so there is more time for guests.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <AboutButton variant="primary">
              About us
              <Icon name="arrow-right" size={16} />
            </AboutButton>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden="true">
                {site.founders.map((name) => (
                  <span
                    key={name}
                    className="grid size-10 place-items-center rounded-full border-2 border-sand bg-brass-100 font-display text-lg text-brass-600"
                  >
                    {name[0]}
                  </span>
                ))}
              </div>
              <p className="text-sm text-ink-700">{site.founders.join(" & ")}, founders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
