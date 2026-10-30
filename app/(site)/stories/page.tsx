import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/component/shared/Container";
import { ListSkeleton } from "@/component/shared/ListSkeleton";
import { PageHero } from "@/component/shared/PageHero";
import { StoryPageList } from "@/component/stories/StoryPageList";
import { pageImages } from "@/lib/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Stories",
  description: "Interviews, articles and columns about compliance, staff and smart purchasing in boutique hotels.",
  path: "/stories",
});

/** Content section (briefing §2.1): articles and interviews. */
export default function StoriesPage({ searchParams }: PageProps<"/stories">) {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Stories from Boutique Hotels"
        description="Interviews, articles and columns about compliance, staff and smart purchasing."
        image={pageImages.stories}
      />
      <section aria-labelledby="stories-title" className="bg-sand py-16 lg:py-20">
        <h2 id="stories-title" className="sr-only">
          All stories
        </h2>
        <Container>
          <Suspense fallback={<ListSkeleton count={3} />}>
            <StoryPageList searchParams={searchParams} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
