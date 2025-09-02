import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@server/routers";

export type Question = inferProcedureOutput<
  AppRouter["question"]["getQuestionById"]
>;

export type VoteType = "upvote" | "downvote" | "retract";

export type Citation = {
  title: string;
  author?: string | null;
  type: string;
  url?: string | null;
  context?: string | null;
};
