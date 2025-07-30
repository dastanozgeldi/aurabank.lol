import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import Logo from "./logo";
import { LogInIcon } from "lucide-react";
import CustomUserButton from "./custom-user-button";

export function Nav() {
  return (
    <div className="hidden items-center justify-between gap-4 md:flex">
      <div className="w-full">
        <nav className="hidden grow items-center justify-between md:flex">
          <Logo />

          <div className="flex items-center gap-4">
            <Link
              className={cn(
                buttonVariants({ variant: "link" }),
                "px-0 text-lg",
              )}
              href="/leaderboard"
            >
              top5
            </Link>
            <SignedIn>
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "px-0 text-lg",
                )}
                href="/wallet"
              >
                wallet
              </Link>
              {/* <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "px-0 text-lg",
                )}
                href="/snitch"
              >
                snitch
              </Link> */}
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "px-0 text-lg",
                )}
                href="/premium"
              >
                premium
              </Link>
            </SignedIn>
          </div>
        </nav>
      </div>
      <SignedOut>
        <SignInButton>
          <Button size="sm">
            <LogInIcon className="h-4 w-4" /> sign in
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <CustomUserButton />
      </SignedIn>
    </div>
  );
}
