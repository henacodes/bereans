import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  MessageSquare,
  Eye,
  ArrowBigUp,
  ArrowBigDown,
  BookmarkX,
} from "lucide-react";
import { trpc } from "@/utils/trpc";
import { useTRPCMutation } from "@/hooks/useTRPCMutation";
import { useState } from "react";
import type { VoteType } from "@bereans/api/types/forum";

type QuestionCardProps = {
  id: string;
  title: string;
  text: string;
  tags?: string[] | null;
  author: string;
  date: string;
  views?: number;
  votes: {
    userId: string;
    value: number;
  }[];
  userId: string | undefined;
  isSaved: boolean | undefined;
  isLoggedIn: boolean;
};

export default function QuestionDetailsCard({
  id,
  title,
  text,
  tags,
  author,
  date,
  votes,
  userId,
  isSaved,
  views,
  isLoggedIn,
}: QuestionCardProps) {
  const voteMutation = useTRPCMutation(trpc.question.voteQuestion);
  const savedQuestionMutation = useTRPCMutation(
    trpc.question.addOrRemoveSavedQuestion,
  );

  const [totalVotes, setTotalVotes] = useState(
    votes.reduce((sum, v) => sum + v.value, 0),
  );
  const [userVoted, setUserVoted] = useState(() => {
    const userVote = votes.find((v) => v.userId === userId);
    return userVote ? userVote.value : 0;
  });

  const [isQuestionSaved, setIsQuestionSaved] = useState<boolean>(
    isSaved != undefined ? isSaved : false,
  );

  const handleSave = () => {
    savedQuestionMutation.mutate(
      { questionId: id },
      {
        onSuccess() {
          setIsQuestionSaved(!isQuestionSaved);
        },
      },
    );
  };

  const handleVote = (voteType: VoteType) => {
    if (!isLoggedIn) return;
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
        questionId: id,
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
    <Card className="w-full mx-auto shadow-none rounded-2xl    dark:bg-secondary/20">
      <CardHeader className="pb-2">
        <CardTitle className=" font-semibold text-secondary text-5xl font-playfair dark:text-primary ">
          {title}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags &&
            tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className=" text-secondary rounded-md bg-slate-200 p-3 "
              >
                {tag.toUpperCase()}
              </Badge>
            ))}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-slate-700 dark:text-slate-400  mb-4 text-lg  ">
          {text}
        </p>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
          {/* Left Side: Metadata */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center">
              Asked by
              <span className="font-medium text-slate-700 ml-2 mr-3">
                {author}
              </span>
            </span>
            <span className="text-slate-500">
              {new Date(date).toDateString()}
            </span>
            <div className="flex items-center gap-1 text-slate-500">
              <Eye className="h-4 w-4" />
              <span>{views} views</span>
            </div>
          </div>

          {/* Right Side: Actions (Voting & Saving) */}
          <div className="flex items-center gap-2">
            <div
              className={
                "flex items-center justify-center rounded-full p-1 " +
                (userVoted === 1
                  ? "bg-primary text-slate-500 "
                  : userVoted === -1
                    ? "bg-secondary text-slate-200 "
                    : "bg-slate-100 text-slate-500 ")
              }
            >
              <button
                disabled={voteMutation.isPending}
                onClick={() => handleVote("upvote")}
                className="p-1 relative rounded-full cursor-pointer transition ease-in-out hover:bg-slate-300/50"
              >
                <ArrowBigUp
                  fill="#fff"
                  fillOpacity={userVoted === 1 ? 1 : 0}
                  strokeWidth={userVoted !== 1 ? 1 : 0}
                  size={24} // Reduced slightly for better mobile fit
                />
              </button>

              <span className="text-sm font-bold px-1">{totalVotes}</span>

              <button
                disabled={voteMutation.isPending}
                onClick={() => handleVote("downvote")}
                className="p-1 relative rounded-full cursor-pointer transition ease-in-out hover:bg-slate-300/50"
              >
                <ArrowBigDown
                  fill="#fff"
                  fillOpacity={userVoted === -1 ? 1 : 0}
                  strokeWidth={userVoted !== -1 ? 1 : 0}
                  size={24}
                />
              </button>
            </div>

            {isSaved !== undefined && (
              <Button
                onClick={handleSave}
                size="sm"
                variant="outline"
                className={
                  "rounded-full cursor-pointer " +
                  (isQuestionSaved ? " bg-slate-200 " : "")
                }
              >
                {isQuestionSaved ? (
                  <BookmarkX className="h-4 w-4" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
                <span className="ml-1">
                  {isQuestionSaved ? "Unsave" : "Save"}
                </span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
