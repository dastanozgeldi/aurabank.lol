import { clerkClient } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuraTabs } from "@/components/aura-tabs";
import { getEvents, getProfile } from "@/server/queries";

export default async function ProfilePage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const profile = await getProfile(userId);
  if (!profile) notFound();

  const user = await clerkClient().users.getUser(userId);
  const events = await getEvents(userId);

  return (
    <div className="my-4 flex flex-col items-center justify-center">
      <Suspense
        fallback={
          <>
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="mt-3 h-6 w-[200px]" />
            <Skeleton className="mt-3 h-6 w-[200px]" />
            <Skeleton className="mt-3 h-24 w-full" />
          </>
        }
      >
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>
              {profile.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mt-3 text-center text-lg font-semibold">
            {user.firstName} {user.lastName}
          </div>
        </div>

        <div className="mt-3 w-full">
          <AuraTabs profile={profile} events={events} />
        </div>
      </Suspense>
    </div>
  );
}
