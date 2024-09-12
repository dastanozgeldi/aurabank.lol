"use server";

import { profiles } from "@/schema";
import { db } from "@/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    const username = formData.get("username") as string;

    await db.insert(profiles).values({
      userId,
      username,
    });

    const res = await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        username,
      },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
