import { LogIn } from "lucide-react";
import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/nav";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
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
  metadataBase: new URL("https://aurabank.lol"),
  title: "Aura Bank",
  description:
    "Track your daily aura in a wallet using AI and compete with others!",
  keywords: ["Aura", "Bank", "Wallet", "AI", "dastanozgeldi", "Next.js"],
  authors: [
    {
      name: "Dastan Ozgeldi",
      url: "https://ozgeldi.tech",
    },
  ],
  creator: "Dastan Ozgeldi",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Aura Bank",
    description:
      "Track your daily aura in a wallet using AI and compete with others!",
    siteName: "Aura Bank",
    url: "https://aurabank.lol",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Bank",
    description:
      "Track your daily aura in a wallet using AI and compete with others!",
    images: "/og-image.png",
    creator: "@dastanozgeldi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark">
        <body
          className={cn(geistSans.variable, geistMono.variable, "antialiased")}
        >
          <main className="mx-auto flex min-h-screen max-w-xl flex-col p-6">
            <div className="flex items-center justify-between">
              <div className="w-full">
                <Nav />
                <MobileNav />
              </div>
              <SignedOut>
                <SignInButton>
                  <Button size="sm">
                    <LogIn className="mr-2 h-4 w-4" /> sign in
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            <div className="mb-6 flex-grow">{children}</div>

            <footer className="mt-auto text-center">
              brought to you by{" "}
              <a
                href="https://ozgeldi.tech"
                className="font-semibold underline"
              >
                @dastanozgeldi
              </a>
            </footer>
          </main>

          <Toaster />
        </body>
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      </html>
    </ClerkProvider>
  );
}
