"use client";

import { UserButton } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";

export default function CustomUserButton() {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Profile"
          labelIcon={<UserIcon className="size-4" />}
          href="/profile"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
