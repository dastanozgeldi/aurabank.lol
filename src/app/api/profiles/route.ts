import { db } from "@/server/db";

export async function GET() {
  const profiles = await db.query.profilesTable.findMany();

  return Response.json({ profiles });
}
