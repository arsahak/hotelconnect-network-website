import Link from "next/link";
import { Icon } from "@/component/shared/Icon";
import { Photo } from "@/component/shared/Photo";
import { formatDate } from "@/lib/format";
import type { Article } from "@/lib/types";

/** Card for a story (article, interview or column), on the homepage and /stories. */
export function StoryCard({ story }: { story: Article }) {
  return (
    <article className="reveal group flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(36,30,24,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Photo
          src={story.image}
          alt=""
          sizes="(min-width: 768px) 30vw, 100vw"
          className="transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs text-ink-500">
          <span className="font-medium text-brass-600">{story.kind}</span> · {story.readingMinutes} min read ·{" "}
          {formatDate(story.publishedAt)}
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
  );
}
