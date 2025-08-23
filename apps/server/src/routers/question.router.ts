import { protectedProcedure, publicProcedure, router } from "@/lib/trpc";
import { z } from "zod";
import { question } from "@/db/schema/question";
import { db } from "@/db/index";
import { and, eq, gte, lte } from "drizzle-orm";
import { CreateQuestionSchema } from "@/lib/validation";
import { handleVote } from "@/utils/vote";
import { savedQuestions, user } from "@/db/schema";

export const questionRouter = router({
  createQuestion: protectedProcedure
    .input(CreateQuestionSchema.omit({ id: true, userId: true }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      try {
        const [newQuestion] = await db
          .insert(question)
          .values({
            ...input,
            userId: userId,
          })
          .returning();

        return newQuestion;
      } catch (error) {
        console.log(error);
      }
    }),
  getQuestionById: publicProcedure
    .input(z.object({ questionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { questionId } = input;
      const userId = ctx.session?.user.id;

      try {
        const foundQuestion = await db.query.question.findFirst({
          where: eq(question.id, questionId),
          with: {
            user: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
            },
            answers: {
              columns: {
                id: true,
                text: true,
                createdAt: true,
                approved: true,
              },
              with: {
                user: {
                  columns: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
            votes: {
              columns: {
                userId: true,
                value: true,
              },
            },
          },
        });

        return foundQuestion;
      } catch (error) {
        throw new Error("Internal Server Error");
      }
    }),
  getQuestions: publicProcedure
    .input(
      z.object({
        bookId: z.number(),
        chapter: z.number().optional(),
        verseStart: z.number().optional(),
        verseEnd: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { bookId, chapter, verseStart, verseEnd } = input;

      const where: any = { bookId };

      if (chapter !== undefined) {
        where.chapter = chapter;

        if (verseStart !== undefined && verseEnd !== undefined) {
          where.verseStart = { lte: verseEnd };
          where.verseEnd = { gte: verseStart };
        }
      }
      const filters = [
        eq(question.bookId, bookId),
        chapter ? eq(question.chapter, chapter) : undefined,
        verseStart !== undefined && verseEnd !== undefined
          ? and(
              lte(question.verseStart, verseEnd),
              gte(question.verseEnd, verseStart)
            )
          : undefined,
      ].filter(Boolean);

      const result = await db.query.question.findMany({
        where: and(...filters),
        with: {
          user: true,
        },
      });

      return result;
    }),

  voteQuestion: protectedProcedure
    .input(
      z.object({
        value: z.union([z.literal(-1), z.literal(0), z.literal(1)]),
        questionId: z.uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { questionId, value } = input;
      console.log(questionId, value);
      try {
        const res = await handleVote({
          userId,
          targetId: questionId,
          target: "question",
          value,
        });

        return res;
      } catch (error) {
        return { error, success: false };
      }
    }),
  addOrRemoveSavedQuestion: protectedProcedure
    .input(z.object({ questionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { questionId } = input;

      try {
        // check if already saved
        const existing = await db.query.savedQuestions.findFirst({
          where: and(
            eq(savedQuestions.userId, userId),
            eq(savedQuestions.questionId, questionId)
          ),
        });

        if (existing) {
          // remove it (unsave)
          await db
            .delete(savedQuestions)
            .where(
              and(
                eq(savedQuestions.userId, userId),
                eq(savedQuestions.questionId, questionId)
              )
            );
          return { saved: false };
        } else {
          // insert (save)
          await db.insert(savedQuestions).values({
            userId,
            questionId,
          });
          return { saved: true };
        }
      } catch (error) {
        console.error(error);
        throw new Error("Couldn't perform the task");
      }
    }),

  savedQuestions: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      const questions = await db.query.savedQuestions.findMany({
        where: eq(savedQuestions.userId, userId),
        with: {
          question: true,
        },
        columns: {
          questionId: true,
        },
      });

      return questions;
    } catch (error) {
      return { error };
    }
  }),
  isQuestionSaved: protectedProcedure
    .input(z.object({ questionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { questionId } = input;
      try {
        let isQuestionSaved = false;

        if (userId) {
          const saved = await db.query.savedQuestions.findFirst({
            where: and(
              eq(savedQuestions.userId, userId),
              eq(savedQuestions.questionId, questionId)
            ),
          });

          if (saved) {
            isQuestionSaved = true;
          }
        }

        return isQuestionSaved;
      } catch (error) {
        return false;
      }
    }),
});

export default questionRouter;
