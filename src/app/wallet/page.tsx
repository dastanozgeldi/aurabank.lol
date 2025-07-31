import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuraCard, AuraCardSkeleton } from "@/components/aura-card";
import { getMyProfile } from "@/features/profile/db";
import { Suspense } from "react";
import { CreateEventDialog } from "@/features/event/components/create-event-dialog";
import PageHeader from "@/components/page-header";

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
            <AuraCardSkeleton />
            <AuraCardSkeleton />
          </div>
        }
      >
        <SuspenseBoundary />
      </Suspense>
    </>
  );
}

async function SuspenseBoundary() {
  const profile = await getMyProfile();

  return (
    <div className="my-6 h-full">
      <AuraCard totalAura={profile.totalAura} />

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">events</h2>
        <span className="text-muted-foreground">
          {profile.events.length} in total
        </span>
      </div>

      {profile.events.length ? (
        <ScrollArea className="mt-3 h-[300px]">
          {profile.events.map((event) => (
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
