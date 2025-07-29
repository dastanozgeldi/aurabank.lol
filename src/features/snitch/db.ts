import { db } from "@/drizzle/db";
import { snitchesTable } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";

export async function getSnitches(userId: string) {
  return db.query.snitchesTable.findMany({
    where: eq(snitchesTable.victimId, userId),
    orderBy: [desc(snitchesTable.createdAt)],
    with: {
      event: true,
      culprit: true,
    },
  });
}

export async function insertSnitch({
  culpritId,
  victimId,
  eventId,
}: {
  culpritId: string;
  victimId: string;
  eventId: number;
}) {
  await db.insert(snitchesTable).values({
    culpritId,
    victimId,
    eventId,
  });
}
