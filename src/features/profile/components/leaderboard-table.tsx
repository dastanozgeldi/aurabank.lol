"use client";

import * as React from "react";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => <div>{row.getValue("rank")}</div>,
    size: 50,
  },
  {
    accessorKey: "username",
    header: "User",
    cell: ({ row }) => (
      <Link href={`/${row.original.username}`}>@{row.getValue("username")}</Link>
    ),
  },
  {
    accessorKey: "totalAura",
    header: () => <div className="text-right">Aura</div>,
    cell: ({ row }) => {
      const aura = Number(row.getValue("totalAura"));
      return (
        <div className="text-right font-medium">{aura?.toLocaleString()}</div>
      );
    },
  },
];

export function LeaderboardTable({
  me,
  profiles,
}: {
  me: Profile | undefined;
  profiles: Profile[];
}) {
  const table = useReactTable({
    data: profiles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center">
        <Input
          placeholder="Filter usernames..."
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {me && (
          <TableFooter>
            <TableRow>
              <TableCell>{me.rank}</TableCell>
              <TableCell>
                <Link href={`/${me.username}`}>@{me.username}</Link>
              </TableCell>
              <TableCell className="text-right">
                {me.totalAura?.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          there are {profiles.length} users right now.
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
