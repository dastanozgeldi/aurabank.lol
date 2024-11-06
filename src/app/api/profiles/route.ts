import { db } from "@/server/db";
import { profilesTable } from "@/server/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const profiles = await db.query.profilesTable.findMany({
    orderBy: [desc(profilesTable.totalAura)],
  });

  return Response.json({ profiles });
}
