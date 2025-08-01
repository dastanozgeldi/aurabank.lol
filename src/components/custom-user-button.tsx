"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";

export default function CustomUserButton() {
  const { user } = useUser();

  if (user == null) return null;
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Profile"
          labelIcon={<UserIcon className="size-4" />}
          href={`/${user?.username}`}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
