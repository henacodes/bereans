import { trpc } from "@/utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "../../../server/src/routers";

export type Question = inferProcedureOutput<
  AppRouter["question"]["getQuestionById"]
>;
