import {
  ChevronUp,
  ChevronDown,
  Calendar,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { objToQueryString } from "@/lib/utils";
import { formatTimestamp } from "@/lib/utils";

interface QuestionCardProps {
  id: string;
  title: string;
  text: string;
  upvotes: number;
  downvotes: number;
  bookId: number;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  translation: string;
  createdAt: string | Date;
  user: {
    name: string;
  };
  totalAnswers?: unknown;
}

export default function QuestionCard({
  id,
  title,
  text,
  upvotes,
  downvotes,
  bookId,
  chapter,
  verseStart,
  verseEnd,
  translation,
  createdAt,
  user,
  totalAnswers,
}: QuestionCardProps) {
  return (
    <Card className="p-6   dark:bg-secondary/20     ">
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <Button
            disabled={true}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-slate-100"
          >
            <ChevronUp className="h-4 w-4 text-slate-400" />
          </Button>
          <span className="text-sm font-medium text-slate-700">
            {upvotes - downvotes}
          </span>
          <Button
            disabled={true}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-slate-100"
          >
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </Button>
        </div>

        {/* Question Content */}
        <div className="flex-1">
          <h3 className="text-lg font-medium  mb-2 hover:text-primary transition-colors">
            <a
              href={`/forum/${id}?${objToQueryString(
                {
                  bookId,
                  chapter,
                  verseStart,
                  verseEnd,
                  translation: translation || "ESV",
                },
                ["bookId", "chapter", "verseStart", "verseEnd", "translation"],
              )}`}
              className="flex gap-2 items-center"
            >
              {title} <ExternalLink size={15} />
            </a>
          </h3>
          <p className="text-slate-400 mb-4 line-clamp-2">{text}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-slate-200">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-slate-400">{user.name}</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Calendar className="h-3 w-3" />
                {formatTimestamp(createdAt.toString())}
              </div>
            </div>

            <Badge variant="default" className=" ">
              <MessageSquare className="h-3 w-3 mr-1" />
              {`${totalAnswers}` || "0"} answers
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
