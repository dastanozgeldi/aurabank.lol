import { clerkClient } from "@clerk/nextjs/server";

const client = await clerkClient();

export function syncClerkUserMetadata({
  userId,
  username,
  onboardingComplete,
}: {
  userId: string;
  username?: string;
  onboardingComplete?: boolean;
}) {
  client.users.updateUserMetadata(userId, {
    publicMetadata: {
      username,
      onboardingComplete,
    },
  });
}

export function getUser(userId: string) {
  return client.users.getUser(userId);
}
