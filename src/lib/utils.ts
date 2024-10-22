import { generateObject } from "ai";
import { azure } from "@ai-sdk/azure";
import { z } from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateEventAssessment(content: string) {
  const { object } = await generateObject({
    model: azure("gpt-4o"),
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

  return object.assessment;
}
