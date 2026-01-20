"use client";

import { trpc } from "@/utils/trpc";
import { useTRPCQuery } from "@/hooks/useTRPCQuery";
import { SkeletonCard } from "../skeleton";
import type { PassageSearchParams } from "@bereans/api/types/bible";
import QuestionCard from "./QuestionCard";
import { Badge } from "lucide-react";

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
          <div className=" my-6  ">
            <QuestionCard {...q} />
          </div>
        ))}
      </div>
    );
  }
}
