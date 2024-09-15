import { User } from "@clerk/nextjs/server";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { SelectProfile } from "@/schema";
import { setUsernameAction } from "./_actions";
import { useRouter } from "next/navigation";

export const useProfile = (username: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<SelectProfile | null | undefined>(
    null,
  );
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/${username}`);
      const { profile, user } = await response.json();

      setProfile(profile);
      setUser(user);
    } catch {
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setIsSubmitLoading(true);
      await setUsernameAction(formData);

      toast("Username set successfully.");

      router.push(`/@${formData.get("username")}`);
    } catch {
      toast("Username is already taken.");
    } finally {
      setIsSubmitLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    loading,
    profile,
    user,
    isSubmitLoading,
    onSubmit,
  };
};
