import { sqliteTable, AnySQLiteColumn, foreignKey, text, integer, uniqueIndex, primaryKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const account = sqliteTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at"),
	refreshTokenExpiresAt: integer("refresh_token_expires_at"),
	scope: text(),
	password: text(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
});

export const session = sqliteTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: integer("expires_at").notNull(),
	token: text().notNull(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id),
},
(table) => [
	uniqueIndex("session_token_unique").on(table.token),
]);

export const user = sqliteTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: integer("email_verified").notNull(),
	image: text(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
},
(table) => [
	uniqueIndex("user_email_unique").on(table.email),
]);

export const verification = sqliteTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer("expires_at").notNull(),
	createdAt: integer("created_at"),
	updatedAt: integer("updated_at"),
});

export const question = sqliteTable("question", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	bookId: integer("book_id").notNull(),
	chapter: integer().notNull(),
	verseStart: integer("verse_start").notNull(),
	verseEnd: integer("verse_end").notNull(),
	title: text().notNull(),
	text: text().notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
	updatedAt: integer("updated_at").notNull(),
	upvotes: integer().default(0).notNull(),
	downvotes: integer().default(0).notNull(),
	tags: text(),
	views: integer().default(0).notNull(),
	translation: text().notNull(),
});

export const answer = sqliteTable("answer", {
	id: text().primaryKey().notNull(),
	text: text().notNull(),
	createdAt: text("created_at").default("sql`(current_timestamp)`").notNull(),
	updatedAt: integer("updated_at").notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	questionId: text("question_id").notNull().references(() => question.id, { onDelete: "cascade" } ),
	upvotes: integer().default(0).notNull(),
	downvotes: integer().default(0).notNull(),
	approved: integer().notNull(),
});

export const answerVote = sqliteTable("answer_vote", {
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	answerId: text("answer_id").notNull().references(() => answer.id, { onDelete: "cascade" } ),
	value: integer().notNull(),
},
(table) => [
	primaryKey({ columns: [table.userId, table.answerId], name: "answer_vote_user_id_answer_id_pk"})
]);

export const questionVote = sqliteTable("question_vote", {
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	questionId: text("question_id").notNull().references(() => question.id, { onDelete: "cascade" } ),
	value: integer().notNull(),
},
(table) => [
	primaryKey({ columns: [table.userId, table.questionId], name: "question_vote_user_id_question_id_pk"})
]);

export const savedQuestions = sqliteTable("saved_questions", {
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	questionId: text("question_id").notNull().references(() => question.id, { onDelete: "cascade" } ),
});

export const citation = sqliteTable("citation", {
	id: text().primaryKey().notNull(),
	answerId: text("answer_id").notNull().references(() => answer.id),
	citedBy: text("cited_by").notNull().references(() => user.id, { onDelete: "cascade" } ),
	title: text().notNull(),
	author: text(),
	url: text(),
	type: text().notNull(),
	context: text(),
	createdAt: text("created_at").default("sql`(current_timestamp)`").notNull(),
});

