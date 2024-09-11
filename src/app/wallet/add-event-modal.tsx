import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
        <form
          action={async (formData: FormData) => {
            "use server";
            // generate gpt-4o completion
            console.log("got this content", formData.get("content"));
          }}
        >
          <div className="grid w-full gap-1.5">
            <Label htmlFor="content">
              Describe an event that happened to you.
            </Label>
            <Textarea
              placeholder="Type your message here."
              id="content"
              name="content"
            />
          </div>
          <Button className="mt-3">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
