import { db } from "@/drizzle/db";
import { snitchesTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getSnitchesByVictimId(victimId: string) {
  return db.query.snitchesTable.findMany({
    where: eq(snitchesTable.victimId, victimId),
    columns: {
      id: true,
      createdAt: true,
    },
    with: {
      event: {
        columns: {
          aura: true,
          content: true,
        },
      },
      culprit: {
        columns: {
          username: true,
        },
      },
    },
    orderBy: (snitches, { desc }) => [desc(snitches.createdAt)],
    limit: 5,
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
