import { db } from "@/drizzle/db";
import { profilesTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
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

  return await db.query.profilesTable.findFirst({
    where: eq(profilesTable.userId, userId),
  });
}

export async function updateSettings(
  userId: string,
  { username }: { username: string },
) {
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
