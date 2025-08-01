import { FlameIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export async function AuraCard({ totalAura }: { totalAura: number }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Profile Total</CardTitle>
        <FlameIcon className="text-muted-foreground size-5" />
      </CardHeader>
      <CardContent>
        <div className="font-sans text-2xl font-black">
          {totalAura.toLocaleString()} aura
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        go to wallet to get aura.
      </CardFooter>
    </Card>
  );
}
