import PlausibleProvider from "next-plausible";
import type { Metadata } from "next";
import { LogIn } from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

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
        <head>
          <PlausibleProvider domain="aurawallet.lol" />
        </head>
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

            <div className="flex items-center gap-3 sm:gap-6">
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "px-0 text-base sm:text-lg",
                )}
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
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "px-0 text-base sm:text-lg",
                  )}
                  href="/wallet"
                >
                  wallet
                </Link>
                <UserButton />
              </SignedIn>
            </div>
          </nav>

          <main className="mb-6 flex-grow">{children}</main>

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
