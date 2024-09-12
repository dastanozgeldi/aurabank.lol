import { getProfileByUsername } from "@/server/queries";

export async function GET(
  _: Request,
  { params }: { params: { username: string } },
) {
  const profile = await getProfileByUsername(params.username);

  return Response.json({ profile });
}
