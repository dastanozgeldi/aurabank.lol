"use server";

import { profiles } from "@/schema";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function setUsernameAction(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const username = formData.get("username") as string;

  await db
    .update(profiles)
    .set({ username })
    .where(eq(profiles.userId, userId));
}
