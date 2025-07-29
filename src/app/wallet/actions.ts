"use server";

import { generateEventAssessment } from "@/lib/utils";
import { insertEvent } from "@/server/queries";
import { auth } from "@clerk/nextjs/server";

export async function addEventAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const content = formData.get("content") as string;
  const assessment = await generateEventAssessment(content);

  await insertEvent({ userId, content, assessment });
}
