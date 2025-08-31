import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ArrowBigUp,
  ArrowBigDown,
  Check,
  LoaderCircle,
} from "lucide-react";
import { trpc } from "@/utils/trpc";
import { useTRPCMutation } from "@/hooks/useTRPCMutation copy";

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
  votes: number;
  approved: boolean;
  userId: string | undefined;
  asker: BetterAuthUser;
  setApprovedAnswer: (newState: any) => void;
  approvedAnswer: string | null;
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
}: AnswerCardProps) {
  const approveAnswerMutation = useTRPCMutation(trpc.answer.approveAnswer);

  const handleApprove = () => {
    approveAnswerMutation.mutate(
      { answerId: id },
      {
        onSuccess() {
          console.log("approved");
          setApprovedAnswer(id);
        },
      }
    );
  };
  return (
    <Card className="w-full mx-auto shadow-sm rounded-2xl border border-slate-200/20 dark:bg-secondary/20">
      <CardHeader className="pb-2 flex justify-between items-center">
        <div className="text-sm text-slate-500">
          Answered by
          <span className="font-medium text-slate-700 mx-1 ">
            {author.name}
          </span>
          • {new Date(createdAt).toDateString()}
        </div>
        <div className=" flex items-center gap-3  ">
          {asker.id == author.id && <small className="  ">Asker</small>}
          {approvedAnswer == id && (
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium ">
              <CheckCircle className="h-4 w-4" /> Approved
            </div>
          )}

          {(!approvedAnswer || approvedAnswer != id) && userId == asker.id && (
            <Button
              disabled={approveAnswerMutation.isPending}
              variant={"ghost"}
              className=" text-sm "
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
      </CardHeader>

      <CardContent>
        <p className="text-slate-700 mb-4">{text}</p>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Button variant="ghost">
              <ArrowBigUp fill="bg-red-400" strokeWidth={0} size={100} />
            </Button>
            <Button size="icon" variant="ghost">
              <ArrowBigDown fill="bg-red-400" strokeWidth={0} size={100} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
