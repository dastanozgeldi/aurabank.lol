"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { completeOnboarding } from "./_actions";
import { toast } from "sonner";

export default function OnboardingPage() {
  const [error, setError] = React.useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      // Reloads the user's data from Clerk's API
      router.push("/");
      await user?.reload();
      router.refresh();

      toast.success("Registration complete! Go to your wallet asap.");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <div>
      <h1 className="my-4 text-center text-2xl font-bold">before we begin</h1>
      <form action={handleSubmit}>
        <div>
          <Label htmlFor="username">username</Label>
          <Input
            id="username"
            name="username"
            autoComplete="off"
            required
            minLength={3}
            maxLength={20}
          />
        </div>

        {error && <p className="text-red-600">Error: {error}</p>}
        <Button className="mt-4 w-full">finish registration</Button>
      </form>
    </div>
  );
}
