import { Brain, User } from "lucide-react";
import { SelectEvent, SelectProfile } from "@/drizzle/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AuraCard } from "./aura-card";
import { AddEventModal } from "@/app/wallet/add-event-modal";

interface Props {
  profile: SelectProfile;
  events: SelectEvent[];
  wallet?: boolean;
}

export const AuraTabs = ({ profile, events, wallet }: Props) => {
  return (
    <Tabs defaultValue="from_events">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="from_events">From Events</TabsTrigger>
          <TabsTrigger value="profile_total">Profile Total</TabsTrigger>
        </TabsList>

        {wallet && <AddEventModal />}
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
          aura={profile.totalAura!}
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
};
