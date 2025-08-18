"use client";

import { useTRPCQuery } from "@/hooks/useTRPCQuery";
import { trpc } from "@/utils/trpc";
import { SkeletonCard } from "../Skeleton";
import AlertCard from "../Alert";
import { AnswerForm } from "./AnswerForm";
import { useQuestionDetail } from "@/stores/useQuestionDetail";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import { AnswerCard } from "./AnswerCard";

export default function QuestionDetails({
  questionId,
}: {
  questionId: string;
}) {
  const { setQuestion } = useQuestionDetail();

  const [state, setState] = useState<any>();

  const questionQuery = useTRPCQuery(trpc.question.getQuestionById, {
    questionId,
  });

  useEffect(() => {
    if (!questionQuery.data) return;

    setQuestion({
      ...questionQuery.data,
      createdAt: questionQuery.data.createdAt,
      updatedAt: new Date(questionQuery.data.updatedAt),
    });
  }, [questionQuery.data, setQuestion]);

  if (questionQuery.isLoading)
    return (
      <>
        <SkeletonCard /> <SkeletonCard />
      </>
    );
  if (questionQuery.isError) {
    return (
      <AlertCard
        variant="destructive"
        title={"Failed to Fetch"}
        description={questionQuery.error.message}
      />
    );
  }
  if (!questionQuery.data) return <p>Question not found</p>;

  const {
    title,
    text,
    user,
    createdAt,
    answers,
    upvotes,
    downvotes,
    updatedAt,
    userId,
  } = questionQuery.data;

  return (
    <div className="space-y-8">
      <QuestionCard
        title={title}
        author={user.name}
        text={text}
        date={createdAt}
      />

      {/* Answers Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          {answers.length} Answers
        </h2>

        <div className="space-y-6">
          {answers.map((answer) => (
            <>
              <AnswerCard
                content={answer.text}
                author={answer.user.name}
                votes={0}
                accepted={false}
                date={answer.createdAt}
              />
            </>
          ))}
        </div>
      </div>
      <AnswerForm questionId={questionId} />
    </div>
  );
}
