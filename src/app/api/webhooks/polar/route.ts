import { env } from "@/data/env/server";
import { insertSubscription } from "@/features/subscription/db";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: env.POLAR_WEBHOOK_SECRET,
  onSubscriptionActive: async (payload) => {
    console.log("user subscription active");
    console.log(JSON.stringify(payload, null, 2));
    // await insertSubscription(payload.userId, {
    //   polarSubscriptionId: payload.subscription.id,
    //   startDate: new Date(payload.subscription.start_date),
    //   price: payload.subscription.price,
    // });
  },
  onSubscriptionRevoked: async (payload) => {
    console.log("user subscription revoked");
    console.log(payload);
  },
});
