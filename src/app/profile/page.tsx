import { redirect } from "next/navigation";
import { getMyProfile } from "@/features/profile/db";

export default async function ProfilePage() {
  const profile = await getMyProfile();

  redirect(`/${profile.username}`);
}
