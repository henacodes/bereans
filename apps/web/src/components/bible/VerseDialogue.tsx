"use client";
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
import { authClient } from "@/lib/auth-client";

export function VerseDialog({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { data: session, isPending } = authClient.useSession();
  const { selectedPassage, open, setOpen } = useVerseDialog();

  if (!selectedPassage?.passage) return null;

  const queryString = objToQueryString(selectedPassage, [
    "bookId",
    "chapter",
    "verseStart",
    "verseEnd",
    "translation",
  ]);

  if (isPending) {
    console.log(isPending);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        Loading
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {session?.user ? (
        <DialogContent className="sm:max-w-175 lg:max-w-225 w-[95vw] max-h-[90vh] overflow-y-auto rounded-lg  ">
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
                <Button variant="outline" className="cursor-pointer ">
                  Already Asked Questions <ChevronRight />
                </Button>
              </a>
              <DialogClose>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <p>
            Please{" "}
            <a href="/login" className=" text-primary hover:underline  ">
              login
            </a>{" "}
            to start asking questions
          </p>
        </DialogContent>
      )}
    </Dialog>
  );
}
