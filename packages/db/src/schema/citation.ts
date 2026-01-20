import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { answer } from "./answer";

export const citation = sqliteTable("citation", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  answerId: text("answer_id")
    .notNull()
    .references(() => answer.id),
  citedBy: text("cited_by")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  author: text("author"),

  url: text("url"),
  type: text("type").notNull(), // book, article, video
  context: text("context"), // see page 3 or something along the lines
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const citationRelations = relations(citation, ({ one }) => ({
  user: one(user, {
    fields: [citation.citedBy],
    references: [user.id],
  }),
  answer: one(answer, {
    fields: [citation.answerId],
    references: [answer.id],
  }),
}));
