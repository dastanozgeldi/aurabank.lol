import { getEvents } from "@/features/event/db";
import { CreateEventDialog } from "@/features/event/components/create-event-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainIcon, UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default async function AuraTabs({
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
          icon={<BrainIcon className="text-muted-foreground h-4 w-4" />}
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
          icon={<UserIcon className="text-muted-foreground h-4 w-4" />}
        />
      </TabsContent>
    </Tabs>
  );
}

export function AuraTabsSkeleton() {
  return (
    <div className="my-3 w-full">
      <Skeleton className="mt-3 h-6 w-[200px]" />
      <Skeleton className="mt-3 h-24 w-full" />
    </div>
  );
}

function AuraCard({
  aura,
  title,
  description,
  icon,
}: {
  aura: number;
  title: string;
  description?: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="font-sans text-2xl font-black">
          {aura.toLocaleString()}
        </div>

        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
