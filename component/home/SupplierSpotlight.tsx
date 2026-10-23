import Image from "next/image";
import type { Supplier } from "@/lib/types";
import { spotlightSuppliers } from "@/lib/data/home";
import { Badge } from "@/component/shared/Badge";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Carousel } from "@/component/shared/Carousel";
import { Icon } from "@/component/shared/Icon";
import { Monogram } from "@/component/shared/Monogram";
import { TextLink } from "@/component/shared/TextLink";
import { Eyebrow } from "@/component/shared/Eyebrow";

/** Homepage block 1: slideshow with three suppliers, as a photo / text split. */
export function SupplierSpotlight() {
  return (
    <section aria-labelledby="suppliers-title" className="bg-cream">
      <h2 id="suppliers-title" className="sr-only">
        Featured suppliers
      </h2>
      <Carousel
        label="Featured suppliers"
        interval={7000}
        controlsClassName="px-4 pb-12 sm:px-12 lg:absolute lg:right-0 lg:bottom-14 lg:left-1/2 lg:px-16 lg:pb-0 xl:px-24"
      >
        {spotlightSuppliers.map((supplier) => (
          <SupplierSlide key={supplier.id} supplier={supplier} />
        ))}
      </Carousel>
    </section>
  );
}

function SupplierSlide({ supplier }: { supplier: Supplier }) {
  return (
    <article className="grid lg:grid-cols-2">
      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[36rem]">
        <Image
          src={supplier.image}
          alt=""
          fill
          draggable={false}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center px-4 pt-12 pb-8 sm:px-12 lg:px-16 lg:pb-32 xl:px-24">
        <div className="flex items-center justify-between gap-4">
          <Eyebrow>Featured supplier</Eyebrow>
          <TextLink href="/suppliers">All suppliers</TextLink>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Monogram name={supplier.name} />
          <h3 className="heading-strong font-display text-3xl leading-tight text-ink-950 sm:text-4xl">{supplier.name}</h3>
        </div>

        <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-500">{supplier.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {supplier.categories.map((category) => (
            <li key={category}>
              <Badge tone="brass">{category}</Badge>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-center gap-1.5 text-[0.8125rem] text-ink-500">
          <Icon name="map-pin" size={15} className="text-brass-500" />
          {supplier.regions.join(" · ")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`/suppliers/${supplier.slug}`}>
            View profile
            <Icon name="arrow-right" size={16} />
          </ButtonLink>
          <ButtonLink href={supplier.website} external variant="outline">
            Website
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
