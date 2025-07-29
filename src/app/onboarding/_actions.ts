"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { formatUsername } from "@/lib/formatters";
import { insertProfile } from "@/drizzle/queries";

export const completeOnboarding = async (formData: FormData) => {
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
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
