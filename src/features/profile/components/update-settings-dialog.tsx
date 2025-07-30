"use client";

import { ArrowRightIcon, Loader2, UserCog } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialog } from "../hooks/use-dialog";

export function UpdateSettingsDialog({ userId }: { userId: string }) {
  const { loading, open, setOpen, onSubmit } = useDialog(userId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline">
          <UserCog className="h-5 w-5" />
          update settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Settings</DialogTitle>
          <DialogDescription>
            what you write here will be visible to everyone else.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="username">new username</Label>
            <Input
              id="username"
              name="username"
              autoComplete="off"
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <DialogFooter className="mt-3 sm:justify-end">
            <Button disabled={loading}>
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              Submit
              {!loading && <ArrowRightIcon />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
