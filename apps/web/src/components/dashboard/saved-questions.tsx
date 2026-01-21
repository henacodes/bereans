"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, TrendingUp } from "lucide-react";

import { useTRPCQuery } from "@/hooks/useTRPCQuery";
import { SkeletonCard } from "@/components/skeleton";
import AlertCard from "@/components/alert";
import Link from "next/link";
import StatsGrid from "@/components/dashboard/stats-grid";
import UserActivity from "@/components/dashboard/user-activity";
import ContributionSidebar from "@/components/dashboard/contribution-sidebar";

export default function SavedQuestions({
  savedItems,
}: {
  savedItems: {
    id: string;
    title: string;
  }[];
}) {
  return (
    <Card className="col-span-3 rounded-xl border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Saved for Study</CardTitle>
        <CardDescription className="text-xs">
          Quick access to pinned questions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {savedItems.length === 0 ? (
            <p className="text-muted-foreground text-xs italic py-4 text-center">
              No saved questions yet.
            </p>
          ) : (
            savedItems.map((item: any) => (
              <Link key={item.id} href={`/forum/${item.id}`}>
                <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-xl cursor-pointer transition-all group border border-transparent hover:border-border">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
                    <Bookmark className="h-4 w-4 group-hover:fill-current transition-all" />
                  </div>
                  <span className="text-sm font-bold line-clamp-1">
                    {item.title}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
