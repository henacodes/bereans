"use client";

import * as React from "react";
import { useVerseDialog } from "@/stores/useVerseDialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, HelpCircle, ChevronRight } from "lucide-react";
import { QuestionForm } from "../forum/QuestionForm";

export function VerseDialog() {
  const { selectedPassage, open, setOpen } = useVerseDialog();

  if (!selectedPassage?.passage) return null;

  const numQuestions = 3;
  const numComments = 7;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Verses {selectedPassage?.start}–{selectedPassage?.end}
          </DialogTitle>
          <DialogDescription className="mt-2 text-base text-muted-foreground">
            {selectedPassage?.passage && (
              <p>
                {selectedPassage.passage
                  .map((v) => v.text)
                  .join(" ")
                  .slice(0, 300)}
                ...
              </p>
            )}
          </DialogDescription>
        </DialogHeader>

        <QuestionForm />

        <Separator className="my-4" />

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span>{numQuestions} Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>{numComments} Comments</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="secondary">
            See More <ChevronRight />
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
