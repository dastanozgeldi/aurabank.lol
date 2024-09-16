import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { setUsernameAction } from "./_actions";

export const useModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      await setUsernameAction(formData);

      toast.success("Username was changed.");
    } catch {
      toast.error("Failed to change the username.");
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  };

  return {
    loading,
    open,
    setOpen,
    onSubmit,
  };
};
