import { auth } from "@clerk/nextjs/server";
import { LeaderboardTable } from "@/features/profile/components/leaderboard-table";
import { getLeaderboard } from "@/features/profile/db";
import PageHeader from "@/components/page-header";

export default async function LeaderboardPage() {
  const { userId } = await auth();
  const profiles = await getLeaderboard();
  const me = profiles.find((profile) => profile.userId === userId);

  return (
    <>
      <PageHeader
        title="top 5 by aura"
        description="compete on who's more nonchalant."
      />
      <LeaderboardTable me={me} profiles={profiles} />
    </>
  );
}
