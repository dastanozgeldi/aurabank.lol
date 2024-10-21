import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

export const useSnitch = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      console.log(formData);
      // await addSnitchAction(formData);

      toast.success("Snitched was added.");
    } catch {
      toast.error("Failed to add the snitch.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return {
    loading,
    onSubmit,
  };
};
