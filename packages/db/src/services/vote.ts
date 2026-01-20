import { db } from "../index";
import { answer, answerVote, question, questionVote } from "../schema";
import { and, eq, sql } from "drizzle-orm";

type VoteTarget = "answer" | "question";

interface VoteOptions {
  userId: string;
  targetId: string;
  value: number; // -1, 0, 1
  target: VoteTarget;
}

export async function handleVote({
  userId,
  targetId,
  value,
  target,
}: VoteOptions) {
  const voteTable = target === "answer" ? answerVote : questionVote;
  const targetTable = target === "answer" ? answer : question;
  const column =
    target === "answer" ? answerVote.answerId : questionVote.questionId;
  const voteWhere = and(eq(voteTable.userId, userId), eq(column, targetId));

  const voteQuery =
    target === "answer" ? db.query.answerVote : db.query.questionVote;
  const existing = await voteQuery.findFirst({ where: voteWhere });

  let deltaUp = 0;
  let deltaDown = 0;

  // Vote exists
  if (existing) {
    if (value === existing.value)
      return {
        success: false,
        message: "Vote didn't change",
        updatedRow: null,
      };

    // Subtract previous vote from counters
    if (existing.value === 1) deltaUp -= 1;
    else if (existing.value === -1) deltaDown -= 1;
  }

  let actionMessage = "";

  // Insert / update / delete
  if (existing && value === 0) {
    await db.delete(voteTable).where(voteWhere);
    actionMessage = "Vote retracted";
  } else if (existing) {
    await db.update(voteTable).set({ value }).where(voteWhere);
    actionMessage =
      value === 1 ? "Changed vote to upvote" : "Changed vote to downvote";
  } else if (!existing && value !== 0) {
    await db
      .insert(voteTable)
      .values({ userId, [`${target}Id`]: targetId, value });
    actionMessage =
      value === 1 ? "Vote added (upvote)" : "Vote added (downvote)";
  } else if (!existing && value === 0) {
    return {
      message: "No existing vote to retract",
      success: false,
      updatedRow: null,
    };
  }

  // Add new vote to counters
  if (value === 1) deltaUp += 1;
  else if (value === -1) deltaDown += 1;

  let updatedRow = null;

  // Update counters in target table
  if (deltaUp !== 0 || deltaDown !== 0) {
    updatedRow = await db
      .update(targetTable)
      .set({
        upvotes: sql`${targetTable.upvotes} + ${deltaUp}`,
        downvotes: sql`${targetTable.downvotes} + ${deltaDown}`,
      })
      .where(eq(targetTable.id, targetId))
      .returning();
  }

  return {
    message: actionMessage,
    success: true,
    updatedRow,
  };
}
