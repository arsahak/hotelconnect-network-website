import { featuredHotels } from "@/lib/data/home";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { HotelCard } from "@/component/shared/HotelCard";
import { Icon } from "@/component/shared/Icon";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { sectionTitleClasses } from "@/component/shared/SectionHeading";
import { cn } from "@/lib/cn";

/** Homepage block 3: intro text on the left, a selection of member hotels on the right. */
export function FeaturedHotels() {
  return (
    <section aria-labelledby="hotels-title" className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="reveal lg:col-span-4">
          <Eyebrow>Hotel guide</Eyebrow>
          <h2 id="hotels-title" className={cn("mt-4 text-ink-950", sectionTitleClasses)}>
            Stay at a Boutique Hotel
          </h2>
          <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-500">
            Hand-picked boutique hotels from our network. Book directly with the hotel: no
            middleman and no extra fees.
          </p>
          <ButtonLink href="/hotels" variant="outline" className="mt-8">
            View all hotels
            <Icon name="arrow-right" size={16} />
          </ButtonLink>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 lg:col-span-8">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </Container>
    </section>
  );
}
