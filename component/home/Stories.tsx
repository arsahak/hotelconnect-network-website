import { cacheLife, cacheTag } from "next/cache";
import { listArticlesAction } from "@/app/actions/article";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { Icon } from "@/component/shared/Icon";
import { SectionHeading } from "@/component/shared/SectionHeading";
import { StoryCard } from "@/component/stories/StoryCard";

/** Content section: the three newest stories (content is delivered by the client). */
export async function Stories() {
  "use cache";
  cacheLife("minutes");
  cacheTag("articles");
  const stories = (await listArticlesAction({ limit: 3 })).data?.items ?? [];
  if (stories.length === 0) return null;

  return (
    <section aria-labelledby="stories-title" className="bg-sand py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="stories-title"
          eyebrow="Journal"
          title="Stories from Boutique Hotels"
          description="Interviews, articles and columns about compliance, staff and smart purchasing."
          action={
            <ButtonLink href="/stories" variant="outline">
              All stories
              <Icon name="arrow-right" size={16} />
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      </Container>
    </section>
  );
}
