"use server";

import { generateEventAssessment } from "@/lib/utils";
import {
  getProfileByUsername,
  insertEvent,
  insertSnitch,
} from "@/server/queries";
import { auth } from "@clerk/nextjs/server";

export async function addSnitchAction(formData: FormData, username: string) {
  const { userId: culpritId } = auth();
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
