export default function PageHeader({
  title,
  description,
  button,
}: {
  title: string;
  description?: string;
  button?: React.ReactNode;
}) {
  return (
    <div className="my-6 flex items-center justify-between">
      <div>
        <h1 className="md:text-3xl text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {button}
    </div>
  );
}
