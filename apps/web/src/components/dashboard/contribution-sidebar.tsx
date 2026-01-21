"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

const ContributionSidebar = ({
  answers,
}: {
  answers: {
    id: string;
    questionTitle: string;
    preview: string;
    citations: number;
    status: string;
  }[];
}) => (
  <Card className="col-span-4 lg:col-span-1 rounded-xl border shadow-sm">
    <CardHeader>
      <CardTitle className="text-xl font-bold">Your Answers</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[450px] pr-4">
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-2 before:w-px before:bg-border">
          {answers.length === 0 && (
            <p className="text-xs text-muted-foreground text-center">
              No answers given yet.
            </p>
          )}
          {answers.map((a) => (
            <div key={a.id} className="relative pl-8 space-y-2">
              {/* Timeline Indicator */}
              <div
                className={cn(
                  "absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-background shadow-sm",
                  a.status === "Approved" ? "bg-emerald-500" : "bg-slate-300",
                )}
              />

              <p className="text-sm font-bold leading-tight line-clamp-2">
                {a.questionTitle}
              </p>
              <p className="text-xs text-muted-foreground italic line-clamp-2 leading-relaxed">
                "{a.preview}"
              </p>

              <div className="flex items-center justify-between pt-1">
                <Badge
                  variant={a.status === "Approved" ? "default" : "outline"}
                  className={cn(
                    "text-[9px] uppercase tracking-tighter px-2 py-0 h-5 font-black rounded-full",
                    a.status === "Approved"
                      ? "bg-emerald-500/10 text-emerald-600 border-none"
                      : "text-muted-foreground",
                  )}
                >
                  {a.status}
                </Badge>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-bold">
                  <ExternalLink className="h-3 w-3" /> {a.citations} Citations
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);

export default ContributionSidebar;
