import { auth, clerkClient } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuraTabs } from "@/components/aura-tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UpdateUsernameModal } from "@/features/profile/components/update-username-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProfileByUsername } from "@/features/profile/db";
import { getEvents } from "@/features/event/db";
import { getSnitches } from "@/features/snitch/db";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const profile = await getProfileByUsername(username);
  if (!profile) notFound();

  const { userId: myId } = await auth();
  // const user = await (await clerkClient()).users.getUser(profile.userId);
  const events = await getEvents(profile.userId);
  const snitches = await getSnitches(profile.userId);

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
          {/* <Avatar className="h-24 w-24">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>
              {profile.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mt-3 text-center text-lg font-semibold">
            {user.firstName} {user.lastName}
          </div> */}
          <div className="text-center text-sm">@{profile.username}</div>
        </div>

        {profile.userId === myId && (
          <div className="my-3 w-full">
            <UpdateUsernameModal userId={profile.userId} />
          </div>
        )}

        <div className="mt-3 w-full">
          <AuraTabs profile={profile} events={events} />
        </div>

        <div className="my-4 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold">snitches</h1>
            <div>{snitches.length} in total</div>
          </div>

          {snitches.length > 0 ? (
            <ScrollArea className="mt-3 h-[300px] w-full">
              {snitches.map(({ event, culprit, createdAt }) => (
                <Card key={event.id} className="mb-3">
                  <CardHeader>
                    <CardTitle>@{culprit.username}</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      {event.aura > 0 && "+"}
                      {event.aura} aura points
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{event.content}</CardContent>
                  <CardFooter className="text-muted-foreground text-right text-sm">
                    {createdAt.toLocaleString()}
                  </CardFooter>
                </Card>
              ))}
            </ScrollArea>
          ) : (
            <div className="text-muted-foreground mt-3 flex h-[300px] items-center justify-center rounded-lg border text-center">
              snitches to your name will be displayed here.
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
}
