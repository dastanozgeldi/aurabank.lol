import { getLeaderboard } from "@/server/queries";

export async function GET() {
  const profiles = await getLeaderboard();

  return Response.json({ profiles });
}
