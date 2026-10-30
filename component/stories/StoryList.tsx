import { cacheLife, cacheTag } from "next/cache";
import { listArticlesAction } from "@/app/actions/article";
import { EmptyState } from "@/component/shared/EmptyState";
import { Pager } from "@/component/shared/Pager";
import { StoryCard } from "./StoryCard";

/** All published stories, newest first, 9 per page. */
export async function StoryList({ page }: { page: number }) {
  "use cache";
  cacheLife("minutes");
  cacheTag("articles");

  const res = await listArticlesAction({ page, limit: 9 });
  const result = res.data;

  if (!result || result.items.length === 0) {
    return (
      <EmptyState icon="book" title={res.ok ? "No stories yet" : "Stories are not available right now"}>
        {res.ok ? "The first interviews and articles are on their way." : "Please try again in a moment."}
      </EmptyState>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {result.items.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>
      <Pager page={result.page} pages={result.pages} basePath="/stories" query={{}} />
    </>
  );
}
