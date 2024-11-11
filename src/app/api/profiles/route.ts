import { getProfiles } from "@/server/queries";

export async function GET() {
  const profiles = await getProfiles();

  return Response.json({ profiles });
}
