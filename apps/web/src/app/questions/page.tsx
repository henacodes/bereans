"use client";

import { CoolBackground } from "@web/components/background";
import QuestionCard from "@web/components/forum/QuestionCard";
import { SkeletonCard } from "@web/components/Skeleton";
import { useTRPCQuery } from "@web/hooks/useTRPCQuery";
import { trpc } from "@web/utils/trpc";

export default function QuestionsPage() {
  const questionsQuery = useTRPCQuery(trpc.question.fetchRecent, {});

  if (questionsQuery.isSuccess) {
    return (
      <div className=" mt-10  px-32  relative z-0  ">
        <CoolBackground />
        <small className=" my-4 ">
          Here are some of the most recent quuestions
        </small>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2   2xl:grid-cols-3 my-5">
          {questionsQuery.data.map((q) => (
            <QuestionCard key={q.id} {...q} />
          ))}
        </div>
      </div>
    );
  }
  if (questionsQuery.isPending) {
    return (
      <div className="mt-10  px-32   relative z-0">
        <CoolBackground />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }
  return;
}
