import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { question } from "./question";
import { answerVote } from "./answerVote";
import { citation } from "./citation";

export const answer = sqliteTable("answer", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  text: text("text").notNull(),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),

  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  questionId: text("question_id")
    .notNull()
    .references(() => question.id, { onDelete: "cascade" }),

  upvotes: integer("upvotes").default(0).notNull(),
  downvotes: integer("downvotes").default(0).notNull(),
  approved: integer("approved", { mode: "boolean" }).default(false).notNull(),
});

export const answerRelations = relations(answer, ({ one, many }) => ({
  user: one(user, {
    fields: [answer.userId],
    references: [user.id],
  }),
  question: one(question, {
    fields: [answer.questionId],
    references: [question.id],
  }),
  citations: many(citation),
  votes: many(answerVote),
}));
