import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProfileByUsername } from "@/features/profile/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuraCard } from "@/components/aura-card";
import { CreateSnitchDialog } from "@/features/snitch/components/create-snitch-dialog";
import { getSnitchesByVictimId } from "@/features/snitch/db";
import { formatDate } from "@/lib/formatters";

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
        <Snitches profile={profile} />
      </Suspense>
    </>
  );
}

async function Snitches({
  profile,
}: {
  profile: { userId: string; username: string };
}) {
  const snitches = await getSnitchesByVictimId(profile.userId);

  return (
    <div className="my-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">recent snitches</h1>
        <CreateSnitchDialog username={profile.username} />
      </div>

      {snitches.length > 0 ? (
        <ScrollArea className="mt-3 h-[300px] w-full">
          {snitches.map(({ id, event, culprit, createdAt }) => (
            <Card key={id} className="mb-3">
              <CardHeader>
                <CardTitle>@{culprit.username}</CardTitle>
                <CardDescription>{formatDate(createdAt)}</CardDescription>
                <CardAction className="text-muted-foreground text-sm">
                  {event.aura > 0 && "+"}
                  {event.aura} aura
                </CardAction>
              </CardHeader>
              <CardContent>{event.content}</CardContent>
            </Card>
          ))}
        </ScrollArea>
      ) : (
        <div className="text-muted-foreground mt-3 flex h-[300px] items-center justify-center rounded-lg border text-center">
          snitches will be displayed here.
        </div>
      )}
    </div>
  );
}
