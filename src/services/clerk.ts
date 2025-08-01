import { clerkClient } from "@clerk/nextjs/server";

const client = await clerkClient();

export function getUser(userId: string) {
  return client.users.getUser(userId);
}
