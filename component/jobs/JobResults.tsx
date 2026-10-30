import { cacheLife, cacheTag } from "next/cache";
import { listVacanciesAction, type VacancyFilters } from "@/app/actions/vacancy";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { EmptyState } from "@/component/shared/EmptyState";
import { Pager } from "@/component/shared/Pager";
import { VacancyCard } from "@/component/shared/VacancyCard";

/** Job cards for the current filters, urgent first. */
export async function JobResults({ filters }: { filters: VacancyFilters }) {
  "use cache";
  cacheLife("minutes");
  cacheTag("vacancies");

  const res = await listVacanciesAction({ ...filters, limit: 12 });
  const result = res.data;

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
        title="No jobs found"
        action={<ButtonLink href="/jobs" variant="outline">Show all jobs</ButtonLink>}
      >
        Try another category or region, or come back soon — hotels add new jobs every week.
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
      <Pager
        page={result.page}
        pages={result.pages}
        basePath="/jobs"
        query={{ category: filters.category, region: filters.region, q: filters.q }}
      />
    </>
  );
}
