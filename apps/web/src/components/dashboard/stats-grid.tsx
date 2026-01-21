"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, ArrowUpCircle, Bookmark } from "lucide-react";

import { cn } from "@/lib/utils";
const StatsGrid = ({
  stats,
}: {
  stats: {
    label: string;
    value: string;
    variant: string;
    icon: string;
  }[];
}) => {
  const icons: Record<string, any> = {
    BookOpen,
    MessageSquare,
    ArrowUpCircle,
    Bookmark,
  };

  // Border accents
  const borderColors: Record<string, string> = {
    blue: "border-b-4 border-b-blue-500/20",
    emerald: "border-b-4 border-b-emerald-500/20",
    orange: "border-b-4 border-b-orange-500/20",
    purple: "border-b-4 border-b-purple-500/20",
  };

  // Icon container and stroke colors
  const iconStyles: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = icons[stat.icon] || BookOpen;
        return (
          <Card
            key={stat.label}
            className={cn(
              "rounded-xl shadow-none border transition-all hover:bg-accent/5",
              borderColors[stat.variant],
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </CardTitle>
              {/* Colored icon container */}
              <div className={cn("p-2 rounded-lg", iconStyles[stat.variant])}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tight">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsGrid;
