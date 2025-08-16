"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Book } from "lucide-react";
import { defaultTranslation, getBibleBook } from "@/data/bible";
import type { PassageSearchParams, Verse } from "@/types/bible";
import { useState } from "react";
import AlertCard from "../Alert";
import { useQuestionDetail } from "@/stores/useQuestionDetail";
import { fetchPassage } from "@/lib/passage";
import { trpc } from "@/utils/trpc";
import { useTRPCQuery } from "@/hooks/useTRPCQuery";
import { useMutation } from "@tanstack/react-query";
import { useTRPCMutation } from "@/hooks/useTRPCMutation copy";

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

  const handeRetry = async () => {
    //const p = await fetchPassage();
    if (question) {
      setLoading(true);
      const { bookId, chapter, verseStart, verseEnd } = question;

      console.log(question);

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
      <Card className="mb-6 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
            <Book className="h-4 w-4" />
            <span>
              {getBibleBook(parseInt(params.bookId))?.name} {params.chapter}:
              {params.verseStart}
              {params.verseStart !== params.verseEnd && `-${params.verseEnd} `}
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
    );
  } else {
    return (
      <div className=" my-6  ">
        <AlertCard
          variant="destructive"
          title="Failed to Fetch Passage"
          description="Required passage parameters weren't given "
        />
        <Button disabled={loading} className=" my-2" onClick={handeRetry}>
          {" "}
          {passageMutation.isPending ? "Loading ..." : "Retry"}
        </Button>
      </div>
    );
  }
}
