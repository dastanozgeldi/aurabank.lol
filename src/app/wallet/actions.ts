"use server";

import { auth } from "@clerk/nextjs/server";
import { insertEvent } from "@/drizzle/queries";
import { generateEventAssessment } from "@/lib/generate-event-assessment";

export async function addEventAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const content = formData.get("content") as string;
  const assessment = await generateEventAssessment(content);

  await insertEvent({ userId, content, assessment });
}
