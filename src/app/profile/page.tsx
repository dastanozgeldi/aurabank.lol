import { notFound, redirect } from "next/navigation";
import { getMyProfile } from "@/features/profile/db";

export default async function ProfilePage() {
  const profile = await getMyProfile();
  if (!profile) notFound();

  redirect(`/${profile.username}`);
}
