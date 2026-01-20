"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, LoaderCircle } from "lucide-react";
import { defaultTranslation, getBibleBook } from "@/data/bible";
import type { PassageSearchParams, Verse } from "@bereans/api/types/bible";
import { useState } from "react";
import AlertCard from "../alert";
import { useQuestionDetail } from "@/stores/useQuestionDetail";
import { trpc } from "@/utils/trpc";

import { useTRPCMutation } from "@/hooks/useTRPCMutation";

export default function ExcerptCard({
  searchParams,
  serverFetchedPassage,
}: {
  searchParams: PassageSearchParams;
  serverFetchedPassage: any;
}) {
  const [params, setParams] = useState(searchParams);
  const [passage, setPassage] = useState(serverFetchedPassage);

  const [loading, setLoading] = useState(false);
  const { question } = useQuestionDetail();

  const passageMutation = useTRPCMutation(trpc.bible.getPassage);

  const handleRetry = async () => {
    if (question) {
      setLoading(true);
      const { bookId, chapter, verseStart, verseEnd } = question;

      const newParams = {
        bookId: bookId.toString(),
        chapter: chapter.toString(),
        verseStart: verseStart.toString(),
        verseEnd: verseEnd.toString(),
        translation: defaultTranslation,
      };
      setParams(newParams);

      try {
        const data = await new Promise((resolve, reject) => {
          passageMutation.mutate(newParams, {
            onSuccess: resolve,
            onError: reject,
          });
        });
        setPassage(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (params.bookId && passage.length) {
    return (
      <>
        <Card className="mb-6 border-0 shadow-sm bg-primary ">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Book className="h-4 w-4" />
              <span>
                {getBibleBook(parseInt(params.bookId))?.name} {params.chapter}:
                {params.verseStart}
                {params.verseStart !== params.verseEnd &&
                  `-${params.verseEnd} `}
              </span>
            </div>
            <blockquote className="text-base text-slate-800 font-medium">
              {passage[0].map((v: Verse) => (
                <span key={v.pk}>
                  <b className=" text-lg ">{v.verse}</b> {v.text}
                </span>
              ))}
            </blockquote>
          </CardContent>
        </Card>
      </>
    );
  } else {
    return (
      <div className=" my-6  ">
        <AlertCard
          variant="destructive"
          title="Failed to Fetch Passage"
          description="Required passage parameters weren't given "
        />
        <Button disabled={loading} className=" my-2" onClick={handleRetry}>
          {passageMutation.isPending ? (
            <>
              {" "}
              Loading <LoaderCircle className="animate-spin" />
            </>
          ) : (
            "Retry"
          )}
        </Button>
      </div>
    );
  }
}
