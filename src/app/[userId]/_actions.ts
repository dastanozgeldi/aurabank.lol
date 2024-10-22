"use server";

import { profilesTable } from "@/server/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function setUsernameAction(formData: FormData, userId: string) {
  const username = formData.get("username") as string;

  await db
    .update(profilesTable)
    .set({ username })
    .where(eq(profilesTable.userId, userId));

  revalidatePath(`/${userId}`);
}
