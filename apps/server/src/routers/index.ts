import { protectedProcedure, publicProcedure, router } from "@/lib/trpc";
import questionRouter from "./question.router";
import answerRouter from "./answer.router";
import z from "zod";

export const appRouter = router({
  healthCheck: publicProcedure
    .input(z.object({ hello: z.string() }))
    .query(() => {
      return "OK";
    }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),

  question: questionRouter,
  answer: answerRouter,
});
export type AppRouter = typeof appRouter;
