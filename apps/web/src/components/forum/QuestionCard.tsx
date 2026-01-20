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
    <Card className="p-5 border-none bg-card shadow-sm hover:bg-accent/40 transition-colors">
      <div className="flex gap-4">
        {/* Vote Section: Stacked vertically on the left */}
        <div className="flex flex-col items-center gap-0.5">
          <Button
            disabled={true}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          </Button>
          <span className="text-sm font-bold text-foreground">
            {upvotes - downvotes}
          </span>
          <Button
            disabled={true}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        {/* Question Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold leading-tight">
              <a
                href={`/forum/${id}?${objToQueryString(
                  {
                    bookId,
                    chapter,
                    verseStart,
                    verseEnd,
                    translation: translation || "ESV",
                  },
                  [
                    "bookId",
                    "chapter",
                    "verseStart",
                    "verseEnd",
                    "translation",
                  ],
                )}`}
                className="hover:text-primary transition-colors"
              >
                {title}
              </a>
            </h3>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {text}
          </p>

          <hr className=" my-5  " />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-4">
              {/* User Section */}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px] bg-secondary  text-white dark:text-secondary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-muted-foreground">
                  {user.name}
                </span>
              </div>

              {/* Timestamp Section */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {formatTimestamp(createdAt.toString())}
              </div>
            </div>

            {/* Answer Badge */}
            <Badge
              variant="secondary"
              className="rounded-md px-2 py-0.5 flex items-center gap-1.5 font-medium text-white dark:text-primary"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              {`${totalAnswers}` || "0"}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
