import { fetchPassage } from "@bereans/api/third-party/passage";
import type { PassageSearchParams, Verse } from "@bereans/api/types/bible";
import QuestionDetails from "@/components/forum/QuestionDetails";
import ExcerptCard from "@/components/bible/ExcerptCard";
import { CoolBackground } from "@/components/background";

export default async function DiscussionPage({
  params,
  searchParams,
}: {
  params: Promise<{ questionId: string }>;
  searchParams: Promise<PassageSearchParams>;
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
    <div className="px-4 md:px-16 lg:px-32  pt-10 relative z-0  ">
      <CoolBackground />
      <ExcerptCard
        searchParams={searchQuery}
        serverFetchedPassage={passage || []}
      />

      <QuestionDetails questionId={questionId} />
    </div>
  );
}
