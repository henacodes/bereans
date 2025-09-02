import { protectedProcedure, publicProcedure, router } from "@server/lib/trpc";
import questionRouter from "./question.router";
import answerRouter from "./answer.router";
import z from "zod";
import { bibleRouter } from "./bible.router";

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
  bible: bibleRouter,
});
export type AppRouter = typeof appRouter;
