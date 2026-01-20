import { relations } from "drizzle-orm/relations";
import { user, account, session, question, answer, answerVote, questionVote, savedQuestions, citation } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	questions: many(question),
	answers: many(answer),
	answerVotes: many(answerVote),
	questionVotes: many(questionVote),
	savedQuestions: many(savedQuestions),
	citations: many(citation),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const questionRelations = relations(question, ({one, many}) => ({
	user: one(user, {
		fields: [question.userId],
		references: [user.id]
	}),
	answers: many(answer),
	questionVotes: many(questionVote),
	savedQuestions: many(savedQuestions),
}));

export const answerRelations = relations(answer, ({one, many}) => ({
	question: one(question, {
		fields: [answer.questionId],
		references: [question.id]
	}),
	user: one(user, {
		fields: [answer.userId],
		references: [user.id]
	}),
	answerVotes: many(answerVote),
	citations: many(citation),
}));

export const answerVoteRelations = relations(answerVote, ({one}) => ({
	answer: one(answer, {
		fields: [answerVote.answerId],
		references: [answer.id]
	}),
	user: one(user, {
		fields: [answerVote.userId],
		references: [user.id]
	}),
}));

export const questionVoteRelations = relations(questionVote, ({one}) => ({
	question: one(question, {
		fields: [questionVote.questionId],
		references: [question.id]
	}),
	user: one(user, {
		fields: [questionVote.userId],
		references: [user.id]
	}),
}));

export const savedQuestionsRelations = relations(savedQuestions, ({one}) => ({
	question: one(question, {
		fields: [savedQuestions.questionId],
		references: [question.id]
	}),
	user: one(user, {
		fields: [savedQuestions.userId],
		references: [user.id]
	}),
}));

export const citationRelations = relations(citation, ({one}) => ({
	user: one(user, {
		fields: [citation.citedBy],
		references: [user.id]
	}),
	answer: one(answer, {
		fields: [citation.answerId],
		references: [answer.id]
	}),
}));