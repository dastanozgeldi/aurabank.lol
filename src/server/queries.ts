import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { events } from "@/schema";
import { desc, eq } from "drizzle-orm";

export async function getMyEvents() {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  return db
    .select()
    .from(events)
    .where(eq(events.userId, userId))
    .orderBy(desc(events.createdAt));
}
