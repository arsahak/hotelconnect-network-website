import Image from "next/image";
import type { Hotel } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";
import { Icon } from "./Icon";

/**
 * Hotel card for the homepage and the hotel guide: photo, name, short text.
 * "Book now" goes to the hotel's own booking page.
 */
export function HotelCard({
  hotel,
  className,
  sizes = "(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw",
}: {
  hotel: Hotel;
  className?: string;
  sizes?: string;
}) {
  return (
    <article
      className={cn(
        "reveal group flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(36,30,24,0.35)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={hotel.image}
          alt={`Room at ${hotel.name}`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {hotel.offer && (
          <Badge tone="glass" className="absolute top-3 left-3">
            <Icon name="tag" size={13} />
            {hotel.offer}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs text-ink-500">
          <Icon name="map-pin" size={14} />
          {hotel.city}
        </p>
        <h3 className="mt-2 font-display text-xl text-ink-950">{hotel.name}</h3>
        <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-500">
          {hotel.description}
        </p>
        <a
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-[0.8125rem] font-medium text-brass-600 transition-colors hover:text-brass-700"
        >
          Book now
          <Icon name="arrow-up-right" size={14} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
