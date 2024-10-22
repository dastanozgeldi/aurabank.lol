import Link from "next/link";
import { SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "./ui/button";

export const Nav = () => {
  return (
    <nav className="mr-6 hidden flex-grow items-center justify-between md:flex">
      <Link href="/">
        <h1 className="text-3xl font-extrabold">aura bank.</h1>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          className={cn(buttonVariants({ variant: "link" }), "px-0 text-lg")}
          href="/leaderboard"
        >
          top5
        </Link>
        <SignedOut>
          <SignInButton>
            <Button size="sm">
              <LogIn className="mr-2 h-4 w-4" /> sign in
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link
            className={cn(buttonVariants({ variant: "link" }), "px-0 text-lg")}
            href="/wallet"
          >
            wallet
          </Link>
          <Link
            className={cn(buttonVariants({ variant: "link" }), "px-0 text-lg")}
            href="/profile"
          >
            profile
          </Link>
        </SignedIn>
      </div>
    </nav>
  );
};
