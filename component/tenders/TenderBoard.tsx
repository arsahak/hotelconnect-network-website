import { getPublicTendersAction } from "@/app/actions/tender";
import { LoginNotice } from "@/component/member/LoginNotice";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { getCachedOptions } from "@/component/shared/cached-options";
import { EmptyState } from "@/component/shared/EmptyState";
import { Icon } from "@/component/shared/Icon";
import { Pager } from "@/component/shared/Pager";
import { memberLoginUrl } from "@/lib/site";
import { TenderCard } from "./TenderCard";

const field = "h-12 rounded-md border border-line bg-white px-4 text-[0.9375rem] text-ink-900 outline-none transition-colors focus:border-brass-500";

/** The list with its filters. Reads the supplier cookie, so it renders per request. */
export async function TenderBoard({ searchParams }: { searchParams: PageProps<"/tenders">["searchParams"] }) {
  const params = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const q = one(params.q);
  const category = one(params.category);
  const page = Math.max(1, Number(one(params.page)) || 1);

  const [res, options] = await Promise.all([getPublicTendersAction({ q, category, page }), getCachedOptions()]);
  const countries = new Map((options.data?.countries ?? []).map((c) => [c.code, c.name]));
  const data = res.data;

  return (
    <>
      <form action="/tenders" className="-mt-8 relative z-10 grid gap-3 rounded-xl bg-white p-4 shadow-[0_10px_40px_-18px_rgba(27,22,17,0.35)] ring-1 ring-line sm:grid-cols-[1fr_auto_auto] sm:p-5">
        <label className="sr-only" htmlFor="t-q">Search tenders</label>
        <input id="t-q" name="q" defaultValue={q} placeholder="Search, e.g. elevator, painting…" className={field} />
        <label className="sr-only" htmlFor="t-category">Trade</label>
        <select id="t-category" name="category" defaultValue={category} className={field}>
          <option value="">All trades</option>
          {(options.data?.supplierCategories ?? []).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brass-500 px-6 font-medium text-white transition-colors hover:bg-brass-600">
          <Icon name="search" size={17} />
          Search
        </button>
      </form>

      <LoginNotice className="mt-6" />

      {data && !data.signedIn && (
        <div className="mt-8 flex flex-col gap-4 rounded-lg bg-ink-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm text-white/80">
            <Icon name="lock" size={18} className="mt-0.5 shrink-0 text-brass-400" />
            <span>
              <strong className="font-semibold text-white">Supplier?</strong> Log in to see the hotel and its contact email, and
              send your quote directly. Free until 1 May 2028, 0% commission.
            </span>
          </p>
          <ButtonLink href={memberLoginUrl("/tenders")} variant="light" className="shrink-0">
            Log in as supplier
          </ButtonLink>
        </div>
      )}

      {!data ? (
        <p className="mt-12 text-center text-sm text-ink-500">{res.error}</p>
      ) : data.items.length === 0 ? (
        <div className="mt-12">
          <EmptyState icon="file" title="No open tenders right now">
            {q || category ? "Try another search or trade." : "New tenders from boutique hotels appear here as soon as they are posted."}
          </EmptyState>
        </div>
      ) : (
        <>
          <p className="mt-10 text-sm text-ink-500">
            {data.total} open {data.total === 1 ? "tender" : "tenders"}
          </p>
          <ul className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.items.map((tender) => (
              <li key={tender._id}>
                <TenderCard tender={tender} countryName={countries.get(tender.country) ?? tender.country} />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Pager page={data.page} pages={data.pages} basePath="/tenders" query={{ q, category }} />
          </div>
        </>
      )}
    </>
  );
}
