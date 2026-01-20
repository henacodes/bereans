import {
  integer,
  sqliteTable,
  primaryKey,
  text,
} from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { answer } from "./answer";
import { relations } from "drizzle-orm";

export const answerVote = sqliteTable(
  "answer_vote",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    answerId: text("answer_id")
      .notNull()
      .references(() => answer.id, { onDelete: "cascade" }),
    value: integer("value").notNull(), // 1 = upvote, -1 = downvote
  },
  (table) => [primaryKey({ columns: [table.userId, table.answerId] })]
);

export const answerVoteRelations = relations(answerVote, ({ one }) => ({
  user: one(user, { fields: [answerVote.userId], references: [user.id] }),
  answer: one(answer, {
    fields: [answerVote.answerId],
    references: [answer.id],
  }),
}));
