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
    incrementsView: true,
  });

  const savedQuestionQuery = useTRPCQuery(trpc.question.isQuestionSaved, {
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
    votes,
    tags,
    views,
  } = questionQuery.data;

  console.log("votessssss", votes);

  return (
    <div className="space-y-8">
      <QuestionCard
        id={questionId}
        title={title}
        author={asker.name}
        text={text}
        date={createdAt}
        votes={votes}
        userId={session.data?.user.id}
        isSaved={savedQuestionQuery.data}
        tags={tags}
        views={views}
      />

      {/* Answers Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          {answers.length} Answers
        </h2>

        <div className="space-y-6">
          {answers
            .sort((a, b) => {
              if (a.approved && !b.approved) return -1;
              if (!a.approved && b.approved) return 1;
              return 0;
            })
            .map((answer) => {
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
