"use client";

import QuestionCard from "@/components/forum/QuestionCard";
import { SkeletonCard } from "@/components/Skeleton";
import { useTRPCQuery } from "@/hooks/useTRPCQuery";
import { trpc } from "@/utils/trpc";

export default function QuestionsPage() {
  const questionsQuery = useTRPCQuery(trpc.question.fetchRecent, {});

  if (questionsQuery.isSuccess) {
    console.log(questionsQuery.data);
    return (
      <div className=" mt-10  px-32   relative z-0       ">
        <small className=" my-4 ">
          Here are some of the most recent quuestions{" "}
        </small>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2   2xl:grid-cols-3 my-5">
          {questionsQuery.data.map((q) => (
            <QuestionCard key={q.id} translation="ESV" {...q} />
          ))}
        </div>
      </div>
    );
  }
  if (questionsQuery.isPending) {
    return (
      <div className="gap px-32">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }
  return;
}
