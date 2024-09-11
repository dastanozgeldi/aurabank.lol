import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectProfile } from "@/schema";

export function LeaderboardTable({ profiles }: { profiles: SelectProfile[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Aura</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-[300px] overflow-auto">
        {profiles.map((profile) => (
          <TableRow key={profile.userId}>
            <TableCell className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {/* <img
                src={user.imageUrl}
                alt={`Profile picture of ${user.firstName} ${user.lastName}`}
                className="h-8 w-8 rounded-full"
              /> */}
              <span className="ml-2">
                {/* {user.firstName} {user.lastName} */}
                {profile.userId}
              </span>
            </TableCell>
            <TableCell>{profile.totalAura}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
