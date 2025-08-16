// lib/server/validation.ts
import { createInsertSchema } from "drizzle-zod/";
import { question, answer } from "@/db/schema/";
import z from "zod";

export const CreateQuestionSchema = createInsertSchema(question);
export type CreateQuestionInput = z.infer<typeof CreateQuestionSchema>;

export const CreateAnswerSchema = createInsertSchema(answer);
export type CreateAnswerInput = z.infer<typeof CreateAnswerSchema>;
