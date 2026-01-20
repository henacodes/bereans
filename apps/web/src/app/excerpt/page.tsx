import { ArrowLeft, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { PassageSearchParams, Verse } from "@bereans/api/types/bible";
import { getBibleBook } from "@/data/bible";
import { fetchPassage } from "@bereans/api/third-party/passage";
import QuestionsList from "@/components/forum/QuestionsList";

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
    return (
      <p>
        Failed to load the page as the required passage parameters were not
        given
      </p>
    );
  }

  const passage = await fetchPassage(params);

  return (
    <>
      <div className=" p-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <a
              href={`/bible/${params.translation}/${params.bookId}/${params.chapter}`}
            >
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {getBibleBook(parseInt(params.bookId))?.name}{" "}
                {params.chapter}
              </Button>
            </a>
          </div>

          {/* Verse Context (Compact) */}
          <Card className="mb-6 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <Book className="h-4 w-4" />
                <span>
                  {getBibleBook(parseInt(params.bookId))?.name} {params.chapter}
                  :{params.verseStart}
                  {params.verseStart !== params.verseEnd &&
                    `-${params.verseEnd} `}
                </span>
              </div>
              <blockquote className="text-base text-slate-800 font-medium">
                {passage[0].map((v: Verse) => (
                  <span key={v.pk}>
                    <b className=" text-lg ">{v.verse}</b> {v.text}
                  </span>
                ))}
              </blockquote>
            </CardContent>
          </Card>

          <QuestionsList {...params} />
        </div>
      </div>
    </>
  );
}
