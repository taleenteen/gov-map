import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TankInfoProps {
  type?: string;
  shape?: string;
  size?: string;
  capacity?: string;
  sourceType?: string;
  location?: string;
  installDate?: string;
}

export function TankInfo({
  type = "ถังเหล็ก",
  shape = "ทรงกระบอก",
  size = "Ø 3.2 ม. × สูง 4.5 ม.",
  capacity = "8,000 ลิตร",
  sourceType = "บ่อบาดาล",
  location = "13.735200, 100.412300",
  installDate = "พ.ศ.2568",
}: TankInfoProps) {
  const items = [
    { label: "ประเภทแท็งก์น้ำ", value: type },
    { label: "รูปทรงแท็งก์น้ำ", value: shape },
    { label: "ขนาด", value: size },
    { label: "ความจุ", value: capacity, highlight: true },
    { label: "ประเภทแหล่งน้ำ", value: sourceType },
    { label: "ตำแหน่ง", value: location },
    { label: "วันที่ติดตั้ง", value: installDate },
  ];

  return (
    <Card className="w-full h-full shadow-sm border border-gray-100 rounded-3xl overflow-hidden bg-white p-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 p-0 pt-3">
          <p className="text-sm text-gray-500">ข้อมูลแท็งก์น้ำ</p>
          <p className="text-xl font-bold text-gray-900">รายละเอียดแท็งก์น้ำ</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 px-3">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0"
            >
              <span className="text-sm text-gray-500">{item.label}</span>
              <span
                className={`text-sm font-medium ${
                  item.highlight ? "text-gray-900 font-bold" : "text-gray-900"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
