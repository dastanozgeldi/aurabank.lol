"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Profile = {
  userId: string;
  username: string | null;
  totalAura: number | null;
  rank: number;
};

export function LeaderboardTable({
  me,
  profiles,
}: {
  me: Profile;
  profiles: Profile[];
}) {
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
                <Link href={`/${profile.userId}`}>@{profile.username}</Link>
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
                <Link href={`/${me.userId}`}>@{me.username}</Link>
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
