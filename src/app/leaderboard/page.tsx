import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { Skeleton } from "@/components/ui/skeleton";
import { LeaderboardTable } from "./leaderboard-table";
import { getLeaderboard } from "@/drizzle/queries";

export default async function LeaderboardPage() {
  const { userId } = await auth();
  const profiles = await getLeaderboard();
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
