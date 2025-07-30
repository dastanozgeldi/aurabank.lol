import { env } from "@/data/env/server";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: env.POLAR_WEBHOOK_SECRET,
  onSubscriptionActive: async (payload) => {
    console.log("user subscription active");
    console.log(payload);
  },
  onSubscriptionRevoked: async (payload) => {
    console.log("user subscription revoked");
    console.log(payload);
  },
});
