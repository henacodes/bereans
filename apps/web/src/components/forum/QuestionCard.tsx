import { ChevronUp, ChevronDown, Calendar, MessageSquare } from "lucide-react";
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
    <Card className="p-6 border border-border/40 bg-card/50 hover:bg-accent/5 transition-all duration-300 rounded-[2rem] shadow-none">
      <div className="flex gap-6">
        {/* Left Side: Clean Vote Section */}
        <div className="flex flex-col items-center justify-start pt-1 gap-1">
          <Button
            disabled={true}
            variant="ghost"
            size="icon"
            className="h-7 w-7 p-0 text-muted-foreground/50"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
          <span className="text-sm font-bold tabular-nums text-foreground/80">
            {upvotes - downvotes}
          </span>
          <Button
            disabled={true}
            variant="ghost"
            size="icon"
            className="h-7 w-7 p-0 text-muted-foreground/50"
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>

        {/* Right Side: Content Area */}
        <div className="flex-1">
          <div className="space-y-1 mb-4">
            <h3 className="text-xl font-bold tracking-tight uppercase">
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
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 italic ">
              {text}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <div className="flex items-center gap-4">
              {/* User Identity - Green-tinted theme */}
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7 border-2 border-background">
                  <AvatarFallback className="text-[10px] bg-[#82C3A1] text-[#1E3A2B] font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wide">
                  {user.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatTimestamp(createdAt.toString())}</span>
              </div>
            </div>

            {/* Answer Badge - Green background like the excerpt card */}
            <Badge className="rounded-lg px-3 py-1 bg-[#82C3A1] hover:bg-[#82C3A1]/90 text-[#1E3A2B] border-none flex items-center gap-2 shadow-sm">
              <MessageSquare className="h-3.5 w-3.5 fill-current" />
              <span className="font-bold text-xs">
                {`${totalAnswers}` || "0"}
              </span>
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
