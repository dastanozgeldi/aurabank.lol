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

export function LeaderboardTable({ data }: { data: SelectProfile[] }) {
  const { user } = useUser();

  const profiles = data.map((profile, index) => ({
    ...profile,
    rank: index + 1,
  }));

  const me = user
    ? profiles.find((profile) => profile.userId === user.id)
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
          <TableRow>
            <TableCell>{me.rank}</TableCell>
            <TableCell>{me.username ? `@${me.username}` : me.userId}</TableCell>
            <TableCell>{me.totalAura}</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
