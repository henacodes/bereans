import { formatDistance } from "date-fns";
import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Calendar,
  Book,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { PassageSearchParams, Verse } from "@/types/bible";
import { getBibleBook } from "@/data/bible";
import { fetchPassage } from "@/lib/passage";
import QuestionsList from "@/components/forum/QuestionsList";

export default async function Passage({
  searchParams,
}: {
  searchParams: PassageSearchParams;
}) {
  const { bookId, verseEnd, verseStart, chapter, translation } =
    await searchParams;
  const params = {
    bookId: parseInt(bookId),
    verseEnd: parseInt(verseEnd),
    verseStart: parseInt(verseStart),
    chapter: parseInt(chapter),
    translation,
  };
  const passage = await fetchPassage(params);

  /*   // Fetch questions from API
  const questionsRes = await trpc.questions.getQuestions({
    bookId: params.bookId,
    chapter: params.chapter,
    verseStart: params.verseStart,
    verseEnd: params.verseEnd,
  });

  const questions = questionsRes; */

  return (
    <>
      <div className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {getBibleBook(params.bookId)?.name} {params.chapter}
            </Button>
          </div>

          {/* Verse Context (Compact) */}
          <Card className="mb-6 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <Book className="h-4 w-4" />
                <span>
                  {getBibleBook(params.bookId)?.name} {params.chapter}:
                  {params.verseStart}
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
