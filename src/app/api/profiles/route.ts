import { getProfiles } from "@/features/profile/db";

export async function GET() {
  const profiles = await getProfiles();

  return Response.json({ profiles });
}
