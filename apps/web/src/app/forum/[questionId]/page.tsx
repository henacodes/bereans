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
import type { Verse } from "@/types/bible";
import { formatDistance, formatDistanceToNow } from "date-fns";
import { AnswerForm } from "@/components/forum/AnswerForm";
import QuestionDetails from "@/components/forum/QuestionDetails";

export default async function DiscussionPage({
  params,
}: {
  params: { questionId: string };
}) {
  const { questionId } = await params;

  /*  const passage = await fetchPassage({
    translation,
    bookId,
    chapter,
    verseStart,
    verseEnd,
  }); */

  return (
    <div className="p-8">
      <QuestionDetails questionId={questionId} />
      <AnswerForm questionId={questionId} />
    </div>
  );
}
