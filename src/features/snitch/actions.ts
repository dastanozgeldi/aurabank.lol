"use server";

import { auth } from "@clerk/nextjs/server";
import { generateEventAssessment } from "@/lib/generate-event-assessment";
import { getProfileByUsername } from "@/features/profile/db";
import { insertEvent } from "@/features/event/db";
import { insertSnitch } from "./db";

export async function createSnitchAction(formData: FormData, username: string) {
  const { userId: culpritId } = await auth();
  if (!culpritId) throw new Error("Unauthorized");

  const victim = await getProfileByUsername(username);
  if (!victim) throw new Error("Victim not found");

  const content = formData.get("content") as string;
  const assessment = await generateEventAssessment(content);

  const newEvent = await insertEvent({
    userId: victim.userId,
    content,
    assessment,
  });

  await insertSnitch({
    culpritId,
    victimId: victim.userId,
    eventId: newEvent.id,
  });
}
