"use server";

import { auth } from "@clerk/nextjs/server";
import { generateEventAssessment } from "@/lib/generate-event-assessment";
import { getProfileByUsername } from "@/features/profile/db";
import { insertEvent } from "@/features/event/db";
import { insertSnitch } from "@/features/snitch/db";

export async function addSnitchAction(formData: FormData, username: string) {
  const { userId: culpritId } = await auth();
  if (!culpritId) throw new Error("Unauthorized");

  const victim = await getProfileByUsername(username);
  if (!victim) throw new Error("Victim not found");

  const content = formData.get("content") as string;
  const assessment = await generateEventAssessment(content);

  const { event } = await insertEvent({
    userId: victim.userId,
    content,
    assessment,
  });

  await insertSnitch({
    culpritId,
    victimId: victim.userId,
    eventId: event.id,
  });
}
