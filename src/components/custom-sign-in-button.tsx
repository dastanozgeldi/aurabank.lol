import { SignInButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function CustomSignInButton() {
  return (
    <SignInButton>
      <Button size="sm">
        sign in <LogInIcon className="size-4" />
      </Button>
    </SignInButton>
  );
}
