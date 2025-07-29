"use server";

import { auth } from "@clerk/nextjs/server";
import { generateEventAssessment } from "@/lib/generate-event-assessment";
import { insertEvent } from "./db";

export async function createEventAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const content = formData.get("content") as string;
  const assessment = await generateEventAssessment(content);

  await insertEvent({ userId, content, assessment });
}
