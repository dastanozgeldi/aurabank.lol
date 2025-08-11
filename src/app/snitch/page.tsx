"use client";

import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { createSnitchAction } from "@/features/snitch/actions";

const initialState = {
  message: "",
};

export default function SnitchPage() {
  const [state, formAction, pending] = useActionState(
    createSnitchAction,
    initialState,
  );

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
    }
  }, [state?.message]);

  return (
    <>
      <PageHeader
        title="snitch on someone"
        description="snitch events will be displayed on user's profile."
      />

      <form action={formAction} className="space-y-3">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="username">victim username</Label>
          <Input id="username" name="username" required />
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="content">what happened</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="farted during the class"
            required
          />
        </div>
        <Button disabled={pending}>
          {pending && <Loader2 className="h-5 w-5 animate-spin" />}
          Snitch
        </Button>
      </form>
    </>
  );
}
