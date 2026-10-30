import { cacheLife, cacheTag } from "next/cache";
import { getSponsoredAction } from "@/app/actions/ads";
import { listHotelsAction } from "@/app/actions/hotel";
import { SponsoredTag, withSponsored } from "@/component/shared/sponsored";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { HotelCard } from "@/component/shared/HotelCard";
import { Icon } from "@/component/shared/Icon";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { sectionTitleClasses } from "@/component/shared/SectionHeading";
import { cn } from "@/lib/cn";

/** Homepage block 3: intro text on the left, a selection of member hotels on the right. */
export async function FeaturedHotels() {
  "use cache";
  cacheLife("minutes");
  cacheTag("hotels", "ads");
  const [featured, sponsored] = await Promise.all([listHotelsAction({ featured: true, limit: 3 }), getSponsoredAction()]);
  const hotels = withSponsored(sponsored.data?.hotels ?? [], featured.data?.items ?? [], 3);
  if (hotels.length === 0) return null;

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
          {hotels.map(({ item, sponsored }) => (
            <div key={item._id} className="relative">
              <HotelCard hotel={item} className="h-full" />
              {sponsored && <SponsoredTag className="absolute top-3 left-3 z-10" />}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
