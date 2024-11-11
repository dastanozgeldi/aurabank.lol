"use server";

import { revalidatePath } from "next/cache";
import { formatUsername } from "@/lib/utils";
import { updateUsername } from "@/server/queries";

export async function setUsernameAction(formData: FormData, userId: string) {
  const username = formatUsername(formData.get("username") as string);

  updateUsername(userId, username);

  revalidatePath(`/${userId}`);
}
