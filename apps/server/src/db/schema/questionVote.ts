import {
  integer,
  sqliteTable,
  primaryKey,
  text,
} from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { answer } from "./answer";
import { relations } from "drizzle-orm";
import { question } from "./question";

export const questionVote = sqliteTable(
  "question_vote",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    questionId: text("question_id")
      .notNull()
      .references(() => question.id, { onDelete: "cascade" }),
    value: integer("value").notNull(), // 1 = upvote, -1 = downvote
  },
  (table) => [primaryKey({ columns: [table.userId, table.questionId] })]
);

export const questionVoteRelations = relations(questionVote, ({ one }) => ({
  user: one(user, { fields: [questionVote.userId], references: [user.id] }),
  question: one(question, {
    fields: [questionVote.questionId],
    references: [question.id],
  }),
}));
