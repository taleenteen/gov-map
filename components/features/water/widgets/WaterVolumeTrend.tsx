"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  time: string;
  volume: number;
  outflow: number;
}

const mockData: DataPoint[] = [
  { time: "00:00", volume: 2200, outflow: 1200 },
  { time: "03:00", volume: 3800, outflow: 2400 },
  { time: "06:00", volume: 3500, outflow: 2800 },
  { time: "09:00", volume: 2000, outflow: 4500 },
  { time: "12:00", volume: 2500, outflow: 1800 },
  { time: "15:00", volume: 1500, outflow: 1200 },
  { time: "18:00", volume: 3500, outflow: 2500 },
  { time: "21:00", volume: 4200, outflow: 3800 },
];

interface WaterVolumeTrendProps {
  onViewDetails?: () => void;
}

export function WaterVolumeTrend({ onViewDetails }: WaterVolumeTrendProps) {
  return (
    <Card className="w-full h-full shadow-sm border border-gray-100 rounded-3xl bg-white p-3">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">แนวโน้มปริมาณน้ำ</p>
          <CardTitle className="text-xl font-medium text-gray-900">
            หมุดปริมาณน้ำ 1
          </CardTitle>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-gray-600">ปริมาณน้ำ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400" />
              <span className="text-gray-600">ปริมาณน้ำออก</span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-gray-100 hover:bg-gray-200 h-8 w-8"
            onClick={onViewDetails}
          >
            <ArrowUpRight className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[150px] w-full px-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ fontSize: "12px" }}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVolume)"
            />
            <Area
              type="monotone"
              dataKey="outflow"
              stroke="#f97316"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOutflow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
