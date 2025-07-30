import { auth, clerkClient } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateEventDialog } from "@/features/event/components/create-event-dialog";
import { AuraCard } from "@/components/aura-card";
import { Brain, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const profile = await getProfileByUsername(username);
  if (!profile) notFound();

  const { userId: myId } = await auth();

  return (
    <div className="my-4 flex flex-col items-center justify-center">
      <Suspense
        fallback={
          <>
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="mt-3 h-6 w-[200px]" />
            <Skeleton className="mt-3 h-6 w-[200px]" />
          </>
        }
      >
        <UserInfo userId={profile.userId} />
      </Suspense>
      <p className="text-muted-foreground text-center text-sm">
        @{profile.username}
      </p>

      {profile.userId === myId && (
        <div className="my-3 w-full">
          <UpdateUsernameModal userId={profile.userId} />
        </div>
      )}

      <Suspense
        fallback={
          <div className="my-3 w-full">
            <Skeleton className="mt-3 h-6 w-[200px]" />
            <Skeleton className="mt-3 h-24 w-full" />
          </div>
        }
      >
        <AuraTabs userId={profile.userId} totalAura={profile.totalAura!} />
      </Suspense>

      <Suspense
        fallback={
          <div className="my-3 w-full">
            <Skeleton className="mt-3 h-6 w-full" />
            <Skeleton className="mt-3 h-24 w-full" />
          </div>
        }
      >
        <Snitches userId={profile.userId} />
      </Suspense>
    </div>
  );
}

async function UserInfo({ userId }: { userId: string }) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  return (
    <>
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback>
          {user.fullName?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="mt-3 text-center text-lg font-semibold">
        {user.fullName}
      </div>
    </>
  );
}

async function AuraTabs({
  userId,
  totalAura,
  wallet = false,
}: {
  userId: string;
  totalAura: number;
  wallet?: boolean;
}) {
  const events = await getEvents(userId);

  return (
    <Tabs defaultValue="from_events" className="mt-3 w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="from_events">From Events</TabsTrigger>
          <TabsTrigger value="profile_total">Profile Total</TabsTrigger>
        </TabsList>

        {wallet && <CreateEventDialog />}
      </div>
      <TabsContent value="from_events">
        <AuraCard
          aura={events.reduce((acc, event) => acc + event.aura, 0)}
          title="From Events"
          description={
            wallet && events.length > 0
              ? `you got ${events[0].aura > 0 ? "+" : ""}${events[0].aura} aura from last time.`
              : undefined
          }
          icon={<Brain className="text-muted-foreground h-4 w-4" />}
        />
      </TabsContent>
      <TabsContent value="profile_total">
        <AuraCard
          aura={totalAura}
          title="Profile Total"
          description={
            wallet
              ? "your profile aura may be different from events because you made a donation"
              : undefined
          }
          icon={<User className="text-muted-foreground h-4 w-4" />}
        />
      </TabsContent>
    </Tabs>
  );
}

async function Snitches({ userId }: { userId: string }) {
  const snitches = await getSnitches(userId);

  return (
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
                <CardTitle>@{culprit?.username ?? "unknown"}</CardTitle>
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
