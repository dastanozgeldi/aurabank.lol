import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { eventsTable, profilesTable, snitchesTable } from "@/drizzle/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function getLeaderboard() {
  return db
    .select({
      userId: profilesTable.userId,
      username: profilesTable.username,
      totalAura: profilesTable.totalAura,
      rank: sql<number>`rank() over (order by ${profilesTable.totalAura} desc)`.as(
        "rank",
      ),
    })
    .from(profilesTable)
    .orderBy(desc(profilesTable.totalAura));
}

export async function getEvents(userId: string) {
  return db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.userId, userId))
    .orderBy(desc(eventsTable.createdAt));
}

export async function getSnitches(userId: string) {
  return db.query.snitchesTable.findMany({
    where: eq(snitchesTable.victimId, userId),
    orderBy: [desc(snitchesTable.createdAt)],
    with: {
      event: true,
      culprit: true,
    },
  });
}

export async function getProfile(userId: string) {
  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId));

  return profile;
}

export async function getProfileByUsername(username: string) {
  return db.query.profilesTable.findFirst({
    where: eq(profilesTable.username, username),
  });
}

export async function getProfiles() {
  return db.query.profilesTable.findMany({
    orderBy: [desc(profilesTable.totalAura)],
  });
}

export async function getMyProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId));

  return profile;
}

export async function updateUsername(userId: string, username: string) {
  await db
    .update(profilesTable)
    .set({ username })
    .where(eq(profilesTable.userId, userId));
}

export async function insertProfile(userId: string, username: string) {
  await db
    .insert(profilesTable)
    .values({
      userId,
      username,
    })
    // there are existing users with hardcoded profiles,
    // so we need to update the username if it already exists
    .onConflictDoUpdate({
      target: profilesTable.userId,
      set: { username },
    });
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

export async function insertSnitch({
  culpritId,
  victimId,
  eventId,
}: {
  culpritId: string;
  victimId: string;
  eventId: number;
}) {
  await db.insert(snitchesTable).values({
    culpritId,
    victimId,
    eventId,
  });
}
