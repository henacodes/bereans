import { protectedProcedure, publicProcedure, router } from "@/lib/trpc";
import { z } from "zod";
import { question } from "@/db/schema/forum";
import { db } from "@/db/index";
import { and, eq, gte, lte } from "drizzle-orm";
import { CreateQuestionSchema } from "@/lib/validation";

const selectedUserColumns = {
  id: true,
  name: true,
  image: true,
};

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
    .query(async ({ input }) => {
      const { questionId } = input;
      try {
        const foundQuestion = await db.query.question.findFirst({
          where: eq(question.id, questionId),
          with: {
            user: {
              columns: {
                name: true,
                image: true,
              },
            },
            answers: {
              columns: {
                id: true,
                text: true,
                createdAt: true,
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
});

export default questionRouter;
