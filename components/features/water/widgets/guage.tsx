"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

// --- 1. ส่วนประกอบ Gauge (วาดด้วย SVG) ---
interface GaugeProps {
  value: number; // 0 - 100
}

const WaterGauge = ({ value }: GaugeProps) => {
  // ค่าคงที่สำหรับการวาด
  const radius = 85;
  const strokeWidth = 20;
  const center = 100; // จุดกึ่งกลาง SVG (200x100)

  // คำนวณเส้นรอบวงสำหรับครึ่งวงกลม (Pi * r)
  const circumference = Math.PI * radius;
  // คำนวณระยะเส้นที่ต้องแสดงตาม % (Offset)
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* SVG Container */}
      <svg
        className="w-full h-48 transform -rotate-0" // ปรับความสูงตามต้องการ
        viewBox="0 0 200 110" // ViewBox ให้พอดีกับครึ่งวงกลม
      >
        {/* Definition สำหรับ Gradient สีฟ้า -> ส้ม */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" /> {/* สีฟ้า (blue-500) */}
            <stop offset="70%" stopColor="#3B82F6" /> {/* สีฟ้าลากยาวหน่อย */}
            <stop offset="100%" stopColor="#F97316" />{" "}
            {/* สีส้ม (orange-500) */}
          </linearGradient>
        </defs>

        {/* 1. เส้นพื้นหลัง (สีเทาจางๆ) */}
        <path
          d={`M ${center - radius},100 A ${radius},${radius} 0 0,1 ${
            center + radius
          },100`}
          fill="none"
          stroke="#F1F5F9" // slate-100
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* 2. เส้นกราฟแสดงผล (Gradient) */}
        <path
          d={`M ${center - radius},100 A ${radius},${radius} 0 0,1 ${
            center + radius
          },100`}
          fill="none"
          stroke="url(#gaugeGradient)" // ใช้ Gradient ที่ประกาศไว้
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference} // ความยาวเส้นทั้งหมด
          strokeDashoffset={strokeDashoffset} // จุดสิ้นสุดของเส้น
          className="transition-all duration-1000 ease-out" // Animation เวลาค่าเปลี่ยน
        />
      </svg>

      {/* Text ตรงกลาง */}
      <div className="absolute bottom-7 flex flex-col items-center translate-y-[-10px]">
        <span className="text-4xl font-bold text-slate-900">{value}%</span>
        <span className="text-sm text-slate-500">ปริมาณน้ำในแทงค์</span>
      </div>
    </div>
  );
};

// --- 2. ส่วนประกอบหลัก (Card Layout) ---
interface WaterLevelCardProps {
  onViewTrend?: () => void;
  onViewQuality?: () => void;
}

export default function WaterLevelCard({
  onViewTrend,
  onViewQuality,
}: WaterLevelCardProps) {
  return (
    <Card className="w-full max-w-sm shadow-lg rounded-3xl overflow-hidden border-slate-100 pb-1">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <p className="text-sm text-slate-400 font-medium">ปริมาณน้ำ</p>
          <CardTitle className="text-xl font-bold text-slate-800">
            หมุดปริมาณน้ำ 1
          </CardTitle>
        </div>
        {/* ปุ่มลูกศรวงกลม */}
        <div className="bg-slate-100 p-2 rounded-full cursor-pointer hover:bg-slate-200 transition">
          <ArrowUpRight
            className="w-5 h-5 text-slate-500"
            onClick={onViewTrend}
          />
        </div>
      </CardHeader>

      <CardContent className="p-3">
        {/* เรียกใช้ Gauge Component */}
        <WaterGauge value={50} />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 text-center px-2">
          {/* ซ้าย: ปริมาณน้ำปัจจุบัน */}
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-slate-800">7,211 ลิตร</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-sm text-slate-500">ปริมาณน้ำปัจจุบัน</span>
            </div>
          </div>

          {/* ขวา: ปริมาณน้ำออก */}
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-slate-800">2,823 ลิตร</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-sm text-slate-500">ปริมาณน้ำออก</span>
            </div>
          </div>
        </div>

        {/* ปุ่ม Action */}
        <Button
          className="w-full bg-btn-primary hover:bg-[#186343] text-text-field-default rounded-xl py-5 px-8 text-sm mt-3"
          onClick={onViewQuality}
        >
          ดูคุณภาพน้ำ
        </Button>
      </CardContent>
    </Card>
  );
}
