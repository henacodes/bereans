"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, TrendingUp } from "lucide-react";

import { trpc } from "@/utils/trpc";
import { useTRPCQuery } from "@/hooks/useTRPCQuery";
import { SkeletonCard } from "@/components/skeleton";
import AlertCard from "@/components/alert";
import StatsGrid from "@/components/dashboard/stats-grid";
import UserActivity from "@/components/dashboard/user-activity";
import ContributionSidebar from "@/components/dashboard/contribution-sidebar";
import SavedQuestions from "@/components/dashboard/saved-questions";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// --- Main Page ---

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const { data, isLoading, isError, error } = useTRPCQuery(
    trpc.dashboard.getSummary,
    undefined,
  );

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);
  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          <SkeletonCard className="rounded-xl h-32" />
          <SkeletonCard className="rounded-xl h-32" />
          <SkeletonCard className="rounded-xl h-32" />
          <SkeletonCard className="rounded-xl h-32" />
        </div>
        <SkeletonCard className="rounded-xl h-96" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <AlertCard
          variant="destructive"
          title="Error Loading Dashboard"
          description={error.message}
        />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col gap-8 p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-1">
        <h2 className="text-4xl font-black tracking-tight text-foreground">
          Dashboard
        </h2>
        <p className="text-muted-foreground font-serif italic">
          Welcome back, Berean. Here is your study overview.
        </p>
      </div>

      <StatsGrid stats={data.stats} />

      <div className="grid gap-6 grid-cols-4">
        <UserActivity questions={data.recentQuestions} />
        <ContributionSidebar answers={data.recentAnswers} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 rounded-xl border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Community Recognition
            </CardTitle>
            <CardDescription className="text-xs">
              Impact of your scriptural insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-xl m-6 bg-muted/10">
            <p className="text-xs font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
              <TrendingUp className="h-4 w-4" />
              Reputation analytics enabled
            </p>
          </CardContent>
        </Card>

        <SavedQuestions savedItems={data.savedItems} />
      </div>
    </div>
  );
}
