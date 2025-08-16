"use client";

import { useTRPCQuery } from "@/hooks/useTRPCQuery";
import { trpc } from "@/utils/trpc";

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
  Check,
  Award,
  Flag,
  Calendar,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { getBibleBook } from "@/data/bible";
import type { Verse } from "@/types/bible";
import { formatDistance, formatDistanceToNow } from "date-fns";

export default function QuestionDetails({
  questionId,
}: {
  questionId: string;
}) {
  const questionQuery = useTRPCQuery(trpc.question.getQuestionById, {
    questionId,
  });

  if (questionQuery.isLoading) return <p>Loading question...</p>;
  if (questionQuery.isError) return <p>Error: {questionQuery.error.message}</p>;
  if (!questionQuery.data) return <p>Question not found</p>;

  const { title, text, user, createdAt, answers, upvotes, downvotes } =
    questionQuery.data;

  return (
    <div className="space-y-8">
      <Card className="mb-8 border-slate-200 shadow-sm">
        <CardHeader className="pb-4 flex flex-col gap-4">
          <div className="flex items-center   w-full i ">
            <div className="flex flex-col items-center gap-1  mr-6 ">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-slate-100"
              >
                <ChevronUp className="h-4 w-4 text-slate-600" />
              </Button>
              <span className="text-lg font-medium text-slate-700">
                {upvotes - downvotes}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-slate-100"
              >
                <ChevronDown className="h-4 w-4 text-slate-600" />
              </Button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-slate-200">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDistanceToNow(new Date(createdAt))} ago
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose prose-slate max-w-none">
            {text.split("\n\n").map((p, i) => (
              <p
                key={i}
                className="text-slate-700 leading-relaxed mb-4 last:mb-0"
              >
                {p}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Answers Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          {answers.length} Answers
        </h2>

        <div className="space-y-6">
          {answers.map((answer: any) => (
            <Card key={answer.id} className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 min-w-[60px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-slate-100"
                    >
                      <ChevronUp className="h-4 w-4 text-slate-600" />
                    </Button>
                    <span className="text-lg font-medium text-slate-700">
                      {0}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-slate-100"
                    >
                      <ChevronDown className="h-4 w-4 text-slate-600" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <div className="prose prose-slate max-w-none mb-4">
                      {answer.text
                        .split("\n\n")
                        .map((para: string, i: number) => (
                          <p key={i} className="text-slate-700 leading-relaxed">
                            {para}
                          </p>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs bg-slate-200">
                              {answer.user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-slate-900">
                              {answer.user.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(new Date(answer.createdAt))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
