// lib/server/validation.ts
import { createInsertSchema } from "drizzle-zod";
import { question, answer, citation } from "./schema/";
import z from "zod";

export const CreateQuestionSchema = createInsertSchema(question);
export type CreateQuestionInput = z.infer<typeof CreateQuestionSchema>;

export const CreateAnswerSchema = createInsertSchema(answer);
export type CreateAnswerInput = z.infer<typeof CreateAnswerSchema>;

export const CreateCitationSchema = createInsertSchema(citation).omit({
  id: true,
  answerId: true,
  citedBy: true,
  createdAt: true,
});
