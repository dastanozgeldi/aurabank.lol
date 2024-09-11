"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";
import { addEventAction } from "./actions";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export function AddEventModal() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      const result = await addEventAction(formData);

      toast("Event has been created.");
    } catch {
      toast("Failed to create event.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="w-full">
          <Plus className="mr-2 h-5 w-5" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Aura AI</DialogTitle>
          <DialogDescription>
            AI will automatically generate a title and calculate the aura
            gain/loss for you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="content">
              Describe an event that happened to you.
            </Label>
            <Textarea
              placeholder="Type your event details here."
              id="content"
              name="content"
            />
          </div>
          <DialogFooter className="mt-3 sm:justify-end">
            <DialogClose asChild>
              <Button disabled={loading} type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button disabled={loading}>
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
