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

export default function QuestionsList({
  bookId,
  chapter,
  verseStart,
  verseEnd,
}: PassageSearchParams) {
  const questionsQuery = useTRPCQuery(trpc.question.getQuestions, {
    bookId: parseInt(bookId),
    chapter: parseInt(chapter),
    verseStart: parseInt(verseStart),
    verseEnd: parseInt(verseEnd),
  });

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
          <Card
            key={q.id}
            className="border-slate-200 hover:shadow-md transition-shadow cursor-pointer mb-4"
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Vote Section */}
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-slate-100"
                    // TODO: handle vote up
                  >
                    <ChevronUp className="h-4 w-4 text-slate-600" />
                  </Button>
                  <span className="text-sm font-medium text-slate-700">
                    {q.upvotes - q.downvotes}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-slate-100"
                  >
                    <ChevronDown className="h-4 w-4 text-slate-600" />
                  </Button>
                </div>

                {/* Question Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-900 mb-2 hover:text-blue-600 transition-colors">
                    <a
                      href={`/forum/${q.id}`}
                      className="flex gap-2 items-center  "
                    >
                      {q.title} <ExternalLink size={20} />
                    </a>
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">{q.text}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-slate-200">
                            {q.user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-600">
                          {q.user.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {formatDistance(new Date(q.createdAt), new Date(), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>

                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      23 answers
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}
