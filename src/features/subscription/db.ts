import { and, eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { subscriptionsTable } from "@/drizzle/schema/subscription";

export async function getActiveSubscription(userId: string) {
  return await db
    .select()
    .from(subscriptionsTable)
    .where(
      and(
        eq(subscriptionsTable.userId, userId),
        eq(subscriptionsTable.status, "active"),
      ),
    )
    .limit(1);
}

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscription = await getActiveSubscription(userId);
  return subscription.length > 0;
}
