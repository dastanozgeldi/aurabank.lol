"use server";

import { formatUsername } from "@/lib/formatters";
import { insertProfile, updateUsername } from "@/features/profile/db";
import { auth } from "@clerk/nextjs/server";
import { syncClerkUserMetadata } from "@/services/clerk";

export async function updateUsernameAction(username: string, userId: string) {
  updateUsername(userId, username);
  syncClerkUserMetadata({ userId, username });
}

export const completeOnboardingAction = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    const username = formatUsername(formData.get("username") as string);

    await insertProfile(userId, username);

    syncClerkUserMetadata({ userId, username, onboardingComplete: true });

    return { message: "Onboarding complete!" };
  } catch {
    return { error: "There was an error updating the user metadata." };
  }
};
