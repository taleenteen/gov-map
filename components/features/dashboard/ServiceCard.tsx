import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  icon: LucideIcon;
  status?: "online" | "maintenance" | "offline";
  stats: {
    users: number;
    requests: number;
  };
  colorClass?: string;
}

export function ServiceCard({
  title,
  icon: Icon,
  status = "online",
  stats,
  colorClass = "bg-blue-50 text-blue-600",
}: ServiceCardProps) {
  const statusConfig = {
    online: { label: "ใช้งานได้", class: "bg-emerald-50 text-emerald-600" },
    maintenance: { label: "ปรับปรุง", class: "bg-orange-50 text-orange-600" },
    offline: { label: "ปิดระบบ", class: "bg-slate-100 text-slate-500" },
  };

  const currentStatus = statusConfig[status];

  return (
    <Card className="shadow-sm border-slate-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div
          className={cn(
            "p-2.5 rounded-xl transition-colors group-hover:scale-105",
            colorClass
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={cn(
            "text-[10px] font-medium px-2.5 py-1 rounded-full",
            currentStatus.class
          )}
        >
          {currentStatus.label}
        </span>
      </CardHeader>

      <CardContent>
        <CardTitle className="text-sm font-bold text-slate-800 mb-6 h-10 line-clamp-2 leading-snug">
          {title}
        </CardTitle>

        <div className="space-y-2.5 pt-2 border-t border-slate-50">
          <div className="flex justify-between text-xs items-center">
            <span className="text-muted-foreground">ผู้ใช้งาน</span>
            <span className="font-bold text-slate-700">
              {stats.users.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-xs items-center">
            <span className="text-muted-foreground">คำขอ</span>
            <span className="font-bold text-slate-700">
              {stats.requests.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
