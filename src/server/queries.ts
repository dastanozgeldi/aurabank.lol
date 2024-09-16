import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { eventsTable, profilesTable } from "@/schema";
import { desc, eq } from "drizzle-orm";

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
