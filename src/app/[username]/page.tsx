"use client";

import { useUser } from "@clerk/nextjs";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { AuraCard } from "@/components/aura-card";
import { useProfile } from "./use-profile";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username.slice(3);
  const { user: me } = useUser();

  const { loading, profile, user, isSubmitLoading, onSubmit } =
    useProfile(username);

  return (
    <div className="my-4 flex flex-col items-center justify-center">
      {loading ? (
        <>
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="mt-3 h-6 w-[200px]" />
        </>
      ) : (
        user && (
          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="avatar"
              src={user.imageUrl}
              className="h-24 w-24 rounded-full"
            />
            <div className="mt-3 text-center text-lg font-semibold">
              {user.firstName} {user.lastName}
            </div>
          </div>
        )
      )}

      {loading ? (
        <>
          <Skeleton className="mt-3 h-6 w-[200px]" />
          <Skeleton className="mt-3 h-24 w-full" />
        </>
      ) : (
        profile && (
          <div className="w-full">
            <div className="text-center text-lg">@{profile.username}</div>
            <div className="mt-3">
              <AuraCard
                aura={profile.totalAura!}
                title="Profile Total"
                icon={<UserIcon className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
          </div>
        )
      )}

      {me && profile && me.id === profile.userId && (
        <form onSubmit={onSubmit} className="mt-6 w-full">
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
