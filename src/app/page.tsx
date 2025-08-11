import { Marquee } from "@/components/magicui/marquee";
import { AuraMarqueeCard } from "@/components/aura-marquee-card";
import Hero from "@/components/hero";
import { getHomepageEvents } from "@/features/event/db";

export default async function Home() {
  const events = await getHomepageEvents();

  const firstRow = events.slice(0, 5);
  const secondRow = events.slice(5);

  return (
    <div className="flex flex-col">
      <Hero />
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((event) => (
            <AuraMarqueeCard
              key={event.id}
              username={event.profile?.username ?? ""}
              content={event.content}
              aura={event.aura}
              imageUrl={event.profile.imageUrl}
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((event) => (
            <AuraMarqueeCard
              key={event.id}
              username={event.profile?.username ?? ""}
              content={event.content}
              aura={event.aura}
              imageUrl={event.profile.imageUrl}
            />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    </div>
  );
}
