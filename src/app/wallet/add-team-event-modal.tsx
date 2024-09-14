"use client";

import { MultiSelect, type Option } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Users } from "lucide-react";

const data: Option[] = [
  { label: "nextjs", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Astro", value: "astro" },
];

export function AddTeamEventModal() {
  const onSubmit = () => console.log("yo pretend like this works");
  const loading = false;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="w-full">
          <Users className="mr-2 h-5 w-5" />
          Add Team Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <MultiSelect
          defaultOptions={data}
          placeholder="Select frameworks you like..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
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
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
