"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Droplets, Clock, CalendarDays } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// --- Mock Data ---
const dayData = [
  { name: "00:00", volume: 2200, outflow: 500 },
  { name: "03:00", volume: 3800, outflow: 2400 },
  { name: "06:00", volume: 4500, outflow: 2800 },
  { name: "09:00", volume: 2000, outflow: 4800 },
  { name: "12:00", volume: 2500, outflow: 1800 },
  { name: "15:00", volume: 1500, outflow: 1000 },
  { name: "18:00", volume: 3500, outflow: 2500 },
  { name: "21:00", volume: 4200, outflow: 3000 },
];

const weekData = [
  { name: "จ", volume: 3000, outflow: 2000 },
  { name: "อ", volume: 4500, outflow: 3500 },
  { name: "พ", volume: 3200, outflow: 4000 },
  { name: "พฤ", volume: 2800, outflow: 2500 },
  { name: "ศ", volume: 3600, outflow: 1800 },
  { name: "ส", volume: 4800, outflow: 3000 },
  { name: "อา", volume: 4000, outflow: 3800 },
];

const monthData = [
  { name: "ก.ค.", volume: 3500, outflow: 2500 },
  { name: "ส.ค.", volume: 4200, outflow: 3000 },
  { name: "ก.ย.", volume: 3800, outflow: 2800 },
  { name: "ต.ค.", volume: 4500, outflow: 3500 },
  { name: "พ.ย.", volume: 3000, outflow: 2000 },
  { name: "ธ.ค.", volume: 2800, outflow: 1800 },
  { name: "ม.ค.", volume: 3200, outflow: 2200 },
  { name: "ก.พ.", volume: 3600, outflow: 2600 },
  { name: "มี.ค.", volume: 4000, outflow: 3000 },
  { name: "เม.ย.", volume: 3400, outflow: 2400 },
  { name: "พ.ค.", volume: 3800, outflow: 2800 },
  { name: "มิ.ย.", volume: 4200, outflow: 3200 },
];

const barChartData = [
  { month: "ก.ค.", year2567: 800, year2568: 1200 },
  { month: "ส.ค.", year2567: 1400, year2568: 1900 },
  { month: "ก.ย.", year2567: 1600, year2568: 2400 },
  { month: "ต.ค.", year2567: 3400, year2568: 3000 },
  { month: "พ.ย.", year2567: 3000, year2568: 2000 },
  { month: "ธ.ค.", year2567: 3400, year2568: 3000 },
  { month: "ม.ค.", year2567: 3000, year2568: 2000 },
  { month: "ก.พ.", year2567: 1400, year2568: 1900 },
  { month: "มี.ค.", year2567: 3000, year2568: 2000 },
  { month: "เม.ย.", year2567: 3000, year2568: 2000 },
  { month: "พ.ค.", year2567: 3000, year2568: 2000 },
  { month: "มิ.ย.", year2567: 3000, year2568: 2000 },
];

interface WaterTrendOverviewProps {
  onBack: () => void;
}

export function WaterTrendOverview({ onBack }: WaterTrendOverviewProps) {
  const [activeTab, setActiveTab] = React.useState<"day" | "week" | "month">(
    "day"
  );

  const getChartData = () => {
    switch (activeTab) {
      case "day":
        return dayData;
      case "week":
        return weekData;
      case "month":
        return monthData;
      default:
        return dayData;
    }
  };

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

      {/* Area Chart Section */}
      <Card className="w-full shadow-sm border-none bg-white rounded-2xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">แนวโน้มปริมาณน้ำ</p>
            <h2 className="text-xl font-bold text-slate-900">
              หมุดปริมาณน้ำ 1
            </h2>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-slate-600">ปริมาณน้ำ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400" />
              <span className="text-slate-600">ปริมาณน้ำออก</span>
            </div>
          </div>
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("day")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                activeTab === "day"
                  ? "text-blue-600 bg-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              วัน
            </button>
            <button
              onClick={() => setActiveTab("week")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                activeTab === "week"
                  ? "text-blue-600 bg-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              สัปดาห์
            </button>
            <button
              onClick={() => setActiveTab("month")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                activeTab === "month"
                  ? "text-blue-600 bg-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              เดือน
            </button>
          </div>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getChartData()}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorVolumeTrend"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="colorOutflowTrend"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorVolumeTrend)"
              />
              <Area
                type="monotone"
                dataKey="outflow"
                stroke="#f97316"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOutflowTrend)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Bar Chart Section */}
      <Card className="w-full shadow-sm border-none bg-white rounded-2xl p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-slate-500">แนวโน้มการใช้น้ำ</p>
            <h3 className="text-lg font-bold text-slate-900">
              เปรียบเทียบการใช้น้ำรายเดือน
            </h3>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-600">2567</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-300" />
              <span className="text-slate-600">2568</span>
            </div>
          </div>
        </div>
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barGap={2}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) => value.toLocaleString()}
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
                dataKey="year2567"
                name="2567"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="year2568"
                name="2568"
                fill="#93C5FD"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Forecast Stats Section */}
      <Card className="w-full shadow-sm border-none bg-white rounded-2xl p-4">
        <div className="mb-4">
          <p className="text-sm text-slate-500">แนวโน้มปริมาณน้ำ</p>
          <h3 className="text-lg font-bold text-slate-900">
            คาดการณ์การเพียงพอของน้ำ
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Droplets className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500">การใช้น้ำเฉลี่ยต่อวัน</p>
              <p className="text-lg font-bold text-slate-900">1,250 ลิตร/วัน</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Clock className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500">น้ำพอใช้อีกประมาณ</p>
              <p className="text-lg font-bold text-slate-900">20 วัน</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 rounded-xl">
              <CalendarDays className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500">
                คาดว่าต่ำกว่า 20% ในวันที่
              </p>
              <p className="text-lg font-bold text-slate-900">12 ส.ค. 2568</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
