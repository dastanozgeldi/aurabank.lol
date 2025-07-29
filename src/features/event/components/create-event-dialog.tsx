"use client";

import { ArrowRight, Loader2, Plus } from "lucide-react";
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
import { useModal } from "../hooks/use-modal";

export function CreateEventDialog() {
  const { loading, open, setOpen, onSubmit } = useModal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-5 w-5" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black sm:max-w-md">
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
            <Button disabled={loading}>
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              Submit
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
