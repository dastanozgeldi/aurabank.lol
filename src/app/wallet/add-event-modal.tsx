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
import { Plus } from "lucide-react";

export function AddEventModal() {
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
        <div>chat via vercel ai sdk will be here</div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
