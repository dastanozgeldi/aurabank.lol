import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { SelectProfile } from "@/schema";

export const useLeaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<SelectProfile[] | null>(null);

  const loadLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/leaderboard");
      const { profiles } = await response.json();
      setProfiles(profiles);
    } catch {
      toast.error("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  return {
    loading,
    profiles,
  }
};
