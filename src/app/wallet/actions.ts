"use server";

import { eventsTable, profilesTable } from "@/schema";
import { db } from "@/server/db";
import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

export async function addEventAction(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const content = formData.get("content") as string;

  const { object } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      assessment: z.object({
        title: z.string(),
        aura: z.number(),
        explanation: z.string(),
      }),
    }),
    prompt:
      `There is a meme going around involving aura.` +
      `You are the aura master that decides how many aura points to give based on the event given.` +
      `For example, if a user talks about how he approached a girl and got ignored, ` +
      `this will make -500 (negative five hundred) aura points.` +
      `It is your job to assess objectively how many aura points a certain event should get.` +
      `Along with deciding the amount of aura points for the event, ` +
      `you should also give it a brief title and provide explanation for the aura points.` +
      `Take feasibility of the event into consideration. If the event is obviously fake, you need to punish the user with negative aura.` +
      `Here is the event given by the user: ${content}`,
  });

  const { assessment } = object;
  const [result] = await db
    .insert(eventsTable)
    .values({
      userId,
      content,
      title: assessment.title,
      aura: assessment.aura,
      explanation: assessment.explanation,
    })
    .returning();

  await db
    .update(profilesTable)
    .set({ totalAura: sql`${profilesTable.totalAura} + ${assessment.aura}` })
    .where(eq(profilesTable.userId, userId));

  return result;
}
