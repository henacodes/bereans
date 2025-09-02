"use client";

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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useTRPCQuery } from "@/hooks/useTRPCQuery";
import { SkeletonCard } from "../Skeleton";
import type { PassageSearchParams } from "@/types/bible";
import { objToQueryString } from "@/lib/utils";
import QuestionCard from "./QuestionCard";

export default function QuestionsList({
  bookId,
  chapter,
  verseStart,
  verseEnd,
  translation,
}: PassageSearchParams) {
  const query = {
    bookId: parseInt(bookId),
    chapter: parseInt(chapter),
    verseStart: parseInt(verseStart),
    verseEnd: parseInt(verseEnd),
  };
  const questionsQuery = useTRPCQuery(trpc.question.getQuestions, query);

  if (questionsQuery.isPending) {
    return (
      <div className="gap">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (questionsQuery.isSuccess) {
    let questions = questionsQuery.data;

    if (!questions.length) {
      return (
        <Badge className="m-2">
          There are no questions associated with any verse from this passage
        </Badge>
      );
    }
    return (
      <div className="  ">
        {questions.map((q) => (
          <QuestionCard {...q} />
        ))}
      </div>
    );
  }
}
