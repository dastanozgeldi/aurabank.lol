"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { links } from "@/data/config";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Menu className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>menu.</SheetTitle>
          <SheetDescription>click a link to navigate.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-3">
          {links.map((link) => (
            <Button
              key={link.label}
              variant="link"
              className="text-md w-max"
              onClick={() => setOpen(false)}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
