import { fetchPassage } from "@/lib/passage";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Book,
  Calendar,
  ChevronUp,
  ChevronDown,
  Check,
  Award,
  Flag,
} from "lucide-react";
import { getBibleBook } from "@/data/bible";
import type { PassageSearchParams, Verse } from "@/types/bible";
import { formatDistance, formatDistanceToNow } from "date-fns";
import { AnswerForm } from "@/components/forum/AnswerForm";
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
      console.log("searchhhhh", searchQuery);
      passage = await fetchPassage(searchQuery);
      console.log("Passage fetched:", passage);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.warn("Missing or invalid query parameters:", searchQuery);
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-6">
        {/*    <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {getBibleBook(searchQueries.bookId).name} {chapter}:
          {verseStart} related questions
        </Button> */}
      </div>

      {/* Verse Context */}

      <ExcerptCard
        searchParams={searchQuery}
        serverFetchedPassage={passage || []}
      />

      <QuestionDetails questionId={questionId} />
    </div>
  );
}
