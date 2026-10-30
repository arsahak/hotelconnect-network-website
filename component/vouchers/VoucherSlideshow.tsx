import { cacheLife, cacheTag } from "next/cache";
import { listFeaturedVouchersAction } from "@/app/actions/voucher";
import { Badge } from "@/component/shared/Badge";
import { Carousel } from "@/component/shared/Carousel";
import { Icon } from "@/component/shared/Icon";
import { Photo } from "@/component/shared/Photo";
import type { VoucherTeaser } from "@/lib/types";
import { VoucherBookingActions } from "./VoucherBookingActions";

/**
 * Corporate-voucher slideshow (briefing §2.4): 5–10 deals from member hotels.
 * "Book now" only for a signed-in supplier; everyone else is invited to join.
 * The slides are cached; the buttons read the signed-in supplier on the client,
 * so render this inside <MemberSession>.
 */
export async function VoucherSlideshow() {
  "use cache";
  cacheLife("minutes");
  cacheTag("vouchers");

  const vouchers = (await listFeaturedVouchersAction()).data ?? [];
  if (vouchers.length === 0) return null;

  return (
    <Carousel label="Corporate vouchers" interval={7000} controlsClassName="mt-6">
      {vouchers.map((voucher) => (
        <VoucherSlide key={voucher._id} voucher={voucher} />
      ))}
    </Carousel>
  );
}

function VoucherSlide({ voucher }: { voucher: VoucherTeaser }) {
  return (
    <article className="grid overflow-hidden rounded-xl bg-white shadow-[0_10px_40px_-18px_rgba(27,22,17,0.35)] md:grid-cols-2">
      <div className="relative aspect-[16/10] md:aspect-auto md:min-h-80">
        <Photo src={voucher.image} alt="" sizes="(min-width: 768px) 40vw, 100vw" />
        <span className="absolute top-4 left-4 grid size-20 place-items-center rounded-full bg-brass-500 text-center font-display text-2xl leading-none text-white shadow-lg">
          <span>
            {voucher.discountPercent}%
            <span className="mt-1 block font-sans text-[0.625rem] tracking-[0.2em] uppercase">off</span>
          </span>
        </span>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brass">{voucher.category}</Badge>
          {voucher.promoted && <Badge tone="outline">Featured</Badge>}
        </div>
        <h3 className="mt-4 font-display text-3xl leading-tight text-ink-950">{voucher.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-500">
          <Icon name="building" size={15} className="text-brass-500" />
          {voucher.hotel.name} · {voucher.hotel.city}
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">{voucher.teaser}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <VoucherBookingActions voucherId={voucher._id} />
        </div>
      </div>
    </article>
  );
}
