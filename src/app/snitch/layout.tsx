import { hasActiveSubscription } from "@/features/subscription/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SnitchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const isPremium = await hasActiveSubscription(userId!);

  if (!isPremium) {
    return redirect("/premium");
  }
  return <>{children}</>;
}
