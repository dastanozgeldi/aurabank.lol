import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { AddEventModal } from "./add-event-modal";
import { getMyEvents } from "@/server/queries";

export default async function WalletPage() {
  const events = await getMyEvents();
  const lastEvent = events[0];
  const total = events.reduce((acc, event) => acc + event.aura, 0);

  return (
    <div className="h-full">
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Aura</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-sans text-2xl font-black">
            {total.toLocaleString()}
          </div>
          {lastEvent && (
            <p className="text-xs text-muted-foreground">
              you got {lastEvent.aura} aura from last time.
            </p>
          )}
        </CardContent>
      </Card>

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
