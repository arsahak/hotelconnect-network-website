"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { listSignedInVouchersAction } from "@/app/actions/member";
import { unlockVouchersAction, type MemberVouchers as MemberVoucherData } from "@/app/actions/voucher";
import { useMember } from "@/component/member/MemberContext";
import { SignOutButton } from "@/component/member/SignOutButton";
import { Badge } from "@/component/shared/Badge";
import { buttonClasses } from "@/component/shared/button-styles";
import { EmptyState } from "@/component/shared/EmptyState";
import { Icon } from "@/component/shared/Icon";
import { JoinButton } from "@/component/shared/JoinButton";
import { Photo } from "@/component/shared/Photo";
import { cn } from "@/lib/cn";
import { memberLoginUrl } from "@/lib/site";
import type { Voucher } from "@/lib/types";

/**
 * All corporate vouchers, for suppliers only (briefing §2.5). A supplier
 * signed in on the website sees them right away; otherwise they type their
 * member number (L001…) and the API checks it before it sends the vouchers
 * with their booking links. Then: search and filter on the page.
 * Render inside <MemberSession>.
 */
export function MemberVouchers({ categories, regions }: { categories: string[]; regions: string[] }) {
  const member = useMember();
  const [memberNumber, setMemberNumber] = useState("");
  const [data, setData] = useState<MemberVoucherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");

  // Signed in on the website: load the vouchers without asking for the number.
  useEffect(() => {
    if (!member || data) return;
    startTransition(async () => {
      const res = await listSignedInVouchersAction();
      if (res.ok && res.data) setData(res.data);
      else setError(res.error || "The vouchers could not be loaded.");
    });
  }, [member, data]);

  const unlock = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await unlockVouchersAction(memberNumber);
      if (res.ok && res.data) {
        setData(res.data);
      } else {
        setError(res.error || "This member number could not be checked.");
      }
    });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data?.vouchers ?? []).filter(
      (v) =>
        (!category || v.category === category) &&
        (!region || v.region === region) &&
        (!q || `${v.title} ${v.teaser} ${v.description} ${v.hotel.name} ${v.hotel.city}`.toLowerCase().includes(q)),
    );
  }, [data, query, category, region]);

  if (!data && member && !error) {
    return <div className="mx-auto h-72 max-w-xl animate-pulse rounded-xl bg-white ring-1 ring-line" aria-busy="true" />;
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-[0_10px_40px_-18px_rgba(27,22,17,0.35)] ring-1 ring-line sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-brass-100 text-brass-600">
          <Icon name="lock" size={20} />
        </span>
        <h3 className="mt-5 font-display text-3xl text-ink-950">For supplier members</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          Enter your supplier member number to see every voucher and book it directly with the hotel.
        </p>
        <form onSubmit={unlock} className="mt-6 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="member-number" className="sr-only">
            Member number
          </label>
          <input
            id="member-number"
            value={memberNumber}
            onChange={(e) => setMemberNumber(e.target.value.toUpperCase())}
            required
            pattern="[Ll][0-9]{3,}"
            title="Your supplier member number, e.g. L001"
            placeholder="e.g. L001"
            autoComplete="off"
            className="h-12 flex-1 rounded-md border border-line bg-white px-4 text-base tracking-widest text-ink-900 uppercase outline-none placeholder:tracking-normal placeholder:normal-case placeholder:text-ink-300 focus:border-brass-500"
          />
          <button type="submit" disabled={isPending} className={buttonClasses({ size: "lg" })}>
            {isPending ? "Checking…" : "Show vouchers"}
          </button>
        </form>
        {error && (
          <p role="alert" className="mt-3 rounded-md bg-ember-100 px-4 py-3 text-sm text-ember-600">
            {error}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-2 border-t border-line pt-5 text-sm text-ink-500">
          Have a supplier login?
          <a href={memberLoginUrl("/suppliers/vouchers")} className="font-medium text-ink-900 underline underline-offset-4 hover:text-brass-600">
            Log in
          </a>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-ink-500">
          Not a member yet?
          <JoinButton variant="ghost" size="sm" className="h-auto px-0 underline underline-offset-4">
            Become a member
          </JoinButton>
        </div>
      </div>
    );
  }

  const selectClass =
    "h-11 rounded-md border border-line bg-white px-3 text-sm text-ink-900 outline-none focus:border-brass-500";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm text-ink-700">
          <Icon name="check" size={17} className="text-moss-600" />
          Signed in as <span className="font-semibold">{data.member.name}</span> ({data.member.memberNumber})
        </p>
        {member ? (
          <SignOutButton />
        ) : (
          <button
            type="button"
            onClick={() => setData(null)}
            className="text-sm text-ink-500 underline-offset-4 hover:text-brass-600 hover:underline"
          >
            Use another number
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mt-6 grid gap-3 rounded-xl bg-white p-4 ring-1 ring-line sm:grid-cols-[1fr_auto_auto]">
        <label className="relative">
          <span className="sr-only">Search vouchers</span>
          <Icon name="search" size={17} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-300" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by hotel, city or deal"
            className="h-11 w-full rounded-md border border-line pr-3 pl-10 text-sm outline-none focus:border-brass-500"
          />
        </label>
        <label>
          <span className="sr-only">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Region</span>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass}>
            <option value="">All regions</option>
            {regions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-ink-500">
        {visible.length} {visible.length === 1 ? "voucher" : "vouchers"}
      </p>

      {visible.length === 0 ? (
        <EmptyState icon="tag" title="No vouchers found" className="mt-4">
          Try another category, region or search word.
        </EmptyState>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((voucher) => (
            <VoucherCard key={voucher._id} voucher={voucher} />
          ))}
        </div>
      )}
    </div>
  );
}

function VoucherCard({ voucher }: { voucher: Voucher }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)]">
      <div className="relative aspect-[16/10]">
        <Photo src={voucher.image} alt="" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
        <span className="absolute top-3 right-3 rounded-full bg-brass-500 px-3 py-1 text-sm font-semibold text-white shadow">
          {voucher.discountPercent}% off
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5">
          <Badge tone="brass">{voucher.category}</Badge>
          <Badge tone="outline">{voucher.region}</Badge>
        </div>
        <h3 className="mt-3 font-display text-xl leading-snug text-ink-950">{voucher.title}</h3>
        <p className="mt-1 text-xs text-ink-500">
          {voucher.hotel.name} · {voucher.hotel.city}
        </p>
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-700">{voucher.description || voucher.teaser}</p>
        <a
          href={voucher.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonClasses({ size: "sm" }), "mt-auto w-fit")}
          style={{ marginTop: "1.25rem" }}
        >
          Book now
          <Icon name="arrow-up-right" size={15} />
          <span className="sr-only">(opens the hotel&apos;s booking page in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
