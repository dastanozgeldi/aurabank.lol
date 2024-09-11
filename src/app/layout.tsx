import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aura Wallet",
  description: "Calculate your aura using AI by @dastanozgeldi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={cn(
            geistSans.variable,
            geistMono.variable,
            "mx-auto flex min-h-screen max-w-xl flex-col p-6 antialiased",
          )}
        >
          <nav className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-extrabold sm:text-3xl">
                aura wallet.
              </h1>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                className={cn(buttonVariants({ variant: "link" }), "px-0")}
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
                  className={cn(buttonVariants({ variant: "link" }), "px-0")}
                  href="/wallet"
                >
                  wallet
                </Link>
                <Link
                  className={cn(buttonVariants({ variant: "link" }), "px-0")}
                  href="/profile"
                >
                  profile
                </Link>
                <UserButton />
              </SignedIn>
            </div>
          </nav>

          <main className="flex-grow">{children}</main>

          <footer className="mt-auto text-center">
            brought to you by{" "}
            <a
              href="https://dastanozgeldi.me"
              className="font-semibold underline"
            >
              @dastanozgeldi
            </a>
          </footer>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
