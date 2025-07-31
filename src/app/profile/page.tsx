import { redirect } from "next/navigation";
import { getMyProfileUsername } from "@/features/profile/db";

export default async function ProfilePage() {
  const { username } = await getMyProfileUsername();

  redirect(`/${username}`);
}
