import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { addEventAction } from "./actions";

export const useModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      await addEventAction(formData);

      toast.success("Event was added.");
    } catch {
      toast.error("Failed to add the event.");
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
