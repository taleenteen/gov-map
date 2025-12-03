"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Reusing Gauge Logic (Simplified for this view) ---
interface MiniGaugeProps {
  value: number;
}

const MiniGauge = ({ value }: MiniGaugeProps) => {
  const radius = 35; // Smaller radius
  const strokeWidth = 8;
  const center = 50;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-[100px] h-[60px]">
      <svg className="w-full h-full" viewBox="0 0 100 60">
        <defs>
          <linearGradient
            id="miniGaugeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path
          d={`M ${center - radius},50 A ${radius},${radius} 0 0,1 ${
            center + radius
          },50`}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={`M ${center - radius},50 A ${radius},${radius} 0 0,1 ${
            center + radius
          },50`}
          fill="none"
          stroke="url(#miniGaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute bottom-2 text-center">
        <span className="text-lg font-bold text-slate-900">{value}%</span>
      </div>
    </div>
  );
};

// --- Mock Data ---
const chartData = [
  { name: "แทงค์น้ำ 1", volume: 1000, outflow: 800 },
  { name: "แทงค์น้ำ 2", volume: 2000, outflow: 600 },
  { name: "แทงค์น้ำ 3", volume: 1200, outflow: 1400 },
  { name: "แทงค์น้ำ 4", volume: 1200, outflow: 1400 },
  { name: "แทงค์น้ำ 5", volume: 1200, outflow: 800 },
];

const tankList = [
  {
    id: 1,
    name: "แทงค์เก็บน้ำ 1",
    capacity: "8,000 ลิตร",
    volume: "6,400 ลิตร",
    percent: 75,
  },
  {
    id: 2,
    name: "แทงค์เก็บน้ำ 2",
    capacity: "8,000 ลิตร",
    volume: "6,400 ลิตร",
    percent: 75,
  },
  {
    id: 3,
    name: "แทงค์เก็บน้ำ 3",
    capacity: "8,000 ลิตร",
    volume: "6,400 ลิตร",
    percent: 75,
  },
  {
    id: 4,
    name: "แทงค์เก็บน้ำ 4",
    capacity: "8,000 ลิตร",
    volume: "6,400 ลิตร",
    percent: 75,
  },
  {
    id: 5,
    name: "แทงค์เก็บน้ำ 5",
    capacity: "8,000 ลิตร",
    volume: "6,400 ลิตร",
    percent: 75,
  },
];

interface WaterSystemOverviewProps {
  onBack: () => void;
}

export function WaterSystemOverview({ onBack }: WaterSystemOverviewProps) {
  return (
    <div className="w-full h-full flex flex-col gap-4 pointer-events-auto bg-transparent p-4 rounded-xl">
      {/* Header & Back Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="gap-2 bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
        </Button>
      </div>

      {/* Chart Section */}
      <Card className="w-full shadow-sm border-none bg-white rounded-2xl p-4">
        <div className="flex justify-between items-center bg-white mb-2">
          <div>
            <p className="text-sm text-slate-500">ภาพรวมระบบ</p>
            <h2 className="text-xl font-medium text-slate-900">
              ปริมาณน้ำของแทงค์ที่เชื่อมโยง
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
              <span className="text-sm text-slate-600">ปริมาณน้ำ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F97316]" />
              <span className="text-sm text-slate-600">ปริมาณน้ำออก</span>
            </div>
          </div>
        </div>
        <div className="h-[230px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barSize={40}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />

              <Bar
                dataKey="volume"
                name="ปริมาณน้ำ"
                stackId="a"
                fill="#3B82F6"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="outflow"
                name="ปริมาณน้ำออก"
                stackId="a"
                fill="#F97316"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Tank List Section */}
      <div className="space-y-3 bg-white rounded-2xl mt-5 p-3 overflow-auto">
        <div className="flex justify-between items-center pt-2">
          <div>
            <p className="text-sm text-slate-500">แทงค์ที่เชื่อมโยง</p>
            <h3 className="text-lg font-medium text-slate-900">
              รายการแท็งก์น้ำทั้งหมด
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 ">
          {tankList.map((tank) => (
            <Card
              key={tank.id}
              className="border-none shadow-sm bg-white rounded-2xl overflow-hidden"
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-lg font-medium text-slate-900">
                    {tank.name}
                  </h4>
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0 text-sm">
                    <span className="text-slate-500">ชื่อแทงค์:</span>
                    <span className="text-slate-900 font-medium">
                      หมุดปริมาณน้ำ {tank.id + 1}
                    </span>
                    <span className="text-slate-500">ความจุแทงค์:</span>
                    <span className="text-slate-900 font-medium">
                      {tank.capacity}
                    </span>
                    <span className="text-slate-500">ปริมาณน้ำ:</span>
                    <span className="text-slate-900 font-medium">
                      {tank.volume}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <MiniGauge value={tank.percent} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
