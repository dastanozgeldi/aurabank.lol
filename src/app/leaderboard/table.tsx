import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
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
  me: Profile | undefined;
  profiles: Profile[];
}) {
  return (
    <Table>
      <TableCaption>there are {profiles.length} users right now.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-right">Aura</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-[300px] overflow-auto">
        {profiles.slice(0, 5).map((profile, index) => (
          <TableRow key={profile.userId}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Link href={`/${profile.userId}`}>@{profile.username}</Link>
            </TableCell>
            <TableCell className="text-right">
              {profile.totalAura?.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {me && (
        <TableFooter>
          <TableRow className="h-14">
            <TableCell>{me.rank}</TableCell>
            <TableCell>
              <Link href={`/${me.userId}`}>@{me.username}</Link>
            </TableCell>
            <TableCell className="text-right">
              {me.totalAura?.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
