import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  children,
  action,
  className,
}: ChartCardProps) {
  return (
    <Card
      className={cn(
        "shadow-sm border-slate-100 flex flex-col h-full",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800">
          {title}
        </CardTitle>
        {action}
      </CardHeader>

      <CardContent className="flex-1 min-h-[200px]">{children}</CardContent>
    </Card>
  );
}
