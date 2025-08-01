"use server";

import { syncClerkUserMetadata } from "@/services/clerk";
import { updateSettings } from "./db";

export async function updateSettingsAction(
  userId: string,
  { username }: { username: string },
) {
  await updateSettings(userId, { username });
  syncClerkUserMetadata({ userId, username });
}
