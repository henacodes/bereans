import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowBigUp, ArrowBigDown } from "lucide-react";

interface AnswerCardProps {
  content: string;
  author: string;
  date: string;
  votes: number;
  accepted?: boolean;
}

export function AnswerCard({
  content,
  author,
  date,
  votes,
  accepted,
}: AnswerCardProps) {
  return (
    <Card className="w-full mx-auto shadow-sm rounded-2xl border border-slate-200">
      <CardHeader className="pb-2 flex justify-between items-center">
        <div className="text-sm text-slate-500">
          Answered by
          <span className="font-medium text-slate-700 mx-1 ">
            {author}
          </span> • {new Date(date).toDateString()}
        </div>
        {accepted && (
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <CheckCircle className="h-4 w-4" /> Accepted
          </div>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-slate-700 mb-4">{content}</p>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center ">
            <Button variant="ghost" className=" ">
              <ArrowBigUp fill="bg-red-400" strokeWidth={0} size={100} />
            </Button>
            <Button size={"icon"} variant={"ghost"} className="size-8">
              <ArrowBigDown fill="bg-red-400" strokeWidth={0} size={100} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
