import { getEvents, getMyProfile } from "@/drizzle/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuraTabs } from "@/components/aura-tabs";
import { AddEventModal } from "./add-event-modal";

export default async function WalletPage() {
  const profile = await getMyProfile();
  const events = await getEvents(profile.userId);

  return (
    <div className="h-full">
      <div className="my-4 space-y-3">
        <AuraTabs wallet profile={profile} events={events} />
      </div>

      <AddEventModal />

      <div className="my-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">events</h1>
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
              </Card>
            ))}
          </ScrollArea>
        ) : (
          <div className="mt-3 flex h-[300px] items-center justify-center rounded-lg border text-center text-muted-foreground">
            your events will be displayed here.
          </div>
        )}
      </div>
    </div>
  );
}
