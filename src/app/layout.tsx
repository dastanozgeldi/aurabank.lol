import { LogIn } from "lucide-react";
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
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
import Footer from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aurabank.lol"),
  title: "Aura Bank",
  description:
    "Track your daily aura in a wallet using AI and compete with others!",
  keywords: ["Aura", "Bank", "Wallet", "AI", "dastanozgeldi", "Next.js"],
  authors: [{ name: "Dastan Ozgeldi", url: "https://ozgeldi.tech" }],
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        >
          <main className="mx-auto flex min-h-screen max-w-2xl flex-col p-6">
            <Nav />
            <MobileNav />

            <div className="mb-6 grow">{children}</div>

            <Footer />
          </main>

          <Toaster />
        </body>
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      </html>
    </ClerkProvider>
  );
}
