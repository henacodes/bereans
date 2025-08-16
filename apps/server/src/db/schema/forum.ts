import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { sql } from "drizzle-orm";

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

  title: text("title").notNull(),
  text: text("text").notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`),

  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .notNull(),

  upvotes: integer("upvotes").default(0).notNull(),
  downvotes: integer("downvotes").default(0).notNull(),
});

export const answer = sqliteTable("answer", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  text: text("text").notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
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
});
