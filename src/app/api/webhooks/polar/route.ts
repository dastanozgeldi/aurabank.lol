import { env } from "@/data/env/server";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: env.POLAR_WEBHOOK_SECRET,
  onSubscriptionActive: async (payload) => {
    console.log("just had a user subscription become active");
    console.log(payload);
  },
});
