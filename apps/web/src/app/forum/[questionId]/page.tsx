import { fetchPassage } from "@/lib/passage";
import type { PassageSearchParams, Verse } from "@/types/bible";
import QuestionDetails from "@/components/forum/QuestionDetails";
import ExcerptCard from "@/components/bible/ExcerptCard";

export default async function DiscussionPage({
  params,
  searchParams,
}: {
  params: { questionId: string };
  searchParams: PassageSearchParams;
}) {
  const { questionId } = await params;
  const searchQuery = await searchParams;

  // Build search queries
  const hasAllProps =
    Object.keys(searchQuery).length > 0 &&
    Object.values(searchQuery).every((v) => v !== undefined && v !== null);

  let passage = null;

  if (hasAllProps) {
    try {
      passage = await fetchPassage(searchQuery);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.warn("Missing or invalid query parameters:", searchQuery);
  }

  return (
    <div className="px-32  pt-10 ">
      <ExcerptCard
        searchParams={searchQuery}
        serverFetchedPassage={passage || []}
      />

      <QuestionDetails questionId={questionId} />
    </div>
  );
}
