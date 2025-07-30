"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { completeOnboardingAction } from "@/features/profile/actions";
import PageHeader from "@/components/page-header";
import { ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const [error, setError] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboardingAction(formData);
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
    <>
      <PageHeader
        title="before we begin"
        description="think of an username with most aura."
      />

      <form action={handleSubmit}>
        <div className="space-y-2">
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
        <Button className="mt-3 w-full">
          finish registration <ArrowRight />
        </Button>
      </form>
    </>
  );
}
