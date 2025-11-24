import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: "up" | "down";
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendDirection = "up",
  className,
}: StatCardProps) {
  return (
    <Card className={cn("shadow-sm border-slate-100", className)}>
      <CardContent className="flex flex-col justify-between h-full gap-4">
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-xl bg-slate-50 text-slate-600">
            <Icon className="w-5 h-5" />
          </div>

          {trend && (
            <div
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1",
                trendDirection === "up"
                  ? "text-green-600 bg-green-50"
                  : "text-red-600 bg-red-50"
              )}
            >
              {trendDirection === "up" ? "↗" : "↘"} {trend}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">
            {value}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}
