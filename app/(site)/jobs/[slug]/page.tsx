import type { Metadata } from "next";
import { Suspense } from "react";
import { getVacancyAction } from "@/app/actions/vacancy";
import { JobDetails } from "@/component/jobs/JobDetails";
import { Container } from "@/component/shared/Container";
import { pageMetadata, snippet } from "@/lib/seo";
import { employerOf } from "@/lib/employer";

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = (await getVacancyAction(slug)).data;
  if (!vacancy) return { title: "Job not found" };
  const employer = employerOf(vacancy);
  return pageMetadata({
    title: `${vacancy.title} at ${employer.name}`,
    description: snippet(
      `${vacancy.employmentType} ${vacancy.category.toLowerCase()} job at ${employer.name}${employer.kind === "hotel" ? ", a boutique hotel" : ""} in ${vacancy.city}. Apply in one click via WhatsApp or email — no account needed.`,
    ),
    path: `/jobs/${vacancy.slug}`,
    image: vacancy.image || employer.image || undefined,
  });
}

export default function JobPage({ params }: PageProps<"/jobs/[slug]">) {
  return (
    <Suspense
      fallback={
        <Container className="py-24">
          <div className="h-10 w-2/3 animate-pulse rounded bg-sand" />
          <div className="mt-6 h-64 animate-pulse rounded-xl bg-sand" />
        </Container>
      }
    >
      <JobDetails params={params} />
    </Suspense>
  );
}
