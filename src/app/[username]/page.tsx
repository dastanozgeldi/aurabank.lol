import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProfileByUsername } from "@/features/profile/db";
import { getSnitches } from "@/features/snitch/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuraCard } from "@/components/aura-card";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div className="my-4 flex flex-col items-center justify-center">
      <Suspense
        fallback={
          <>
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="my-3 h-6 w-[200px]" />
            <Skeleton className="mb-3 h-4 w-[100px]" />
            <Skeleton className="h-40 w-full" />
          </>
        }
      >
        <SuspenseBoundary username={username} />
      </Suspense>
    </div>
  );
}

async function SuspenseBoundary({ username }: { username: string }) {
  const profile = await getProfileByUsername(username);
  if (!profile) notFound();

  return (
    <>
      <Avatar className="size-24">
        <AvatarImage
          src={profile.imageUrl ?? undefined}
          className="object-cover"
        />
        <AvatarFallback>
          {profile.name?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="mt-3 text-center text-lg font-semibold">
        {profile.name}
      </div>
      <p className="text-muted-foreground mb-3 text-center text-sm">
        @{profile.username}
      </p>

      <AuraCard totalAura={profile.totalAura} />

      <Suspense
        fallback={
          <div className="my-4 w-full">
            <Skeleton className="mt-3 h-6 w-full" />
            <Skeleton className="mt-3 h-[300px] w-full" />
          </div>
        }
      >
        <Snitches userId={profile.userId} />
      </Suspense>
    </>
  );
}

async function Snitches({ userId }: { userId: string }) {
  const snitches = await getSnitches(userId);

  return (
    <div className="my-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">snitches</h1>
        <span className="text-muted-foreground">
          {snitches.length} in total
        </span>
      </div>

      {snitches.length > 0 ? (
        <ScrollArea className="mt-3 h-[300px] w-full">
          {snitches.map(({ event, culprit, createdAt }) => (
            <Card key={event.id} className="mb-3">
              <CardHeader>
                <CardTitle>@{culprit?.username}</CardTitle>
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
  );
}
