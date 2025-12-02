"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  MapPin,
  Activity,
  Calendar,
  TrendingDown,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// --- Gauge Logic (Reused from WaterCarGauage) ---
const PH_COLORS = [
  "#FF0000",
  "#FF2600",
  "#FF4D00",
  "#FF7300",
  "#FF9900",
  "#FFBF00",
  "#E6D933",
  "#CCE666",
  "#B3F299",
  "#99FFCC",
  "#80F2E6",
  "#66E6FF",
  "#4D99FF",
  "#334DFF",
  "#4B0082",
];

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

const PHGauge = ({ phValue }: { phValue: number }) => {
  const width = 340;
  const height = 180;
  const centerX = width / 2;
  const centerY = height - 20;
  const radius = 120;
  const strokeWidth = 22;
  const totalAngle = 180;
  const startAngleOffset = 0;
  const totalSegments = 30;
  const segmentGap = 1.5;
  const anglePerSegment =
    (totalAngle - (totalSegments - 1) * segmentGap) / totalSegments;
  const needleAngle = (phValue / 14) * 180;

  return (
    <div className="relative flex flex-col items-center justify-center mb-12">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {Array.from({ length: totalSegments }).map((_, index) => {
          const segmentStartAngle =
            startAngleOffset + index * (anglePerSegment + segmentGap);
          const segmentEndAngle = segmentStartAngle + anglePerSegment;
          const colorIndex = Math.floor(
            (index / totalSegments) * PH_COLORS.length
          );
          const color = PH_COLORS[Math.min(colorIndex, PH_COLORS.length - 1)];

          return (
            <path
              key={index}
              d={describeArc(
                centerX,
                centerY,
                radius,
                segmentStartAngle,
                segmentEndAngle
              )}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          );
        })}

        {Array.from({ length: 15 }).map((_, i) => {
          const angle = (i / 14) * 180;
          const pos = polarToCartesian(centerX, centerY, radius - 25, angle);
          const rotateAngle = angle - 90;
          return (
            <text
              key={i}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#475569"
              fontSize="10"
              fontWeight="500"
              transform={`rotate(${rotateAngle}, ${pos.x}, ${pos.y})`}
            >
              {i}
            </text>
          );
        })}

        <text
          x={30}
          y={centerY + 25}
          fontSize="12"
          fill="#1e293b"
          fontWeight="600"
        >
          เป็นกรดสูง
        </text>
        <text
          x={centerX}
          y={centerY - radius - 25}
          fontSize="12"
          fill="#1e293b"
          fontWeight="600"
          textAnchor="middle"
        >
          เป็นกลาง
        </text>
        <text
          x={width - 30}
          y={centerY + 25}
          fontSize="12"
          fill="#1e293b"
          fontWeight="600"
          textAnchor="end"
        >
          เป็นด่างสูง
        </text>

        <g transform={`rotate(${needleAngle - 90}, ${centerX}, ${centerY})`}>
          <path
            d={`M ${centerX - 4} ${centerY} L ${centerX} ${
              centerY - radius + 10
            } L ${centerX + 4} ${centerY} Z`}
            fill="#0f172a"
          />
          <circle cx={centerX} cy={centerY} r="8" fill="#0f172a" />
          <circle cx={centerX} cy={centerY} r="3" fill="white" />
        </g>
      </svg>

      <div className="absolute bottom-0 flex flex-col items-center translate-y-[50px]">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-emerald-600">{phValue}</span>
          <span className="text-lg font-semibold text-slate-600">pH</span>
        </div>
        <div className="mt-2 px-4 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
          น้ำอยู่ในเกณฑ์ดีมาก
        </div>
      </div>
    </div>
  );
};

// --- Mock Data ---
const dayData = [
  { name: "00:00", ph: 7.0 },
  { name: "03:00", ph: 6.8 },
  { name: "06:00", ph: 7.2 },
  { name: "09:00", ph: 7.1 },
  { name: "12:00", ph: 6.9 },
  { name: "15:00", ph: 7.0 },
  { name: "18:00", ph: 7.3 },
  { name: "21:00", ph: 7.1 },
];

const weekData = [
  { name: "จ", ph: 6.9 },
  { name: "อ", ph: 7.1 },
  { name: "พ", ph: 7.0 },
  { name: "พฤ", ph: 6.8 },
  { name: "ศ", ph: 7.2 },
  { name: "ส", ph: 7.3 },
  { name: "อา", ph: 7.1 },
];

const monthData = [
  { name: "ก.ค.", ph: 6.5 },
  { name: "ส.ค.", ph: 6.8 },
  { name: "ก.ย.", ph: 6.2 },
  { name: "ต.ค.", ph: 6.5 },
  { name: "พ.ย.", ph: 7.2 },
  { name: "ธ.ค.", ph: 7.0 },
  { name: "ม.ค.", ph: 7.1 },
  { name: "ก.พ.", ph: 7.0 },
  { name: "มี.ค.", ph: 6.8 },
  { name: "เม.ย.", ph: 6.9 },
  { name: "พ.ค.", ph: 6.5 },
  { name: "มิ.ย.", ph: 7.0 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const phValue = payload[0].value;
    return (
      <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
        <div className="text-center">
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-lg font-bold text-slate-900">{phValue} pH</p>
        </div>
        {/* Mini Gauge in Tooltip */}
        <div className="w-12 h-8 relative">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path
              d="M 10,50 A 40,40 0 0,1 90,50"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 10,50 A 40,40 0 0,1 90,50"
              fill="none"
              stroke="url(#miniGaugeGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="126"
              strokeDashoffset="63"
              transform={`rotate(${(phValue / 14) * 180 - 90}, 50, 50)`}
            />
            <defs>
              <linearGradient id="miniGaugeGradient">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }
  return null;
};

interface WaterQualityOverviewProps {
  onBack: () => void;
}

export function WaterQualityOverview({ onBack }: WaterQualityOverviewProps) {
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
    <div className="w-full h-full pointer-events-auto bg-transparent p-4 rounded-xl">
      <div className="grid grid-cols-12 gap-4">
        {/* Top Left: Gauge Card */}
        <div className="col-span-12 md:col-span-6">
          <Card className="h-full shadow-sm border-none bg-white rounded-3xl overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <p className="text-sm text-slate-400 font-medium">คุณภาพน้ำ</p>
                <CardTitle className="text-xl font-bold text-slate-800">
                  หมุดคุณภาพน้ำ 1
                </CardTitle>
              </div>
              <div className="bg-slate-100 p-2 rounded-full">
                <ArrowUpRight className="w-5 h-5 text-slate-500" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-4 flex flex-col justify-between h-[calc(100%-80px)]">
              <PHGauge phValue={7.0} />
              <Button
                className="w-full bg-btn-primary hover:bg-[#186343] text-text-field-default rounded-xl py-5 px-8 text-sm mt-3"
                onClick={onBack}
              >
                ดูปริมาณน้ำ
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Top Right: Details Card */}
        <div className="col-span-12 md:col-span-6">
          <Card className="h-full shadow-sm border-none bg-white rounded-3xl p-6">
            <div className="mb-6">
              <p className="text-sm text-slate-500">ข้อมูลคุณภาพน้ำ</p>
              <h3 className="text-lg font-bold text-slate-900">
                รายละเอียดจุดวัดคุณภาพน้ำ
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-slate-500 text-sm">หมุดที่ตรวจวัด</span>
                <span className="text-slate-900 font-medium">
                  หมุดปริมาณน้ำ 1
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-slate-500 text-sm">ตำแหน่งเซนเซอร์</span>
                <span className="text-slate-900 font-medium">แท็งก์น้ำ</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-slate-500 text-sm">ประเภทแหล่งน้ำ</span>
                <span className="text-slate-900 font-medium">บ่อบาดาล</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-slate-500 text-sm">วันที่ติดตั้ง</span>
                <span className="text-slate-900 font-medium">
                  28 พฤศจิกายน พ.ศ.2568
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-500 text-sm">ตำแหน่ง</span>
                <span className="text-slate-900 font-medium">
                  13.735200, 100.412300
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Middle: Trend Chart */}
        <div className="col-span-12">
          <Card className="shadow-sm border-none bg-white rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-slate-500">แนวโน้มคุณภาพน้ำ</p>
                <h3 className="text-lg font-bold text-slate-900">
                  หมุดปริมาณน้ำ 1
                </h3>
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
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getChartData()}
                  margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="phGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={true}
                    horizontal={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis hide domain={[0, 14]} />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: "#3b82f6", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ph"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "#3b82f6",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                  />
                  {/* Color Bar on Right */}
                  <ReferenceLine x="มิ.ย." stroke="none" />
                </LineChart>
              </ResponsiveContainer>
              {/* Vertical Color Scale Bar */}
              <div className="absolute right-0 top-4 bottom-8 w-2 rounded-full bg-gradient-to-b from-red-500 via-yellow-400 to-blue-600 opacity-80" />
            </div>
          </Card>
        </div>

        {/* Bottom: Stats */}
        <div className="col-span-12">
          <Card className="shadow-sm border-none bg-white rounded-3xl p-6">
            <div className="mb-4">
              <p className="text-sm text-slate-500">แนวโน้มคุณภาพน้ำ</p>
              <h3 className="text-lg font-bold text-slate-900">
                สถิติค่าที่ตรวจพบ
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <TrendingDown className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">ค่าต่ำสุดที่ตรวจพบ</p>
                  <p className="text-lg font-bold text-slate-900">5 pH</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">ค่าสูงสุดที่ตรวจพบ</p>
                  <p className="text-lg font-bold text-slate-900">8 pH</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-50 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">
                    จำนวนครั้งไม่ได้มาตรฐาน
                  </p>
                  <p className="text-lg font-bold text-slate-900">2 ครั้ง</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
