import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CrownIcon, SparklesIcon, SwordsIcon, ZapIcon } from "lucide-react";
import { env } from "@/data/env/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

const benefits = [
  {
    title: "2x Aura Points",
    description: "Double your aura from every event",
    icon: <ZapIcon className="text-primary h-4 w-4" />,
  },
  {
    title: "Snitching on someone",
    description: "Snitch on someone to get their aura points",
    icon: <SwordsIcon className="text-primary h-4 w-4" />,
  },
];

export default async function PremiumPage() {
  const user = await currentUser();

  const metadata = JSON.stringify({
    clerk_user_id: user?.id,
  });
  const encodedMetadata = encodeURIComponent(metadata);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="border-primary/20 from-background to-primary/5 w-full max-w-md border-2 bg-gradient-to-br">
          <CardHeader className="text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <CrownIcon className="text-primary h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold">Premium Plan</CardTitle>
            <CardDescription className="text-lg">
              Unlock your full aura potential
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Pricing */}
            <div className="text-center">
              <div className="text-4xl font-extrabold">$3</div>
              <div className="text-muted-foreground text-sm">per month</div>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="border-primary/20 bg-primary/5 rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    {benefit.icon}
                    <div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Benefits */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <SparklesIcon className="text-primary h-4 w-4" />
                <span className="text-sm">Premium badge on profile</span>
              </div>
              <div className="flex items-center gap-3">
                <SparklesIcon className="text-primary h-4 w-4" />
                <span className="text-sm">Priority leaderboard placement</span>
              </div>
            </div>

            <Button asChild className="w-full" size="lg">
              <Link
                href={`/api/checkout?products=${env.POLAR_PRODUCT_ID}&customerEmail=${user?.emailAddresses[0].emailAddress}&metadata=${encodedMetadata}`}
              >
                Upgrade to Premium
              </Link>
            </Button>

            <p className="text-muted-foreground text-center text-xs">
              Cancel anytime. No hidden fees.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
