"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

// --- กำหนด Palette สีตามค่า pH (ไล่จาก กรด -> กลาง -> ด่าง) ---
const PH_COLORS = [
  "#FF0000", // 0-1 แดงเข้ม (กรดสูง)
  "#FF2600",
  "#FF4D00",
  "#FF7300", // ส้ม
  "#FF9900",
  "#FFBF00", // เหลือง
  "#E6D933",
  "#CCE666",
  "#B3F299", // เขียวอ่อน
  "#99FFCC",
  "#80F2E6",
  "#66E6FF", // ฟ้า
  "#4D99FF",
  "#334DFF", // น้ำเงิน
  "#4B0082", // ม่วง (ด่างสูง)
];

// --- Helper Function สำหรับคำนวณ SVG Geometry ---
// แปลงองศาและรัศมี เป็นพิกัด X,Y
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

// สร้าง Path รูปโค้ง (Arc)
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

// --- 1. ส่วนประกอบ Gauge (SVG) ---
interface PHGaugeProps {
  phValue: number; // ค่า pH 0 - 14
}

const PHGauge = ({ phValue }: PHGaugeProps) => {
  // ตั้งค่าขนาด Canvas
  const width = 280;
  const height = 150;
  const centerX = width / 2;
  const centerY = height - 20; // จุดหมุนเข็มอยู่ด้านล่าง
  const radius = 100; // รัศมีของแถบสี
  const strokeWidth = 22; // ความหนาของแถบสี

  // ตั้งค่าองศา (เริ่มซ้าย 180 -> จบขวา 0)
  const totalAngle = 180;
  const startAngleOffset = 0;

  // จำนวนช่อง Segment (แบ่งถี่ๆ เพื่อความสวยงามเหมือนในรูป)
  const totalSegments = 30;
  const segmentGap = 1.5; // ช่องว่างระหว่างแท่ง
  const anglePerSegment =
    (totalAngle - (totalSegments - 1) * segmentGap) / totalSegments;

  // คำนวณองศาของเข็ม (Map ค่า pH 0-14 ไปเป็นองศา 0-180)
  // pH 7 คือตรงกลาง (90 องศา)
  const needleAngle = (phValue / 14) * 180;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* 1. วาด Segments สีๆ */}
        {Array.from({ length: totalSegments }).map((_, index) => {
          const segmentStartAngle =
            startAngleOffset + index * (anglePerSegment + segmentGap);
          const segmentEndAngle = segmentStartAngle + anglePerSegment;

          // Map index ของ segment ไปเป็นสีใน Palette (แบบคร่าวๆ)
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
              strokeLinecap="round" // หัวมน
            />
          );
        })}

        {/* 2. วาดตัวเลข 0 - 14 รอบวง */}
        {Array.from({ length: 15 }).map((_, i) => {
          // คำนวณตำแหน่งวางตัวเลข (วางที่รัศมีแคบลงมาหน่อย)
          const angle = (i / 14) * 180;
          const pos = polarToCartesian(centerX, centerY, radius - 25, angle);
          // หมุนตัวเลขให้เอียงตามโค้ง
          const rotateAngle = angle - 90;
          return (
            <text
              key={i}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#475569" // slate-600
              fontSize="10"
              fontWeight="500"
              transform={`rotate(${rotateAngle}, ${pos.x}, ${pos.y})`}
            >
              {i}
            </text>
          );
        })}

        {/* 3. วาด Labels (เป็นกรดสูง, เป็นกลาง, เป็นด่างสูง) */}
        {/* ซ้าย */}
        <text
          x={30}
          y={centerY + 15}
          fontSize="12"
          fill="#1e293b"
          fontWeight="600"
        >
          เป็นกรดสูง
        </text>
        {/* กลางบน */}
        <text
          x={centerX}
          y={centerY - radius - 20}
          fontSize="12"
          fill="#1e293b"
          fontWeight="600"
          textAnchor="middle"
        >
          เป็นกลาง
        </text>
        {/* ขวา */}
        <text
          x={width - 30}
          y={centerY + 15}
          fontSize="12"
          fill="#1e293b"
          fontWeight="600"
          textAnchor="end"
        >
          เป็นด่างสูง
        </text>

        {/* 4. วาดเข็มชี้ (Needle) */}
        <g transform={`rotate(${needleAngle - 90}, ${centerX}, ${centerY})`}>
          {" "}
          {/* -90 เพราะเริ่มวาดจากแนวตั้ง */}
          {/* ก้านเข็ม (สามเหลี่ยมยาวๆ) */}
          <path
            d={`M ${centerX - 4} ${centerY} L ${centerX} ${
              centerY - radius + 10
            } L ${centerX + 4} ${centerY} Z`}
            fill="#0f172a" // slate-900
          />
          {/* ฐานเข็ม (วงกลมดำ) */}
          <circle cx={centerX} cy={centerY} r="8" fill="#0f172a" />
          {/* จุดขาวตรงกลางฐาน */}
          <circle cx={centerX} cy={centerY} r="3" fill="white" />
        </g>
      </svg>

      {/* Text แสดงค่าตรงกลาง */}
      <div className="absolute bottom-0 flex flex-col items-center translate-y-[-15px]">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-emerald-600">{phValue}</span>
          <span className="text-lg font-semibold text-slate-600">pH</span>
        </div>
        {/* Status Badge */}
        <div className="mt-2 px-4 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
          น้ำอยู่ในเกณฑ์ดีมาก
        </div>
      </div>
    </div>
  );
};

// --- 2. ส่วนประกอบหลัก (Card Layout) ---
export default function PHQualityCard() {
  // สมมติค่า pH ที่ได้จาก Sensor
  const currentPH = 7.0;

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-3xl overflow-hidden border-slate-100">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <p className="text-sm text-slate-400 font-medium">คุณภาพน้ำ</p>
          <CardTitle className="text-xl font-bold text-slate-800">
            หมุดคุณภาพน้ำ 1
          </CardTitle>
        </div>
        {/* ปุ่มลูกศรวงกลม */}
        <div className="bg-slate-100 p-2 rounded-full cursor-pointer hover:bg-slate-200 transition">
          <ArrowUpRight className="w-5 h-5 text-slate-500" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {/* เรียกใช้ Gauge Component พร้อมส่งค่า pH */}
        <PHGauge phValue={currentPH} />

        {/* ปุ่ม Action (เปลี่ยนสีเป็นเขียวตามภาพ) */}
        <Button className="w-full bg-[#1F7A53] hover:bg-[#186343] text-white rounded-xl h-12 text-md font-medium">
          ดูปริมาณน้ำ
        </Button>
      </CardContent>
    </Card>
  );
}
