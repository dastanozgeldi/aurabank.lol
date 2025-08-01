import { db } from "@/drizzle/db";
import { profilesTable, eventsTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, sql } from "drizzle-orm";

export async function getLeaderboard() {
  return db
    .select({
      userId: profilesTable.userId,
      username: profilesTable.username,
      totalAura: sql<number>`COALESCE(SUM(${eventsTable.aura}), 0)`.as(
        "totalAura",
      ),
      rank: sql<number>`rank() over (order by COALESCE(SUM(${eventsTable.aura}), 0) desc)`.as(
        "rank",
      ),
    })
    .from(profilesTable)
    .leftJoin(eventsTable, sql`${profilesTable.userId} = ${eventsTable.userId}`)
    .groupBy(profilesTable.userId, profilesTable.username)
    .orderBy(desc(sql`COALESCE(SUM(${eventsTable.aura}), 0)`));
}

export async function getProfile(userId: string) {
  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId));

  return profile;
}

export async function getProfileByUsername(username: string) {
  const [profile] = await db
    .select({
      userId: profilesTable.userId,
      name: profilesTable.name,
      username: profilesTable.username,
      imageUrl: profilesTable.imageUrl,
      totalAura: sql<number>`COALESCE(SUM(${eventsTable.aura}), 0)`.as(
        "totalAura",
      ),
    })
    .from(profilesTable)
    .where(eq(profilesTable.username, username))
    .leftJoin(eventsTable, sql`${profilesTable.userId} = ${eventsTable.userId}`)
    .groupBy(profilesTable.userId, profilesTable.username);

  return profile;
}

export async function getProfiles() {
  return db
    .select({
      username: profilesTable.username,
      totalAura: sql<number>`COALESCE(SUM(${eventsTable.aura}), 0)`.as(
        "totalAura",
      ),
    })
    .from(profilesTable)
    .leftJoin(eventsTable, sql`${profilesTable.userId} = ${eventsTable.userId}`)
    .groupBy(profilesTable.userId, profilesTable.username);
}

export async function getMyProfileUsername() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const profile = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.userId, userId),
    columns: {
      username: true,
    },
  });

  if (!profile) throw new Error("Profile not found");
  return profile;
}

export async function getMyProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const [profile] = await db
    .select({
      userId: profilesTable.userId,
      username: profilesTable.username,
      totalAura: sql<number>`COALESCE(SUM(${eventsTable.aura}), 0)`.as(
        "totalAura",
      ),
      events: sql<
        Array<{
          id: number;
          aura: number;
          title: string;
          content: string;
          explanation: string;
        }>
      >`
        COALESCE(
          json_agg(
            json_build_object(
              'id', ${eventsTable.id},
              'aura', ${eventsTable.aura},
              'title', ${eventsTable.title},
              'content', ${eventsTable.content},
              'explanation', ${eventsTable.explanation}
            )
          ) FILTER (WHERE ${eventsTable.id} IS NOT NULL),
          '[]'::json
        )
      `.as("events"),
    })
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId))
    .leftJoin(eventsTable, sql`${profilesTable.userId} = ${eventsTable.userId}`)
    .groupBy(profilesTable.userId, profilesTable.username);

  if (!profile) throw new Error("Profile not found");

  return profile;
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

export async function insertProfile(data: typeof profilesTable.$inferInsert) {
  const [newProfile] = await db
    .insert(profilesTable)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: profilesTable.userId,
      set: data,
    });

  if (newProfile == null) throw new Error("Failed to create profile");
  return newProfile;
}

export async function updateProfile(
  { userId }: { userId: string },
  data: Partial<typeof profilesTable.$inferInsert>,
) {
  const [updatedProfile] = await db
    .update(profilesTable)
    .set(data)
    .where(eq(profilesTable.userId, userId))
    .returning();

  if (updatedProfile == null) throw new Error("Failed to update profile");
  return updatedProfile;
}

export async function deleteProfile({ userId }: { userId: string }) {
  const [deletedProfile] = await db
    .update(profilesTable)
    .set({
      deletedAt: new Date(),
      name: "Deleted User",
      userId: "deleted-user",
      imageUrl: null,
    })
    .where(eq(profilesTable.userId, userId))
    .returning();

  if (deletedProfile == null) throw new Error("Failed to delete profile");
  return deletedProfile;
}
