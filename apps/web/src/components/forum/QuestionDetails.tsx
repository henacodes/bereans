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
import { authClient } from "@/lib/auth-client";

export default function QuestionDetails({
  questionId,
}: {
  questionId: string;
}) {
  const [approvedAnswer, setApprovedAnswer] = useState<string | null>(null);
  const { setQuestion } = useQuestionDetail();
  const questionQuery = useTRPCQuery(trpc.question.getQuestionById, {
    questionId,
  });
  const session = authClient.useSession();

  useEffect(() => {
    if (!questionQuery.data) return;

    let answers = questionQuery.data.answers;

    setQuestion({
      ...questionQuery.data,
      createdAt: questionQuery.data.createdAt,
      updatedAt: new Date(questionQuery.data.updatedAt),
    });

    const approved = answers.find((a) => a.approved);
    if (approved) {
      setApprovedAnswer(approved.id);
    } else {
      setApprovedAnswer(null);
    }
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
    user: asker,
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
        author={asker.name}
        text={text}
        date={createdAt}
      />

      {/* Answers Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          {answers.length} Answers
        </h2>

        <div className="space-y-6">
          {answers.map((answer) => {
            return (
              <AnswerCard
                key={answer.id}
                id={answer.id}
                content={answer.text}
                author={answer.user}
                votes={0}
                approved={answer.approved}
                date={answer.createdAt}
                userId={session.data?.user.id}
                setApprovedAnswer={setApprovedAnswer}
                approvedAnswer={approvedAnswer}
                asker={asker}
              />
            );
          })}
        </div>
      </div>
      <AnswerForm questionId={questionId} />
    </div>
  );
}
