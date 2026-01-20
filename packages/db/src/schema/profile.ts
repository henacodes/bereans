import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { question } from "./question";
import { relations } from "drizzle-orm";

export const savedQuestions = sqliteTable("saved_questions", {
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  questionId: text("question_id")
    .notNull()
    .references(() => question.id, { onDelete: "cascade" }),
});

export const savedQuestionsRelations = relations(savedQuestions, ({ one }) => ({
  user: one(user, {
    fields: [savedQuestions.userId],
    references: [user.id],
  }),
  question: one(question, {
    fields: [savedQuestions.questionId],
    references: [question.id],
  }),
}));
