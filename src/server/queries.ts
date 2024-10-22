import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { eventsTable, profilesTable } from "@/server/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function getEvents(userId: string) {
  return db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.userId, userId))
    .orderBy(desc(eventsTable.createdAt));
}

export async function getProfile(userId: string) {
  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId));

  return profile;
}

export async function getMyProfile() {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId));

  return profile;
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
  const [result] = await db
    .insert(eventsTable)
    .values({
      userId,
      content,
      title: assessment.title,
      aura: assessment.aura,
      explanation: assessment.explanation,
    })
    .returning();

  await db
    .update(profilesTable)
    .set({ totalAura: sql`${profilesTable.totalAura} + ${assessment.aura}` })
    .where(eq(profilesTable.userId, userId));

  return { event: result };
}
