import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { userId } = auth();

  redirect(`/${userId}`);
}
