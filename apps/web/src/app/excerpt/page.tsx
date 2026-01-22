import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { PassageSearchParams } from "@bereans/api/types/bible";
import { getBibleBook } from "@/data/bible";
import { fetchPassage } from "@bereans/api/third-party/passage";
import QuestionsList from "@/components/forum/QuestionsList";
import ExcerptCard from "@/components/bible/ExcerptCard";
import EmptyPassageState from "@/components/empty-passage";

export default async function Passage({
  searchParams,
}: {
  searchParams: Promise<PassageSearchParams>;
}) {
  const params = await searchParams;

  // Build search queries
  const hasAllProps =
    Object.keys(params).length > 0 &&
    Object.values(params).every((v) => v !== undefined && v !== null);

  if (!hasAllProps) {
    return <EmptyPassageState />;
  }

  const passage = await fetchPassage(params);

  return (
    <>
      <div className="px-4 py-8 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb - Better touch target and spacing */}
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <a
              href={`/bible/${params.translation}/${params.bookId}/${params.chapter}`}
              className="block" // Ensures anchor matches button size
            >
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden xs:inline">Back to </span>
                {getBibleBook(parseInt(params.bookId))?.name} {params.chapter}
              </Button>
            </a>
          </div>

          <ExcerptCard searchParams={params} serverFetchedPassage={passage} />

          <div className="mt-12 mb-8 md:mt-16 flex items-center gap-2 md:gap-4">
            <div className="hidden sm:block flex-1 h-[1px] bg-border/60" />

            <h2 className="font-playfair italic text-xl md:text-2xl font-medium text-foreground/80 text-center mx-auto sm:mx-0 sm:whitespace-nowrap px-2">
              Inquiries related to this passage
            </h2>

            <div className="hidden sm:block flex-1 h-px bg-border/60" />
          </div>

          <QuestionsList {...params} />
        </div>
      </div>
    </>
  );
}
