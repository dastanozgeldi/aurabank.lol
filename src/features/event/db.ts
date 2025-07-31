import { eventsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { desc, eq } from "drizzle-orm";
import { hasActiveSubscription } from "../subscription/db";

export async function getEvents(userId: string) {
  return db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.userId, userId))
    .orderBy(desc(eventsTable.createdAt));
}

export async function insertEvent({
  userId,
  content,
  assessment,
}: {
  userId: string;
  content: string;
  assessment: {
    title: string;
    explanation: string;
    aura: number;
  };
}) {
  const isPremium = await hasActiveSubscription(userId);
  const aura = isPremium ? assessment.aura * 2 : assessment.aura;

  const [newEvent] = await db
    .insert(eventsTable)
    .values({
      userId,
      content,
      title: assessment.title,
      explanation: assessment.explanation,
      aura,
    })
    .returning();

  return newEvent;
}
