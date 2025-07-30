import { getProfile } from "@/features/profile/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { userId } = await auth();
  const profile = await getProfile(userId!)

  redirect(`/${profile.username}`);
}
