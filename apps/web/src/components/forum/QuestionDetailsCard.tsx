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
    <Card className="w-full mx-auto shadow-md rounded-2xl border  dark:bg-secondary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold ">{title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags &&
            tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className=" text-slate-300 ">
                {tag}
              </Badge>
            ))}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-slate-700 dark:text-slate-400  mb-4">{text}</p>

        <div className="flex items-center justify-between text-sm ">
          <div className="flex items-center gap-4">
            <span>
              Asked by
              <span className="font-medium text-slate-700 mx-3 ">{author}</span>
            </span>
            <span>{new Date(date).toDateString()}</span>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> <span>{views} views</span>
            </div>
          </div>

          {
            <div className="flex gap-2">
              <div
                className={
                  "flex  items-center justify-center  rounded-full  " +
                  (userVoted === 1
                    ? "bg-primary text-slate-500 "
                    : userVoted === -1
                      ? "bg-secondary text-slate-200  "
                      : "bg-slate-200 text-slate-500 ")
                }
              >
                <button
                  disabled={voteMutation.isPending}
                  onClick={() => handleVote("upvote")}
                  className="p-1 relative rounded-full  cursor-pointer transition  ease-in-out hover:bg-slate-300/50 "
                >
                  <ArrowBigUp
                    fill="#fff"
                    fillOpacity={userVoted === 1 ? 1 : 0}
                    strokeWidth={userVoted !== 1 ? 1 : 0}
                    size={28}
                  />
                </button>

                <span className="text-sm font-medium">{totalVotes}</span>

                <button
                  disabled={voteMutation.isPending}
                  onClick={() => handleVote("downvote")}
                  className="p-1 relative rounded-full  cursor-pointer transition  ease-in-out hover:bg-slate-300/50 "
                >
                  <ArrowBigDown
                    fill="#fff"
                    fillOpacity={userVoted === -1 ? 1 : 0}
                    strokeWidth={userVoted !== -1 ? 1 : 0}
                    size={28}
                  />
                </button>
              </div>

              {isSaved != undefined && (
                <Button
                  onClick={handleSave}
                  size="sm"
                  variant="outline"
                  className={
                    "rounded-xl cursor-pointer " +
                    (isQuestionSaved && " bg-slate-300 ")
                  }
                >
                  {isQuestionSaved ? (
                    <>
                      <BookmarkX className="h-4 w-4 mr-1" /> Unsave
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-1" /> Save
                    </>
                  )}
                </Button>
              )}
            </div>
          }
        </div>
      </CardContent>
    </Card>
  );
}
