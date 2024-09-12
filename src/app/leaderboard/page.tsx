"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { LeaderboardTable } from "./table";
import { useLeaderboard } from "./use-leaderboard";

export default function LeaderboardPage() {
  const { loading, profiles } = useLeaderboard();

  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">Top 5 Aura</h1>

      {loading ? (
        <Skeleton className="h-[360px] w-full" />
      ) : (
        profiles && <LeaderboardTable profiles={profiles} />
      )}
    </div>
  );
}
