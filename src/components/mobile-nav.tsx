"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Menu } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <span className="flex items-center text-2xl font-extrabold md:text-3xl">
            <Menu className="mr-2 h-6 w-6" /> aura bank.
          </span>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black p-4">
        <div className="mb-4">
          <span className="text-2xl font-extrabold">aura bank.</span>
        </div>

        <div className="flex flex-col space-y-3">
          <MobileLink href="/" setOpen={setOpen}>
            home
          </MobileLink>
          <MobileLink href="/leaderboard" setOpen={setOpen}>
            top5
          </MobileLink>
          <SignedOut>
            <MobileLink disabled href="/wallet">
              wallet
            </MobileLink>
            <MobileLink disabled href="/snitch">
              snitch
            </MobileLink>
            <MobileLink disabled href="/profile">
              profile
            </MobileLink>

            <p className="text-center">sign in to unlock wallet & profile.</p>
          </SignedOut>
          <SignedIn>
            <MobileLink href="/wallet" setOpen={setOpen}>
              wallet
            </MobileLink>
            <MobileLink href="/snitch" setOpen={setOpen}>
              snitch
            </MobileLink>
            <MobileLink href="/profile" setOpen={setOpen}>
              profile
            </MobileLink>
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  setOpen?: (value: boolean) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function MobileLink({
  href,
  onOpenChange,
  setOpen,
  className,
  children,
  disabled,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Button disabled={disabled} variant="ghost" className="text-md w-max">
      <Link
        href={href}
        onClick={() => {
          router.push(href.toString());
          onOpenChange?.(false);
          setOpen?.(false);
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </Link>
    </Button>
  );
}
