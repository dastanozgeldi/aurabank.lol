import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Plus } from "lucide-react";

export default async function WalletPage() {
  return (
    <div>
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Aura</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>

      <div className="my-4">
        <h1 className="text-2xl font-extrabold">events</h1>
        <div className="mt-3 h-[300px] space-y-3 overflow-auto">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="flex flex-row items-center justify-between font-bold">
                <h2 className="mb-2 text-xl">Example {index + 1}</h2>
                <span>-100</span>
              </div>
              <p className="text-muted-foreground">example of an aura loss.</p>
            </div>
          ))}
        </div>
      </div>

      <Button size="lg" variant="outline" className="w-full">
        <Plus className="mr-2 h-5 w-5" />
        Add Event
      </Button>
    </div>
  );
}
