import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <p className="my-2">
        your aura changes everytime. sometimes you level it up, sometimes it
        drops to the lowest point.
      </p>
      <p className="my-2">
        we let you keep record of your aura and make the calculations fair with
        the decision-making powers of GPT-4o.
      </p>
      <Link href="/wallet" className="max-w-max">
        <Button size="lg" className="mt-4 text-lg font-semibold">
          start tracking your aura <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
