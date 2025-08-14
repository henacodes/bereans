import { db } from "@/db";
import { answer } from "@/db/schema";
import { protectedProcedure, publicProcedure, router } from "@/lib/trpc";
import { CreateAnswerSchema } from "@/lib/validation";

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
});

export default answerRouter;
