import { pageParam } from "@/lib/format";
import { StoryList } from "./StoryList";

/** Reads ?page= from the URL for the stories list. */
export async function StoryPageList({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return <StoryList page={pageParam(params.page)} />;
}
