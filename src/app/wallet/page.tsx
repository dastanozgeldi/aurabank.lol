import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AuraTabs, { AuraTabsSkeleton } from "@/components/aura-tabs";
import { getEvents } from "@/features/event/db";
import { getMyProfile } from "@/features/profile/db";
import { Suspense } from "react";

export default async function WalletPage() {
  const profile = await getMyProfile();

  return (
    <Suspense
      fallback={
        <div className="flex h-full flex-col gap-6">
          <AuraTabsSkeleton />
          <AuraTabsSkeleton />
        </div>
      }
    >
      <SuspenseBoundary
        userId={profile.userId}
        totalAura={profile.totalAura!}
      />
    </Suspense>
  );
}

async function SuspenseBoundary({
  userId,
  totalAura,
}: {
  userId: string;
  totalAura: number;
}) {
  const events = await getEvents(userId);

  return (
    <div className="my-6 h-full space-y-6">
      <AuraTabs userId={userId} totalAura={totalAura} wallet />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">events</h2>
        <div>{events.length} in total</div>
      </div>

      {events.length > 0 ? (
        <ScrollArea className="mt-3 h-[300px]">
          {events.map((event) => (
            <Card key={event.id} className="mb-3">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  {event.aura > 0 && "+"}
                  {event.aura} aura points
                </CardDescription>
              </CardHeader>
              <CardContent>{event.explanation}</CardContent>
              <CardFooter className="text-muted-foreground">
                {event.content}
              </CardFooter>
            </Card>
          ))}
        </ScrollArea>
      ) : (
        <div className="text-muted-foreground mt-3 flex h-[300px] items-center justify-center rounded-lg border text-center">
          your events will be displayed here.
        </div>
      )}
    </div>
  );
}
