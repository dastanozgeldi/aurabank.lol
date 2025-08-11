"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useState } from "react";
import { createSnitchAction } from "../actions";
import { toast } from "sonner";

const initialState = {
  message: "",
};

export function CreateSnitchDialog({ username }: { username: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    createSnitchAction,
    initialState,
  );

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      setOpen(false);
      state.message = "";
    }
  }, [state?.message]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          New Snitch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Snitch on @{username}</DialogTitle>
          <DialogDescription>
            AI will automatically generate a title and calculate the aura.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid w-full gap-1.5">
            <input type="hidden" name="username" value={username} />
            <Label htmlFor="content">share what happened to them</Label>
            <Textarea
              placeholder="Type your event details here."
              id="content"
              name="content"
              required
            />
          </div>
          <DialogFooter className="mt-3 sm:justify-end">
            <Button disabled={pending}>
              {pending && <Loader2 className="h-5 w-5 animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
