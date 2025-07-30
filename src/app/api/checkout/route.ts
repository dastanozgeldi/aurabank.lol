import { env } from "@/data/env/server";
import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  accessToken: env.POLAR_ACCESS_TOKEN,
  successUrl: env.POLAR_SUCCESS_URL,
  server: env.POLAR_SERVER,
});
