import Image from "next/image";
import Link from "next/link";
import { stories } from "@/lib/data/home";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { Icon } from "@/component/shared/Icon";
import { SectionHeading } from "@/component/shared/SectionHeading";

/** Content section: articles and interviews (content is delivered later by the client). */
export function Stories() {
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
            <article
              key={story.slug}
              className="reveal group flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(36,30,24,0.35)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={story.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-ink-500">
                  <span className="font-medium text-brass-600">{story.kind}</span> · {story.readingTime} read
                </p>
                <h3 className="mt-3 font-display text-xl leading-snug text-ink-950">
                  <Link href={`/stories/${story.slug}`} className="transition-colors hover:text-brass-600">
                    {story.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-500">{story.excerpt}</p>
                <Link
                  href={`/stories/${story.slug}`}
                  aria-hidden="true"
                  tabIndex={-1}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.8125rem] font-medium text-brass-600"
                >
                  Read more
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
