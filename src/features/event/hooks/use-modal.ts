import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { createEventAction } from "../actions";

export const useModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      await createEventAction(formData);

      toast.success("Event was created.");
    } catch {
      toast.error("Failed to create the event.");
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  }

  return {
    loading,
    open,
    setOpen,
    onSubmit,
  };
};
