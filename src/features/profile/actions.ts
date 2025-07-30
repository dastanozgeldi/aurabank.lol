"use server";

import { revalidatePath } from "next/cache";
import { formatUsername } from "@/lib/formatters";
import { insertProfile, updateUsername } from "@/features/profile/db";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUsernameAction(formData: FormData, userId: string) {
  const username = formatUsername(formData.get("username") as string);

  updateUsername(userId, username);

  revalidatePath(`/${username}`);
}

export const completeOnboardingAction = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    const username = formatUsername(formData.get("username") as string);

    await insertProfile(userId, username);

    const res = await (
      await clerkClient()
    ).users.updateUser(userId, {
      publicMetadata: { onboardingComplete: true, username },
    });
    return { message: res.publicMetadata };
  } catch {
    return { error: "There was an error updating the user metadata." };
  }
};
