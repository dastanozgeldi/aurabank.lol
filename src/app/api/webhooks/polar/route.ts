import { env } from "@/data/env/server";
import { insertSubscription } from "@/features/subscription/db";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: env.POLAR_WEBHOOK_SECRET,
  onSubscriptionActive: async (payload) => {
    const { id, startedAt, amount, metadata } = payload.data;
    const userId = metadata.clerk_user_id as string;

    await insertSubscription(userId, {
      polarSubscriptionId: id,
      startDate: new Date(startedAt!),
      price: amount,
    });
  },
  onSubscriptionRevoked: async (payload) => {
    console.log("user subscription revoked");
    console.log(payload);
  },
});
