"use server";

import { revalidatePath } from "next/cache";
import { formatUsername } from "@/lib/formatters";
import { updateUsername } from "@/drizzle/queries";

export async function setUsernameAction(formData: FormData, userId: string) {
  const username = formatUsername(formData.get("username") as string);

  updateUsername(userId, username);

  revalidatePath(`/${userId}`);
}
