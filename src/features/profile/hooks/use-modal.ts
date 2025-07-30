import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { updateUsernameAction } from "@/features/profile/actions";
import { useRouter } from "next/navigation";

export const useModal = (userId: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;

    try {
      setLoading(true);
      await updateUsernameAction(username, userId);

      toast.success("Username was updated.");
      router.push(`/${username}`);
    } catch {
      toast.error("Failed to update the username.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return {
    loading,
    open,
    setOpen,
    onSubmit,
  };
};
