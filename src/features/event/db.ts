import { eventsTable, profilesTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { desc, eq, sql } from "drizzle-orm";

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
    aura: number;
    explanation: string;
  };
}) {
  const newEvent = await db.transaction(async (trx) => {
    const [newEvent] = await trx
      .insert(eventsTable)
      .values({
        userId,
        content,
        title: assessment.title,
        aura: assessment.aura,
        explanation: assessment.explanation,
      })
      .returning();

    if (newEvent == null) {
      trx.rollback();
      throw new Error("Failed to create event");
    }

    await trx
      .update(profilesTable)
      .set({
        totalAura: sql`${profilesTable.totalAura} + ${assessment.aura}`,
      })
      .where(eq(profilesTable.userId, userId));

    return newEvent;
  });

  return newEvent;
}
