import Link from "next/link";
import { Badge } from "./ui/badge";
import { hasActiveSubscription } from "@/features/subscription/db";
import { auth } from "@clerk/nextjs/server";

export default async function Logo() {
  const { userId } = await auth();
  const isPremium = await hasActiveSubscription(userId!);

  return (
    <Link href="/" className="flex items-center gap-2">
      <h1 className="text-2xl font-extrabold">aura bank.</h1>
      {isPremium && <Badge className="bg-blue-800 text-white">premium</Badge>}
    </Link>
  );
}
