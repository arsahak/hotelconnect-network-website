import { notFound } from "next/navigation";
import { getArticleAction } from "@/app/actions/article";
import { Container } from "@/component/shared/Container";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { Photo } from "@/component/shared/Photo";
import { TextLink } from "@/component/shared/TextLink";
import { formatDate } from "@/lib/format";

/** One story. The body is HTML written by the HotelConnect team in the dashboard. */
export async function StoryArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = (await getArticleAction(slug)).data;
  if (!story) notFound();

  return (
    <article>
      <header className="relative isolate overflow-hidden bg-ink-950 text-white">
        <Photo src={story.image} alt="" sizes="100vw" priority className="-z-20 opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/90 via-ink-950/50 to-ink-950/30" />
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <TextLink href="/stories" tone="light">
              All stories
            </TextLink>
            <Eyebrow tone="light" className="mt-8">
              {story.kind} · {story.readingMinutes} min read
            </Eyebrow>
            <h1 className="mt-4 font-display text-4xl leading-tight text-balance [-webkit-text-stroke:0.8px_currentColor] sm:text-5xl">
              {story.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/80">{story.excerpt}</p>
            <p className="mt-6 text-sm text-white/60">{formatDate(story.publishedAt)}</p>
          </div>
        </Container>
      </header>

      <div className="bg-cream py-16 lg:py-20">
        <Container>
          <div
            className="mx-auto max-w-3xl text-[1.0625rem] leading-[1.8] text-ink-700 [&_a]:text-brass-600 [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-brass-500 [&_blockquote]:pl-6 [&_blockquote]:font-display [&_blockquote]:text-2xl [&_blockquote]:text-ink-950 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-ink-950 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:text-ink-950 [&_img]:my-8 [&_img]:rounded-lg [&_li]:mt-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-5 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
            // Written by admins in the dashboard editor. The API must sanitise
            // this HTML when it is saved (dashboard content module, step 2).
            dangerouslySetInnerHTML={{ __html: story.body ?? "" }}
          />
        </Container>
      </div>
    </article>
  );
}
