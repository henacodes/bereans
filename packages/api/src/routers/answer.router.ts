import { db } from "@bereans/db";
import { answer, answerVote, citation } from "@bereans/db/schema/index";
import { protectedProcedure, router } from "../index";
import {
  CreateAnswerSchema,
  CreateCitationSchema,
} from "@bereans/db/drizzle-zod";
import { handleVote } from "@bereans/db/services/vote";
import { and, eq, sql } from "drizzle-orm";
import z from "zod";
import { TRPCError } from "@trpc/server";

export const answerRouter = router({
  createAnswer: protectedProcedure
    .input(
      CreateAnswerSchema.omit({ id: true, userId: true }).extend({
        citations: z.array(CreateCitationSchema).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { citations, ...answerData } = input;

      try {
        return await db.transaction(async (tx) => {
          const [newAnswer] = await tx
            .insert(answer)
            .values({
              ...answerData,
              userId: userId,
            })
            .returning();

          // Safety check if returning() fails for some reason
          if (!newAnswer) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create answer record.",
            });
          }

          if (citations && citations.length > 0) {
            await tx.insert(citation).values(
              citations.map((c) => ({
                ...c,
                answerId: newAnswer.id,
                citedBy: userId,
              })),
            );
          }

          return newAnswer;
        });
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        console.error("Error creating answer:", error);

        // Return a formatted error to the client
        throw new TRPCError({
          code: "BAD_REQUEST", // or INTERNAL_SERVER_ERROR depending on the cause
          message: "An unexpected error occurred while saving your answer.",
          cause: error,
        });
      }
    }),

  approveAnswer: protectedProcedure
    .input(z.object({ answerId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      try {
        // 1. Fetch with relation to check ownership
        const foundAnswer = await db.query.answer.findFirst({
          where: eq(answer.id, input.answerId),
          with: {
            question: true,
          },
        });

        // 2. Handle 404 - Not Found
        if (!foundAnswer) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "The answer you are trying to approve does not exist.",
          });
        }

        // 3. Handle 403 - Forbidden (Authorization)
        if (foundAnswer.question.userId !== userId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only the author of the question can approve an answer.",
          });
        }

        // 4. Perform atomic update
        await db.transaction(async (tx) => {
          // Reset all answers for this specific question to unapproved
          await tx
            .update(answer)
            .set({ approved: false })
            .where(eq(answer.questionId, foundAnswer.questionId));

          // Set the chosen answer to approved
          await tx
            .update(answer)
            .set({ approved: true })
            .where(eq(answer.id, input.answerId));
        });

        return { success: true };
      } catch (error) {
        // If it's an error we threw manually (404 or 403), rethrow it so tRPC sends it to client
        if (error instanceof TRPCError) throw error;

        // Log internal database/network errors
        console.error("Approval transaction failed:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update approval status. Please try again later.",
          cause: error,
        });
      }
    }),
  voteAnswer: protectedProcedure
    .input(
      z.object({
        // 1 = upvote, -1 = downvote, 0 = remove vote
        value: z.union([z.literal(-1), z.literal(0), z.literal(1)]),
        answerId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { answerId, value } = input;

      try {
        const res = await handleVote({
          userId,
          targetId: answerId,
          target: "answer",
          value,
        });

        // Handle the case where handleVote might return a failure state
        // instead of throwing (depending on how handleVote is written)
        if (!res) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "The answer you are trying to vote on no longer exists.",
          });
        }

        return res;
      } catch (error) {
        // If handleVote already threw a TRPCError, just pass it through
        if (error instanceof TRPCError) throw error;

        // Log the technical error for your own tracking
        console.error(
          `[VOTE_ERROR]: User ${userId} failed to vote on ${answerId}`,
          error,
        );

        // Throw a user-friendly error for the toast
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to process your vote. Please try again.",
          cause: error, // Helpful for debugging
        });
      }
    }),
});

export default answerRouter;
