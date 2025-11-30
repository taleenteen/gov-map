import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface PumpStatus {
  id: string;
  name: string;
  isActive: boolean;
  status: "Active" | "Inactive" | "Maintenance";
  dailyVolume: number;
  lastUpdate: string;
}

interface PumpStatusListProps {
  pumps?: PumpStatus[];
}

export function PumpStatusList({
  pumps = [
    {
      id: "1",
      name: "ปั๊มน้ำ 1",
      isActive: true,
      status: "Active",
      dailyVolume: 116391,
      lastUpdate: "08:35",
    },
    {
      id: "2",
      name: "ปั๊มน้ำ 2",
      isActive: false,
      status: "Inactive",
      dailyVolume: 130033,
      lastUpdate: "08:35",
    },
  ],
}: PumpStatusListProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full">
      {pumps.map((pump) => (
        <Card
          key={pump.id}
          className="shadow-sm border border-gray-100 rounded-3xl overflow-hidden bg-white h-full"
        >
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-900">{pump.name}</h3>
              <Switch
                checked={pump.isActive}
                className="data-[state=checked]:bg-emerald-600"
              />
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">สถานะ:</span>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    pump.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  {pump.isActive ? "กำลังทำงาน" : "หยุดทำงาน"}
                </span>
              </div>

              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">วันนี้สูบน้ำ:</span>
                  <span className="text-lg font-bold text-gray-900">
                    {pump.dailyVolume.toLocaleString()} ลิตร
                  </span>
                </div>
                <span className="text-lg font-medium text-gray-900">
                  {pump.lastUpdate}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
