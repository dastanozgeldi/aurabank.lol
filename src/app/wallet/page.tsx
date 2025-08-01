import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuraCard } from "@/components/aura-card";
import { getMyWallet } from "@/features/profile/db";
import { Suspense } from "react";
import { CreateEventDialog } from "@/features/event/components/create-event-dialog";
import PageHeader from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/drizzle/db";
import { desc, eq } from "drizzle-orm";
import { eventsTable } from "@/drizzle/schema";

export default async function WalletPage() {
  return (
    <>
      <PageHeader
        title="wallet"
        description="describe what happened to ai."
        button={<CreateEventDialog />}
      />
      <Suspense
        fallback={
          <div className="flex h-full flex-col gap-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        }
      >
        <SuspenseBoundary />
      </Suspense>
    </>
  );
}

async function SuspenseBoundary() {
  const profile = await getMyWallet();

  return (
    <div className="my-6 h-full">
      <AuraCard totalAura={profile.totalAura} />

      <div className="mt-6 mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">events</h2>
        <span className="text-muted-foreground">
          {profile.eventsCount} in total
        </span>
      </div>
      <Suspense fallback={<Skeleton className="h-[300px]" />}>
        <Events userId={profile.userId} />
      </Suspense>
    </div>
  );
}

async function Events({ userId }: { userId: string }) {
  const events = await db.query.eventsTable.findMany({
    columns: {
      id: true,
      title: true,
      content: true,
      explanation: true,
      aura: true,
      createdAt: true,
    },
    where: eq(eventsTable.userId, userId),
    limit: 2,
    orderBy: desc(eventsTable.createdAt),
  });

  const dtFormatter = Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });

  if (!events.length) {
    return (
      <div className="text-muted-foreground flex h-[300px] items-center justify-center rounded-lg border text-center">
        your events will be displayed here.
      </div>
    );
  }
  return (
    <ScrollArea className="h-[300px]">
      {events.map((event) => (
        <Card key={event.id} className="mb-3">
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>
              {dtFormatter.format(new Date(event.createdAt))}
            </CardDescription>
            <CardAction className="text-muted-foreground text-sm">
              {event.aura > 0 && "+"}
              {event.aura} aura
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="mb-3 rounded-sm border-l-4 border-yellow-400 bg-[#121212] px-2 py-1">
              {event.content}
            </div>
            <blockquote className="line-clamp-3">
              {event.explanation}
            </blockquote>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}
