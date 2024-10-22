"use server";

import { profilesTable } from "@/server/schema";
import { db } from "@/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { formatUsername } from "@/lib/utils";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    const username = formatUsername(formData.get("username") as string);

    await db
      .insert(profilesTable)
      .values({
        userId,
        username,
      })
      // there are existing users with hardcoded profiles,
      // so we need to update the username if it already exists
      .onConflictDoUpdate({
        target: profilesTable.userId,
        set: { username },
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
