"use client";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UsernameSelector } from "../../features/snitch/components/username-selector";
import { useSnitch } from "../../features/snitch/hooks/use-snitch";

export default function Page() {
  const { loading, profiles, onSubmit } = useSnitch();
  const [selectedUsername, setSelectedUsername] = useState("");

  return (
    <div className="my-4">
      <div className="my-6">
        <h1 className="text-3xl font-bold">snitch on someone</h1>
        <p className="text-muted-foreground">
          snitch events will be displayed on user&apos;s profile.
        </p>
      </div>

      <form
        onSubmit={(event) =>
          onSubmit(event, selectedUsername, setSelectedUsername)
        }
        className="space-y-3"
      >
        <div className="grid w-full gap-1.5">
          <Label htmlFor="username">victim username</Label>
          <UsernameSelector
            profiles={profiles}
            selectedUsername={selectedUsername}
            setSelectedUsername={setSelectedUsername}
          />
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="content">what happened</Label>
          <Textarea
            required
            minLength={10}
            placeholder="he farted during the class"
            id="content"
            name="content"
          />
        </div>
        <Button disabled={loading || !selectedUsername} className="w-full">
          {loading && <Loader2 className="h-5 w-5 animate-spin" />}
          Submit
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
