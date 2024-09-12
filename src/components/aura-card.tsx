import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface Props {
  aura: number;
  title: string;
  description?: string;
  icon: React.ReactNode;
}

export const AuraCard = ({ aura, title, description, icon }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="font-sans text-2xl font-black">
          {aura.toLocaleString()}
        </div>

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
