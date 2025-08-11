"use server";

import { auth } from "@clerk/nextjs/server";
import { generateEventAssessment } from "@/lib/generate-event-assessment";
import { getProfileByUsername } from "@/features/profile/db";
import { insertEvent } from "@/features/event/db";
import { insertSnitch } from "./db";

export async function createSnitchAction(_: unknown, formData: FormData) {
  const { userId: culpritId } = await auth();
  if (!culpritId) throw new Error("Unauthorized");

  const username = formData.get("username") as string;
  const content = formData.get("content") as string;

  const victim = await getProfileByUsername(username);
  if (!victim) throw new Error("Victim not found");

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

  return { message: "Snitch was created." };
}
