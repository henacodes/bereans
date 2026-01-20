import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { answer } from "./answer";
import { questionVote } from "./questionVote";

export const question = sqliteTable("question", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  bookId: integer("book_id").notNull(),
  chapter: integer("chapter").notNull(),
  verseStart: integer("verse_start").notNull(),
  verseEnd: integer("verse_end").notNull(),
  translation: text("translation").notNull(),

  title: text("title").notNull(),
  text: text("text").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .notNull(),

  upvotes: integer("upvotes").default(0).notNull(),
  downvotes: integer("downvotes").default(0).notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
  views: integer("views").default(0).notNull(),
});

export const questionRelations = relations(question, ({ one, many }) => ({
  user: one(user, {
    fields: [question.userId],
    references: [user.id],
  }),
  answers: many(answer),
  votes: many(questionVote),
}));
