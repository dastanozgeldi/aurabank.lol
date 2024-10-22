"use client";
import { Input } from "@/components/ui/input";
import { useSnitch } from "./use-snitch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const { loading, onSubmit } = useSnitch();

  return (
    <div className="my-4">
      <h1 className="my-4 text-center text-2xl font-bold">snitch on someone</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="username">victim username</Label>
          <Input
            placeholder="type a username, e.g. @cristiano"
            id="username"
            name="username"
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="content">what happened</Label>
          <Textarea
            placeholder="he farted during the class"
            id="content"
            name="content"
          />
        </div>
        <Button disabled={loading} className="w-full">
          {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Submit
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
