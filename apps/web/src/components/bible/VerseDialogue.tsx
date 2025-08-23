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
import { ChevronRight } from "lucide-react";
import { QuestionForm } from "../forum/QuestionForm";
import { objToQueryString } from "@/lib/utils";

export function VerseDialog() {
  const { selectedPassage, open, setOpen } = useVerseDialog();

  if (!selectedPassage?.passage) return null;

  const queryString = objToQueryString(selectedPassage, [
    "bookId",
    "chapter",
    "verseStart",
    "verseEnd",
    "translation",
  ]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Verses {selectedPassage?.verseStart}–{selectedPassage?.verseEnd}
          </DialogTitle>
          <DialogDescription className="mt-2 text-base text-muted-foreground">
            {selectedPassage?.passage && (
              <div>
                {selectedPassage.passage
                  .map((v) => v.text)
                  .join(" ")
                  .slice(0, 300)}
                ...
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <div>
          <QuestionForm />

          <div className="mt-6 flex justify-between">
            <a href={`/excerpt?${queryString}`}>
              <Button variant="outline" className="cursor-pointer">
                Previous Questions <ChevronRight />
              </Button>
            </a>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
