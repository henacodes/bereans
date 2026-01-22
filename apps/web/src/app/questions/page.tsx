"use client";

import { CoolBackground } from "@/components/background";
import QuestionCard from "@/components/forum/QuestionCard";
import { SkeletonCard } from "@/components/skeleton";
import { useTRPCQuery } from "@/hooks/useTRPCQuery";
import { trpc } from "@/utils/trpc";

export default function QuestionsPage() {
  const questionsQuery = useTRPCQuery(trpc.question.fetchRecent, {});

  return (
    <div className="mt-10 px-4 md:px-16 lg:px-32 relative z-0">
      <CoolBackground />

      {/* This header section will show in all states */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back Berean
        </h1>
        <p className="text-muted-foreground mt-1">
          Here are some of the most recent questions
        </p>
      </div>

      {questionsQuery.isSuccess && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3 my-5">
          {questionsQuery.data.map((q) => (
            <QuestionCard key={q.id} {...q} />
          ))}
        </div>
      )}

      {questionsQuery.isPending && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3 my-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
    </div>
  );
}
