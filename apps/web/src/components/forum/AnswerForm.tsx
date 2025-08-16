"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useTRPCMutation } from "@/hooks/useTRPCMutation";

export function AnswerForm({ questionId }: { questionId: string }) {
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const answerMutation = useTRPCMutation(trpc.answer.createAnswer);

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("asnwerinnnnn");

    const body = {
      questionId,
      text: answer,
    };

    answerMutation.mutate(body);
  };

  if (answerMutation.isPending) {
    console.log("Pendinnnnnnnnnnnng");
  }

  if (answerMutation.isSuccess) {
    console.log("SUCESSSSSSSSSSSS");
    console.log(answerMutation.data);
  }

  if (answerMutation.isError) {
    console.log("errrorrrr");
  }

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-800">Your Answer</h3>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label
              htmlFor="answer"
              className="text-sm font-medium text-slate-700"
            >
              Share your insights about this verse and question
            </Label>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              id="answer"
              placeholder="Write your answer here..."
              className="mt-2 min-h-[120px] border-slate-200 focus:border-blue-300 focus:ring-blue-200"
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">
              Please ensure your answer is biblically & historically grounded
              and helpful to the community.
            </p>
            <Button
              onClick={submitAnswer}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Post Answer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
