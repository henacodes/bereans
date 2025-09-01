import { trpc } from "@/utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "../../../server/src/routers";

export type Question = inferProcedureOutput<
  AppRouter["question"]["getQuestionById"]
>;

export type Citation = {
  title: string;
  author?: string | null;
  type: string;
  url?: string | null;
  context?: string | null;
};
