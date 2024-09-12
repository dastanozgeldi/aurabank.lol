"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectProfile } from "@/schema";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export function LeaderboardTable({ profiles }: { profiles: SelectProfile[] }) {
  const { user } = useUser();

  const leaderboard = profiles.map((profile, index) => ({
    ...profile,
    rank: index + 1,
  }));

  const me = user
    ? leaderboard.find((profile) => profile.userId === user.id)
    : null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Aura</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-[300px] overflow-auto">
        {profiles.slice(0, 5).map((profile, index) => (
          <TableRow key={profile.userId}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {profile.username ? (
                <Link href={`/@${profile.username}`}>@{profile.username}</Link>
              ) : (
                profile.userId
              )}
            </TableCell>
            <TableCell>{profile.totalAura?.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {me && (
        <TableFooter>
          <TableRow className="h-14">
            <TableCell>{me.rank}</TableCell>
            <TableCell>
              {me.username ? (
                <Link href={`/@${me.username}`}>@{me.username}</Link>
              ) : (
                me.userId
              )}
            </TableCell>
            <TableCell>{me.totalAura?.toLocaleString()}</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
