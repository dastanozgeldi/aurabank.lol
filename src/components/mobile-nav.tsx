import { SignedIn, SignedOut } from "@clerk/nextjs";
import Logo from "./logo";
import MobileSidebar from "./mobile-sidebar";
import CustomUserButton from "./custom-user-button";
import CustomSignInButton from "./custom-sign-in-button";

export async function MobileNav() {
  return (
    <div className="flex items-center justify-between md:hidden">
      <Logo />

      <div className="flex items-center gap-3">
        <SignedOut>
          <CustomSignInButton />
        </SignedOut>
        <SignedIn>
          <CustomUserButton />
          <MobileSidebar />
        </SignedIn>
      </div>
    </div>
  );
}
