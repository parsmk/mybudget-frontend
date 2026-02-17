export const DashboardCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-foreground/10 overflow-y-auto p-5 w-full h-full rounded-md">
      <h2 className="text-lg border-b-1 border-primary/50 p-3">{title}</h2>
      {children}
    </div>
  );
};
