import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectEvent } from "@/schema";
import { User } from "@clerk/nextjs/server";

export function LeaderboardTable({
  users,
  events,
}: {
  users: User[];
  events: SelectEvent[];
}) {
  function calculateUserAura(userId: string): number {
    return events
      .filter((event) => event.userId === userId)
      .reduce((sum, event) => sum + event.aura, 0);
  }

  const test = users.map((user) => {
    return {
      ...user,
      totalAura: calculateUserAura(user.id),
    };
  });

  const finals = test.sort((a, b) => b.totalAura - a.totalAura);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Aura</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-[300px] overflow-auto">
        {finals.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.imageUrl}
                alt={`Profile picture of ${user.firstName} ${user.lastName}`}
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2">
                {user.firstName} {user.lastName}
              </span>
            </TableCell>
            <TableCell>{user.totalAura}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
