import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { updateUsernameAction } from "@/features/profile/actions";

export const useModal = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      await updateUsernameAction(formData, userId);

      toast.success("Username was updated.");
    } catch {
      toast.error("Failed to change the username.");
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
