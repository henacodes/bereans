import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  MessageSquare,
  Eye,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-react";

interface QuestionCardProps {
  title: string;
  text: string;
  tags?: string[];
  author: string;
  date: string;
  views?: number;
}

export default function QuestionCard({
  title,
  text,
  tags = ["Test", "Test 1"],
  author,
  date,
  views = 221,
}: QuestionCardProps) {
  console.log("datewweeeeeeeee", date);
  return (
    <Card className="w-full mx-auto shadow-md rounded-2xl border border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-slate-800">
          {title}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-slate-700 mb-4">{text}</p>

        <div className="flex items-center justify-between text-sm text-slate-500">
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
          <div className="flex gap-2">
            <Button size={"lg"} variant="outline" className="rounded-xl">
              <ArrowBigUp fill="bg-red-400" strokeWidth={0} size={1000} />
              <ArrowBigDown fill="bg-red-400" strokeWidth={0} size={100} />
            </Button>
            <Button size="sm" variant="outline" className="rounded-xl">
              <Bookmark className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
