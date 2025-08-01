import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AuraMarqueeCard({
  imageUrl,
  username,
  content,
  aura,
}: {
  imageUrl: string | null;
  username: string;
  content: string;
  aura: number;
}) {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={imageUrl ?? undefined} className="object-cover" />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              @{username}
            </figcaption>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="text-muted-foreground text-xs">
            {aura > 0 && "+"}
            {aura.toLocaleString()} aura
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{content}</blockquote>
    </figure>
  );
}
