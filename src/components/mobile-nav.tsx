import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Logo from "./logo";
import MobileSidebar from "./mobile-sidebar";
import CustomUserButton from "./custom-user-button";

export async function MobileNav() {
  return (
    <div className="flex items-center justify-between md:hidden">
      <Logo />

      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton>
            <Button size="sm">
              <LogIn className="h-4 w-4" /> sign in
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <CustomUserButton />
        </SignedIn>

        <MobileSidebar />
      </div>
    </div>
  );
}
