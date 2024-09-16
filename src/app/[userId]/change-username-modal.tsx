"use client";

import { Loader2, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "./use-modal";

export function ChangeUsernameModal({ userId }: { userId: string }) {
  const { loading, open, setOpen, onSubmit } = useModal(userId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="w-full">
          <UserCog className="mr-2 h-5 w-5" />
          Change Username
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Username</DialogTitle>
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
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
