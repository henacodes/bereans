import { db } from "@/db";
import { answer } from "@/db/schema";
import { protectedProcedure, publicProcedure, router } from "@/lib/trpc";
import { CreateAnswerSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";
import z from "zod";

export const answerRouter = router({
  createAnswer: protectedProcedure
    .input(CreateAnswerSchema.omit({ id: true, userId: true }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const [newAnswer] = await db
        .insert(answer)
        .values({
          ...input,
          userId: userId,
        })
        .returning();

      return newAnswer;
    }),
  approveAnswer: protectedProcedure
    .input(z.object({ answerId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      try {
        const foundAnswer = await db.query.answer.findFirst({
          where: eq(answer.id, input.answerId),
          with: {
            question: true,
          },
        });
        if (!foundAnswer) {
          console.error("Can't find the answer");
          return {};
        }
        if (foundAnswer.question.userId != userId) {
          console.error("Only the question author can approve this answer");
          return {};
        }

        await db.transaction(async (tx) => {
          await tx
            .update(answer)
            .set({ approved: false })
            .where(eq(answer.questionId, foundAnswer.questionId));

          await tx
            .update(answer)
            .set({ approved: true })
            .where(eq(answer.id, input.answerId));
        });
      } catch (error) {
        console.error("Failed to find the answer");
        return {};
      }
    }),
});

export default answerRouter;
