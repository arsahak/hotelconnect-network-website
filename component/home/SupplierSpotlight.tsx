import { cacheLife, cacheTag } from "next/cache";
import { getSponsoredAction } from "@/app/actions/ads";
import { listSuppliersAction } from "@/app/actions/supplier";
import { withSponsored } from "@/component/shared/sponsored";
import type { Supplier } from "@/lib/types";
import { Badge } from "@/component/shared/Badge";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Carousel } from "@/component/shared/Carousel";
import { Icon } from "@/component/shared/Icon";
import { Photo } from "@/component/shared/Photo";
import { SupplierLogo } from "@/component/suppliers/SupplierLogo";
import { TextLink } from "@/component/shared/TextLink";
import { Eyebrow } from "@/component/shared/Eyebrow";

/** Homepage block 1: slideshow with three suppliers, as a photo / text split. */
export async function SupplierSpotlight() {
  "use cache";
  cacheLife("minutes");
  cacheTag("suppliers", "ads");
  const [featured, sponsored] = await Promise.all([listSuppliersAction({ featured: true, limit: 3 }), getSponsoredAction()]);
  const suppliers = withSponsored(sponsored.data?.suppliers ?? [], featured.data?.items ?? [], 3);
  if (suppliers.length === 0) return null;

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
        {suppliers.map(({ item, sponsored }) => (
          <SupplierSlide key={item._id} supplier={item} sponsored={sponsored} />
        ))}
      </Carousel>
    </section>
  );
}

function SupplierSlide({ supplier, sponsored }: { supplier: Supplier; sponsored: boolean }) {
  return (
    <article className="grid lg:grid-cols-2">
      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[36rem]">
        <Photo src={supplier.image} alt="" sizes="(min-width: 1024px) 50vw, 100vw" className="pointer-events-none select-none" />
      </div>

      <div className="flex flex-col justify-center px-4 pt-12 pb-8 sm:px-12 lg:px-16 lg:pb-32 xl:px-24">
        <div className="flex items-center justify-between gap-4">
          <Eyebrow>{sponsored ? "Sponsored" : "Featured supplier"}</Eyebrow>
          <TextLink href="/suppliers">All suppliers</TextLink>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <SupplierLogo name={supplier.name} logo={supplier.logo} />
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
          {supplier.website && (
            <ButtonLink href={supplier.website} external variant="outline">
              Website
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
}
