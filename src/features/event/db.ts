import { eventsTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { hasActiveSubscription } from "../subscription/db";
import { eq } from "drizzle-orm";

export async function getHomepageEvents() {
  return db.query.eventsTable.findMany({
    columns: {
      id: true,
      content: true,
      aura: true,
    },
    with: {
      profile: {
        columns: {
          username: true,
          imageUrl: true,
        },
      },
    },
    orderBy: (events, { asc }) => [asc(events.aura)],
    limit: 10,
  });
}

export async function getWalletEvents(userId: string) {
  return db.query.eventsTable.findMany({
    columns: {
      id: true,
      title: true,
      content: true,
      explanation: true,
      aura: true,
      createdAt: true,
    },
    where: eq(eventsTable.userId, userId),
    orderBy: (events, { desc }) => [desc(events.createdAt)],
    limit: 5,
  });
}

export async function insertEvent({
  userId,
  content,
  assessment,
}: {
  userId: string;
  content: string;
  assessment: {
    title: string;
    explanation: string;
    aura: number;
  };
}) {
  const isPremium = await hasActiveSubscription(userId);
  const aura =
    isPremium && assessment.aura >= 0 ? assessment.aura * 2 : assessment.aura;

  const [newEvent] = await db
    .insert(eventsTable)
    .values({
      userId,
      content,
      title: assessment.title,
      explanation: assessment.explanation,
      aura,
    })
    .returning();

  return newEvent;
}
