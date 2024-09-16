import { Brain, User } from "lucide-react";
import { SelectEvent, SelectProfile } from "@/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AuraCard } from "./aura-card";

interface Props {
  profile: SelectProfile;
  events: SelectEvent[];
  wallet?: boolean;
}

export const AuraTabs = ({ profile, events, wallet }: Props) => {
  return (
    <Tabs defaultValue="from_events">
      <TabsList>
        <TabsTrigger value="from_events">From Events</TabsTrigger>
        <TabsTrigger value="profile_total">Profile Total</TabsTrigger>
      </TabsList>
      <TabsContent value="from_events">
        <AuraCard
          aura={events.reduce((acc, event) => acc + event.aura, 0)}
          title="From Events"
          description={
            wallet
              ? `you got ${events[0].aura > 0 ? "+" : ""}${events[0].aura} aura from last time.`
              : undefined
          }
          icon={<Brain className="h-4 w-4 text-muted-foreground" />}
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
          icon={<User className="h-4 w-4 text-muted-foreground" />}
        />
      </TabsContent>
    </Tabs>
  );
};
