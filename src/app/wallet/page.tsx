import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, User } from "lucide-react";
import { AddEventModal } from "./add-event-modal";
import { getMyEvents, getMyProfile } from "@/server/queries";

export default async function WalletPage() {
  const events = await getMyEvents();
  const profile = await getMyProfile();
  const lastEvent = events[0];
  const totalFromEvents = events.reduce((acc, event) => acc + event.aura, 0);

  return (
    <div className="h-full">
      <div className="mt-4 space-y-3">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">From Events</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-sans text-2xl font-black">
              {totalFromEvents.toLocaleString()}
            </div>
            {lastEvent && (
              <p className="text-xs text-muted-foreground">
                you got {lastEvent.aura} aura from last time.
              </p>
            )}
          </CardContent>
        </Card>

        {profile && (
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Total
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-sans text-2xl font-black">
                {profile.totalAura?.toLocaleString()}
              </div>

              <p className="text-xs text-muted-foreground">
                your profile aura may be different from events because you made
                a donation
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">events</h1>
          <div>{events.length} in total</div>
        </div>
        <div className="mt-3 h-[300px] space-y-3 overflow-auto">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between font-bold">
                  <h2 className="text-xl">{event.title}</h2>
                  <span>
                    {event.aura > 0 && "+"}
                    {event.aura}
                  </span>
                </div>
                <p className="text-muted-foreground">{event.explanation}</p>
              </div>
            ))
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border text-center text-muted-foreground">
              your events will be displayed here.
            </div>
          )}
        </div>
      </div>

      <AddEventModal />
    </div>
  );
}
