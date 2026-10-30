import type { Metadata } from "next";
import { Suspense } from "react";
import { getArticleAction } from "@/app/actions/article";
import { Container } from "@/component/shared/Container";
import { StoryArticle } from "@/component/stories/StoryArticle";
import { pageMetadata, snippet } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = (await getArticleAction(slug)).data;
  if (!story) return { title: "Story not found" };
  return pageMetadata({
    title: story.title,
    description: snippet(story.excerpt),
    path: `/stories/${story.slug}`,
    image: story.image || undefined,
    type: "article",
  });
}

export default function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  return (
    <Suspense
      fallback={
        <Container className="py-24">
          <div className="mx-auto h-12 max-w-3xl animate-pulse rounded bg-sand" />
          <div className="mx-auto mt-6 h-80 max-w-3xl animate-pulse rounded-xl bg-sand" />
        </Container>
      }
    >
      <StoryArticle params={params} />
    </Suspense>
  );
}
