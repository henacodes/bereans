import { protectedProcedure, publicProcedure, router } from "@/lib/trpc";
import questionRouter from "./question.router";
import answerRouter from "./answer.router";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
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
