"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

import Link from "next/link";
import { getBibleBook } from "@/data/bible";

const UserActivity = ({
  questions,
}: {
  questions: {
    id: string;
    title: string;
    bookId: number;
    chapter: number;
    verseStart: number;
    verseEnd: number;
    answers: number;
    upvotes: number;
  }[];
}) => (
  <Card className="col-span-4 lg:col-span-3 rounded-xl  shadow-none">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle className="text-xl font-bold">Recent Questions</CardTitle>
        <CardDescription className="text-xs">
          Your latest contributions to the community.
        </CardDescription>
      </div>
      <Button variant="link" className="text-primary text-xs font-bold">
        <Link href="/questions">View All</Link>
      </Button>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {questions.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center italic">
            No questions asked yet.
          </p>
        )}
        {questions.map((q) => {
          // 1. Resolve the book name using your function
          const book = getBibleBook(q.bookId);

          // 2. Format the verse string correctly
          const bookName = book?.name || `Book ${q.bookId}`;
          const isRange = q.verseEnd && q.verseEnd !== q.verseStart;
          const verseDisplay = isRange
            ? `${bookName} ${q.chapter}:${q.verseStart}-${q.verseEnd}`
            : `${bookName} ${q.chapter}:${q.verseStart}`;

          return (
            <Link key={q.id} href={`/forum/${q.id}` as any}>
              <div className="flex items-center justify-between p-5 border rounded-xl bg-card hover:bg-accent/50 transition-all group my-3 ">
                <div className="space-y-2">
                  <p className="font-bold text-base group-hover:text-primary transition-colors">
                    {q.title}
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Rendered with proper book name and range */}
                    <Badge className="rounded-md  font-mono bg-primary/50 border border-primary text-secondary text-center  ">
                      {verseDisplay}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">
                      {q.answers} answers
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-sm">
                  <TrendingUp className="h-4 w-4" />
                  {q.upvotes}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

export default UserActivity;
