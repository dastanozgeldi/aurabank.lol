import { Suspense } from "react";
import { desc, sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { Skeleton } from "@/components/ui/skeleton";
import { profilesTable } from "@/server/schema";
import { db } from "@/server/db";
import { LeaderboardTable } from "./leaderboard-table";

export default async function LeaderboardPage() {
  const { userId } = auth();
  const profiles = await db
    .select({
      userId: profilesTable.userId,
      username: profilesTable.username,
      totalAura: profilesTable.totalAura,
      rank: sql<number>`rank() over (order by ${profilesTable.totalAura} desc)`.as(
        "rank",
      ),
    })
    .from(profilesTable)
    .orderBy(desc(profilesTable.totalAura));

  const me = profiles.find((profile) => profile.userId === userId);

  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">Top 5 Aura</h1>

      <Suspense fallback={<Skeleton className="h-[360px] w-full" />}>
        <LeaderboardTable me={me} profiles={profiles} />
      </Suspense>
    </div>
  );
}
