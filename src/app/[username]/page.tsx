"use client";

import { Button } from "@/components/ui/button";
import { setUsernameAction } from "./_actions";
import { Input } from "@/components/ui/input";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { SelectProfile } from "@/schema";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { AuraCard } from "@/components/aura-card";
import { User } from "lucide-react";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username.slice(3);
  const { isLoaded, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<SelectProfile | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setIsSubmitLoading(true);
      await setUsernameAction(formData);

      toast("Username set successfully.");
    } catch {
      toast("Username is already taken.");
    } finally {
      setIsSubmitLoading(false);
    }
  }

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/${username}`);
      const { profile } = await response.json();

      setProfile(profile);
    } catch {
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (!isLoaded) return null;
  return (
    <div className="my-4 flex flex-col items-center justify-center">
      {loading ? (
        <div className="w-full">
          <Skeleton className="h-8" />
          <Skeleton className="mt-3 h-24" />
        </div>
      ) : (
        <div className="w-full">
          <div className="text-lg font-semibold">@{profile?.username}</div>
          <div className="mt-3">
            <AuraCard
              aura={profile!.totalAura!}
              title="Profile Total"
              icon={<User className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        </div>
      )}

      {user?.id === profile?.userId && (
        <form onSubmit={onSubmit} className="mt-6">
          <Label htmlFor="username">new username</Label>
          <div className="flex items-center">
            <Input
              disabled={isSubmitLoading}
              id="username"
              name="username"
              minLength={3}
              maxLength={20}
              required
              autoComplete="off"
            />
            <Button className="ml-3" disabled={isSubmitLoading}>
              set username
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
