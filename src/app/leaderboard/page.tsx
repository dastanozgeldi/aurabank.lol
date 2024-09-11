import { clerkClient } from "@clerk/nextjs/server";
import { LeaderboardTable } from "./table";
import { db } from "@/server/db";
import { events as eventsTable } from "@/schema";

export default async function LeaderboardPage() {
  const events = await db.select().from(eventsTable);
  const { data: users } = await clerkClient().users.getUserList();

  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">Aura Leaderboard</h1>
      <LeaderboardTable users={users} events={events} />
    </div>
  );
}
