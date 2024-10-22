"use server";

import { generateEventAssessment } from "@/lib/utils";
import { profilesTable, snitchesTable } from "@/server/schema";
import { db } from "@/server/db";
import { insertEvent } from "@/server/queries";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function addSnitchAction(formData: FormData) {
  const { userId: culpritId } = auth();
  if (!culpritId) throw new Error("Unauthorized");

  const username = formData.get("username") as string;
  const victim = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.username, username),
  });
  if (!victim) throw new Error("Victim not found");

  const content = formData.get("content") as string;
  const assessment = await generateEventAssessment(content);

  const { event } = await insertEvent({
    userId: victim.userId,
    content,
    assessment,
  });

  await db.insert(snitchesTable).values({
    culpritId,
    victimId: victim.userId,
    eventId: event.id,
  });
}
