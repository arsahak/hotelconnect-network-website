import type { Metadata } from "next";
import { Suspense } from "react";
import { getVacancyAction } from "@/app/actions/vacancy";
import { JobDetails } from "@/component/jobs/JobDetails";
import { Container } from "@/component/shared/Container";
import { pageMetadata, snippet } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = (await getVacancyAction(slug)).data;
  if (!vacancy) return { title: "Job not found" };
  return pageMetadata({
    title: `${vacancy.title} at ${vacancy.hotel.name}`,
    description: snippet(
      `${vacancy.employmentType} ${vacancy.category.toLowerCase()} job at ${vacancy.hotel.name}, a boutique hotel in ${vacancy.city}. Apply in one click via WhatsApp or email — no account needed.`,
    ),
    path: `/jobs/${vacancy.slug}`,
    image: vacancy.image || vacancy.hotel.image || undefined,
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
