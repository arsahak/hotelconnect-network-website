import { cacheLife, cacheTag } from "next/cache";
import { listVacanciesAction, type VacancyFilters } from "@/app/actions/vacancy";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { EmptyState } from "@/component/shared/EmptyState";
import { Pager } from "@/component/shared/Pager";
import { VacancyCard } from "@/component/shared/VacancyCard";

/** Job cards of one list (hotel or supplier jobs) for the current filters, urgent first. */
export async function JobResults({
  employer,
  filters,
  query,
}: {
  employer: "hotel" | "supplier";
  filters: VacancyFilters;
  /** Everything else in the URL, kept when paging. */
  query: Record<string, string | undefined>;
}) {
  "use cache";
  cacheLife("minutes");
  cacheTag("vacancies");

  const res = await listVacanciesAction({ ...filters, employer, limit: 9 });
  const result = res.data;
  const where = employer === "hotel" ? "hotels" : "suppliers";

  if (!res.ok || !result) {
    return (
      <EmptyState icon="briefcase" title="The jobs are not available right now">
        Please try again in a moment.
      </EmptyState>
    );
  }

  if (result.items.length === 0) {
    return (
      <EmptyState
        icon="briefcase"
        title={`No jobs at ${where} found`}
        action={<ButtonLink href={`/jobs#${employer}-jobs`} variant="outline">Show all jobs</ButtonLink>}
      >
        Try another category or region, or come back soon — new jobs are added every week.
      </EmptyState>
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-ink-500">
        {result.total} {result.total === 1 ? "job" : "jobs"}
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {result.items.map((vacancy) => (
          <VacancyCard key={vacancy._id} vacancy={vacancy} />
        ))}
      </div>
      <Pager page={result.page} pages={result.pages} basePath="/jobs" query={query} pageKey={employer === "hotel" ? "hpage" : "spage"} hash={`${employer}-jobs`} />
    </>
  );
}
