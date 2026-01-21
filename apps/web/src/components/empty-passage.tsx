"use client";

import { AlertCircle, ArrowLeft, RefreshCw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface EmptyPassageStateProps {
  title?: string;
  message?: string;
  showBack?: boolean;
}

export default function EmptyPassageState({
  title = "Passage Not Found",
  message = "The required parameters to load this scripture passage are missing. Please verify the link or try again.",
  showBack = true,
}: EmptyPassageStateProps) {
  const router = useRouter();

  return (
    <div className="flex  w-full items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex  p-12 flex-col items-center  ">
        {/* Visual Icon Section */}
        <div className="relative mb-8">
          {/* Subtle background glow */}
          <div className="absolute inset-0 blur-2xl bg-primary/10 rounded-full" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-muted border-2 border-dashed border-muted-foreground/20">
            <BookOpen className="h-10 w-10 text-muted-foreground/60" />
            <div className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-background border shadow-sm">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3 mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-center   ">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed text-center mx-auto">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full sm:flex-row sm:justify-center">
          {showBack && (
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="group flex items-center gap-2 h-11 px-6 border-slate-200 dark:border-slate-800 rounded-md"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Go Back
            </Button>
          )}

          <Button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all active:scale-95 rounded-md"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Load
          </Button>
        </div>

        {/* Subtle Footer Reference */}
        <div className="mt-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-medium">
          <div className="h-px w-8 bg-muted-foreground/20" />
          Acts 17:11 Framework
          <div className="h-px w-8 bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  );
}
