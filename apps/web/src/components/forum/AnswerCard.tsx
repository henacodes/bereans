"use client";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  LoaderCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { trpc } from "@/utils/trpc";
import { useTRPCMutation } from "@/hooks/useTRPCMutation";
import type { Citation, VoteType } from "@bereans/api/types/forum";
import { CitedComponent } from "./CitedComponent";
import { useState } from "react";

type BetterAuthUser = {
  id: string;
  name: string;
  image: string | null;
};

type AnswerCardProps = {
  text: string;
  id: string;
  author: BetterAuthUser;
  createdAt: string;
  votes: { userId: string; value: number }[];
  approved: boolean;
  userId: string | undefined;
  asker: BetterAuthUser;
  setApprovedAnswer: (newState: any) => void;
  approvedAnswer: string | null;
  citations?: Citation[];
};

export function AnswerCard({
  text,
  id,
  author,
  createdAt,
  votes,
  approved,
  setApprovedAnswer,
  userId,
  asker,
  approvedAnswer,
  citations,
}: AnswerCardProps) {
  const approveAnswerMutation = useTRPCMutation(trpc.answer.approveAnswer);
  const voteMutation = useTRPCMutation(trpc.answer.voteAnswer);

  const [totalVotes, setTotalVotes] = useState(
    votes.reduce((sum, v) => sum + v.value, 0),
  );
  const [userVoted, setUserVoted] = useState(() => {
    const userVote = votes.find((v) => v.userId === userId);
    return userVote ? userVote.value : 0;
  });

  const handleApprove = () => {
    approveAnswerMutation.mutate(
      { answerId: id },
      {
        onSuccess() {
          console.log("approved");
          setApprovedAnswer(id);
        },
      },
    );
  };

  const handleVote = (voteType: VoteType) => {
    const voteValue =
      voteType === "upvote"
        ? userVoted === 1
          ? 0
          : 1
        : voteType === "downvote"
          ? userVoted === -1
            ? 0
            : -1
          : 0;

    voteMutation.mutate(
      {
        value: voteValue,
        answerId: id,
      },
      {
        onSuccess: (data) => {
          setUserVoted(voteValue);
          if (data.updatedRow) {
            const { upvotes, downvotes } = data.updatedRow[0];
            setTotalVotes(upvotes - downvotes);
          }
        },
      },
    );
  };
  return (
    <div className="mb-4">
      <div className="flex gap-4">
        {/* Vote Sidebar */}
        <div className="flex flex-col items-center py-2 px-1 ">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleVote("upvote")}
          >
            <ChevronUp
              className={
                "w-5 h-5  " + (userVoted === 1 && " text-primary font-bold   ")
              }
            />
          </Button>
          <span className="text-sm font-medium">{totalVotes}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleVote("downvote")}
          >
            <ChevronDown
              className={
                "w-5 h-5  " + (userVoted === -1 && " text-destructive ")
              }
            />
          </Button>
        </div>

        {/* Answer Content */}
        <div className="flex-1">
          <div className="pb-2 flex justify-between items-center">
            <div className="text-sm text-slate-500">
              Answered by
              <span className="font-medium text-slate-700 mx-1">
                {author.name}
              </span>
              • {new Date(createdAt).toDateString()}
            </div>

            <div className="flex items-center gap-3">
              {asker.id === author.id && <small>Asker</small>}

              {approvedAnswer === id && (
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <CheckCircle className="h-4 w-4" /> Approved
                </div>
              )}

              {(!approvedAnswer || approvedAnswer !== id) &&
                userId === asker.id && (
                  <Button
                    disabled={approveAnswerMutation.isPending}
                    variant="ghost"
                    className="text-sm"
                    onClick={handleApprove}
                  >
                    {approveAnswerMutation.isPending ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Approve"
                    )}
                  </Button>
                )}
            </div>
          </div>

          <CardContent className="p-0">
            <p className="text-slate-700 dark:text-slate-300 mb-4">{text}</p>

            {/* Citations */}
            {citations && citations.length > 0 && (
              <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                <h4 className="text-sm font-semibold text-slate-600 mb-2">
                  Sources
                </h4>
                <ul className="space-y-2 list-disc list-inside text-slate-700 dark:text-slate-300 text-sm">
                  {citations.map((c, i) => (
                    <CitedComponent citation={c} k={i} />
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </div>
  );
}
