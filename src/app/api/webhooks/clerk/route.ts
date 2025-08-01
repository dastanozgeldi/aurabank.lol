import { headers } from "next/headers";
import { Webhook } from "svix";
import {
  insertProfile,
  updateProfile,
  deleteProfile,
} from "@/features/profile/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { env } from "@/data/env/server";

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(env.CLERK_WEBHOOK_SIGNING_SECRET);
  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const username = event.data.username;
      const name = `${event.data.first_name} ${event.data.last_name}`.trim();
      if (username == null) return new Response("No username", { status: 400 });
      if (name === "") return new Response("No name", { status: 400 });

      if (event.type === "user.created") {
        await insertProfile({
          userId: event.data.id,
          username,
          name,
          imageUrl: event.data.image_url,
        });
      } else {
        await updateProfile(
          { userId: event.data.id },
          {
            username,
            name,
            imageUrl: event.data.image_url,
          },
        );
      }
      break;
    }
    case "user.deleted": {
      if (event.data.id != null) {
        await deleteProfile({ userId: event.data.id });
      }
      break;
    }
  }

  return new Response("", { status: 200 });
}
