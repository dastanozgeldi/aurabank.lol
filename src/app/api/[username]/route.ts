import { getProfileByUsername } from "@/server/queries";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(
  _: Request,
  { params }: { params: { username: string } },
) {
  const profile = await getProfileByUsername(params.username);
  const user = await clerkClient().users.getUser(profile.userId);

  return Response.json({ profile, user });
}
