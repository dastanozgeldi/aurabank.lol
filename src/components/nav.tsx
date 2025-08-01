import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { links } from "@/data/config";
import { Button } from "./ui/button";
import CustomUserButton from "./custom-user-button";
import CustomSignInButton from "./custom-sign-in-button";
import Logo from "./logo";

export function Nav() {
  return (
    <nav className="hidden items-center justify-between md:flex">
      <Logo />

      <div className="flex items-center gap-4">
        <SignedIn>
          <div className="flex items-center gap-4">
            {links.map((link) => (
              <Button
                key={link.label}
                asChild
                className="px-0 text-lg"
                variant="link"
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </SignedIn>
        <SignedOut>
          <CustomSignInButton />
        </SignedOut>
        <SignedIn>
          <CustomUserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
