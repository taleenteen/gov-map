"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Activity, CheckCircle2, Clock, XCircle, FileText } from "lucide-react"; // Icons

export type ActivityStatus = "approved" | "pending" | "rejected" | "review";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  detail: string;
  status: ActivityStatus;
  time: string;
}

interface RecentActivityListProps {
  title?: string;
  items: ActivityItem[];
  className?: string;
}

export function RecentActivityList({
  title = "กิจกรรมล่าสุด",
  items,
  className,
}: RecentActivityListProps) {
  // Helper สำหรับเลือกสีและข้อความของสถานะ
  const getStatusConfig = (status: ActivityStatus) => {
    switch (status) {
      case "approved":
        return {
          label: "อนุมัติ",
          class: "bg-green-50 text-green-700 border-green-100",
        };
      case "pending":
        return {
          label: "รอดำเนินการ",
          class: "bg-orange-50 text-orange-700 border-orange-100",
        };
      case "rejected":
        return {
          label: "ปฏิเสธ",
          class: "bg-red-50 text-red-700 border-red-100",
        };
      case "review":
        return {
          label: "อัปเดต",
          class: "bg-purple-50 text-purple-700 border-purple-100",
        };
      default:
        return { label: status, class: "bg-gray-50 text-gray-700" };
    }
  };

  return (
    <Card className={cn("shadow-sm border-slate-100", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-bold text-slate-800">
          {title}
        </CardTitle>
        <Button variant="outline" size="sm" className="text-xs h-8">
          ดูทั้งหมด
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        {" "}
        {/* px-0 เพื่อให้เส้น border ยาวเต็ม */}
        <div className="flex flex-col">
          {items.map((item, index) => {
            const statusConfig = getStatusConfig(item.status);

            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center justify-between p-4 hover:bg-slate-50 transition-colors",
                  index !== items.length - 1 && "border-b border-slate-50" // เส้นคั่น
                )}
              >
                {/* Left: Icon & Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar Icon Placeholder */}
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-slate-900">
                      {item.user}{" "}
                      <span className="font-normal text-slate-500">
                        {item.action}
                      </span>
                    </p>
                    <p className="text-xs text-slate-400">{item.detail}</p>
                  </div>
                </div>

                {/* Right: Status & Time */}
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-medium border",
                      statusConfig.class
                    )}
                  >
                    {statusConfig.label}
                  </span>
                  <span className="text-xs text-slate-400 min-w-[60px] text-right">
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
