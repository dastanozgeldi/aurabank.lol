import { useRouter } from "next/navigation";
import { useState, FormEvent, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { createSnitchAction } from "../actions";
import { SelectProfile } from "@/drizzle/schema";

export const useSnitch = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<SelectProfile[]>([]);

  async function onSubmit(
    event: FormEvent<HTMLFormElement>,
    username: string,
    setSelectedUsername: (username: string) => void,
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      await createSnitchAction(formData, username);

      toast.success("Snitch was created.");
    } catch {
      toast.error("Failed to create the snitch.");
    } finally {
      setLoading(false);
      setSelectedUsername("");
      router.refresh();
    }
  }

  const loadProfiles = useCallback(async () => {
    const res = await fetch("/api/profiles");
    const { profiles } = await res.json();

    setProfiles(profiles);
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  return { loading, profiles, onSubmit };
};
