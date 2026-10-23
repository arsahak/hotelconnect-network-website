import { urgentVacancies } from "@/lib/data/home";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { Icon } from "@/component/shared/Icon";
import { SectionHeading } from "@/component/shared/SectionHeading";
import { VacancyCard } from "@/component/shared/VacancyCard";

/** Homepage block 2: the most urgent jobs right now. */
export function UrgentVacancies() {
  return (
    <section aria-labelledby="vacancies-title" className="bg-sand py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="vacancies-title"
          eyebrow="Jobs"
          title="Who's Hiring Right Now"
          description="The most urgent jobs at member hotels. Apply in one click, no account needed."
          action={
            <ButtonLink href="/jobs" variant="outline">
              View all jobs
              <Icon name="arrow-right" size={16} />
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {urgentVacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>

        <p className="mt-8 flex items-start gap-2 text-[0.8125rem] text-ink-500 sm:items-center">
          <Icon name="shield-check" size={17} className="shrink-0 text-brass-500" />
          Your CV goes straight to the hotel. HotelConnect does not store any application data.
        </p>
      </Container>
    </section>
  );
}
