import { db } from "@bereans/db";
import {
  answer,
  answerVote,
  question,
  savedQuestions,
} from "@bereans/db/schema/index";
import { protectedProcedure, router } from "../index";
import { eq, sql, desc, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const dashboardRouter = router({
  getSummary: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      // Fetching all dashboard requirements in parallel
      const [userQuestions, userAnswers, userSaved, voteStats] =
        await Promise.all([
          // 1. Recent Questions asked by the user
          db.query.question.findMany({
            where: eq(question.userId, userId),
            orderBy: [desc(question.createdAt)],
            with: {
              answers: {
                columns: { id: true },
              },
            },
          }),

          // 2. Recent Answers provided by the user
          db.query.answer.findMany({
            where: eq(answer.userId, userId),
            orderBy: [desc(answer.createdAt)],
            with: {
              question: {
                columns: { title: true },
              },
              citations: {
                columns: { id: true },
              },
            },
          }),

          // 3. Saved Questions for the sidebar
          db.query.savedQuestions.findMany({
            where: eq(savedQuestions.userId, userId),
            with: {
              question: {
                columns: { id: true, title: true },
              },
            },
          }),

          // 4. Aggregating Upvotes across all user's answers
          db
            .select({
              count: sql<number>`count(*)`.mapWith(Number),
            })
            .from(answerVote)
            .innerJoin(answer, eq(answerVote.answerId, answer.id))
            .where(and(eq(answer.userId, userId), eq(answerVote.value, 1))),
        ]);

      // Map the database results into the clean format your UI expects
      return {
        stats: [
          {
            label: "Questions Asked",
            value: userQuestions.length.toString(),
            variant: "blue",
            icon: "BookOpen", // Matches the key in StatsGrid
          },
          {
            label: "Answers Given",
            value: userAnswers.length.toString(),
            variant: "emerald",
            icon: "MessageSquare", // Matches the key in StatsGrid
          },
          {
            label: "Total Upvotes",
            value: (voteStats[0]?.count || 0).toString(),
            variant: "orange",
            icon: "ArrowUpCircle", // Matches the key in StatsGrid
          },
          {
            label: "Saved Passages",
            value: userSaved.length.toString(),
            variant: "purple",
            icon: "Bookmark", // Matches the key in StatsGrid
          },
        ],
        recentQuestions: userQuestions.map((q) => ({
          id: q.id,
          title: q.title,
          // Pass raw numeric data for the client to process
          bookId: q.bookId,
          chapter: q.chapter,
          verseStart: q.verseStart,
          verseEnd: q.verseEnd,
          answers: q.answers.length,
          upvotes: q.upvotes,
        })),
        recentAnswers: userAnswers.map((a) => ({
          id: a.id,
          questionTitle: a.question.title,
          preview:
            a.text.length > 80 ? a.text.substring(0, 80) + "..." : a.text,
          citations: a.citations.length,
          status: a.approved ? "Approved" : "Published",
        })),
        savedItems: userSaved.map((s) => ({
          id: s.question.id,
          title: s.question.title,
        })),
      };
    } catch (error) {
      console.error("Dashboard Procedure Error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to load dashboard overview.",
      });
    }
  }),
});
