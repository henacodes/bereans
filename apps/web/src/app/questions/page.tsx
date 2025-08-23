"use client";

import QuestionCard from "@/components/forum/QuestionCard";
import { SkeletonCard } from "@/components/Skeleton";
import { useTRPCQuery } from "@/hooks/useTRPCQuery";
import { trpc } from "@/utils/trpc";

export default function QuestionsPage() {
  const questionsQuery = useTRPCQuery(trpc.question.fetchRecent, {});

  if (questionsQuery.isSuccess) {
    return (
      <div className=" mt-10  ">
        <small className=" my-4 ">
          Here are some of the most recent quuestions{" "}
        </small>
        {questionsQuery.data.map((q) => (
          <div className=" my-5  ">
            <QuestionCard translation={"ESV"} answersCount={0} {...q} />
          </div>
        ))}
      </div>
    );
  }
  if (questionsQuery.isPending) {
    return (
      <div className="gap">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }
  return;
}
