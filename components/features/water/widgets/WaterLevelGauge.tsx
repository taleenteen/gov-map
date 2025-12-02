import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WaterLevelGaugeProps {
  percentage?: number;
  currentVolume?: number;
  outflowVolume?: number;
  title?: string;
}

export function WaterLevelGauge({
  percentage = 75,
  currentVolume = 7211,
  outflowVolume = 2823,
  title = "หมุดปริมาณน้ำ 1",
}: WaterLevelGaugeProps) {
  // Calculate stroke dasharray for semi-circle
  // Radius = 80, Circumference = 2 * PI * 80 = ~502
  // Semi-circle = 251
  const radius = 80;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="w-full h-full shadow-sm border border-gray-100 rounded-3xl overflow-hidden bg-white">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">ปริมาณน้ำ</p>
          <CardTitle className="text-xl font-bold text-gray-900">
            {title}
          </CardTitle>
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-gray-100 hover:bg-gray-200 h-8 w-8"
        >
          <ArrowUpRight className="h-4 w-4 text-gray-500" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-6">
        <div className="relative w-64 h-32 mt-4 mb-2 flex justify-center overflow-hidden">
          <svg className="w-full h-64 transform -rotate-90 origin-center translate-y-8">
            {/* Background Track */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="24"
              strokeDasharray={circumference}
              strokeDashoffset="0"
              strokeLinecap="round"
              className="origin-center"
            />
            {/* Progress Arc (Orange part - Outflow/Remaining context? Image shows blue and orange) */}
            {/* Based on image: Blue is main volume, Orange is maybe capacity remaining or just style? 
                Actually image shows Blue (75%) and Orange (25%). 
                Let's render the full background as orange first, then overlay blue. 
            */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="#f97316" // Orange
              strokeWidth="24"
              strokeDasharray={circumference}
              strokeDashoffset="0"
              strokeLinecap="round"
              className="origin-center"
            />
            {/* Blue Progress */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="#3b82f6" // Blue
              strokeWidth="24"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="origin-center transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Text Overlay */}
          <div className="absolute bottom-0 flex flex-col items-center justify-end h-full pb-2">
            <span className="text-5xl font-bold text-gray-900">
              {percentage}%
            </span>
            <span className="text-sm text-gray-500">ปริมาณน้ำในแทงค์</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 w-full px-4 mt-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-900">
              {currentVolume.toLocaleString()} ลิตร
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-xs text-gray-500">ปริมาณน้ำปัจจุบัน</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-900">
              {outflowVolume.toLocaleString()} ลิตร
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-xs text-gray-500">ปริมาณน้ำออก</span>
            </div>
          </div>
        </div>

        <Button className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl h-12 text-base">
          ดูคุณภาพน้ำ
        </Button>
      </CardContent>
    </Card>
  );
}
