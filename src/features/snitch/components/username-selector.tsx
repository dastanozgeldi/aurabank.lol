"use client";

import { CheckIcon, ChevronDownIcon, AtSignIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectProfile } from "@/drizzle/schema";
import { useState } from "react";

export const UsernameSelector = ({
  profiles,
  selectedUsername,
  setSelectedUsername,
}: {
  profiles: SelectProfile[];
  selectedUsername: string;
  setSelectedUsername: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedUsername ? (
            <span className="flex items-center">
              <AtSignIcon className="h-4 w-4 text-muted-foreground" />
              {selectedUsername}
            </span>
          ) : (
            "select username..."
          )}
          <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent p-0">
        <Command>
          <CommandInput
            placeholder="search a username, e.g. cristiano"
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No username found.</CommandEmpty>
            <CommandGroup>
              {profiles.map(
                ({ username, totalAura }) =>
                  username && (
                    <CommandItem
                      key={username}
                      value={username}
                      onSelect={(currentValue: string) => {
                        setSelectedUsername(
                          currentValue === selectedUsername ? "" : currentValue,
                        );
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2"
                    >
                      <div>
                        @{username} ({totalAura} aura)
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedUsername === username
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ),
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
