import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col p-6">
      <div className="flex-grow">
        <h1 className="text-3xl font-extrabold">aura wallet.</h1>
        <p className="my-2">
          your aura changes everytime. sometimes you level it up, sometimes it
          drops to the lowest point.
        </p>
        <p className="my-2">
          we let you keep record of your aura and make the calculations fair
          with the decision-making powers of GPT-4o.
        </p>
        <Link href="/wallet">
          <Button size="lg" className="mt-4 text-lg font-semibold">
            start tracking your aura
          </Button>
        </Link>
      </div>
      <footer className="mx-auto text-center">
        brought to you by{" "}
        <a href="https://dastanozgeldi.me" className="font-semibold underline">
          @dastanozgeldi
        </a>
      </footer>
    </div>
  );
}
