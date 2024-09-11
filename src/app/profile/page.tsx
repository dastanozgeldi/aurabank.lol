"use client";

import { Button } from "@/components/ui/button";
import { setUsernameAction } from "./actions";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function ProfilePage() {
  const { isLoaded, user } = useUser();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      await setUsernameAction(formData);

      toast("Username set successfully.");
    } catch {
      toast("Username is already taken.");
    } finally {
      setLoading(false);
    }
  }

  if (!isLoaded) return null;
  return (
    <div className="my-4 flex flex-col items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="avatar"
        src={user!.imageUrl}
        className="h-24 w-24 rounded-full"
      />
      <div className="mt-3 text-lg font-semibold">{user!.fullName}</div>
      {/* <div>total aura: {profile.totalAura}</div> */}

      {/* {profile.username ? (
        <div className="mt-6">username: @{profile.username}</div>
      ) : ( */}
      <form onSubmit={onSubmit} className="mt-6 flex items-center">
        <Input
          disabled={loading}
          id="username"
          name="username"
          placeholder="dastanchik"
          minLength={3}
          maxLength={20}
          required
          autoComplete="off"
        />
        <Button disabled={loading}>set username</Button>
      </form>
      {/* )} */}
    </div>
  );
}
