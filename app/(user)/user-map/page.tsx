"use client";

import React from "react";
import {
  Search,
  SlidersHorizontal,
  Bell,
  Monitor,
  Map,
  Droplets,
  FileText,
  Trash2,
  AlertTriangle,
  ShieldCheck,
  Leaf,
  HeartPulse,
  MessageSquare,
  Zap,
  Ticket,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/assets/brand/logo-full.png";
import { useRouter } from "next/navigation";

// const router = useRouter(); // Removed invalid hook call
// --- 1. MOCK DATA (ในไฟล์ตามขอ) ---

// การ์ดใหญ่ 2 ใบด้านบน
const highlightServices = [
  {
    id: 1,
    title: "ระบบแจ้งซ่อมและร้องเรียน (FixIt / Complaint Service)",
    icon: MessageSquare,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 2,
    title: "ระบบธนาคารขยะ (Waste Bank e-Service)",
    icon: Monitor, // หาไอคอนใกล้เคียง
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
];

// การ์ดเล็กด้านล่าง
const standardServices = [
  {
    id: 3,
    title: "ระบบบริหารจัดการแผนที่ภาษี (Tax Map & Property System)",
    icon: Map,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    path: "/user-feature/tax",
  },
  {
    id: 4,
    title: "ระบบตรวจสอบปริมาณและคุณภาพน้ำ (Smart Water Monitoring)",
    icon: Droplets,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 5,
    title: "ระบบขอใบอนุญาต/รับรอง/ระบบตรวจสอบใบอนุญาต",
    icon: FileText,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 6,
    title: "ระบบธนาคารขยะ (Waste Bank e-Service)",
    icon: Trash2,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 7,
    title: "ระบบแจ้งซ่อมและร้องเรียน (FixIt / Complaint Service)",
    icon: MessageSquare,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 8,
    title: "ระบบความปลอดภัย (Smart Safety)",
    icon: ShieldCheck,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 9,
    title: "ระบบสิ่งแวดล้อมเมือง (Environmental Monitoring)",
    icon: Leaf,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 10,
    title: "ระบบบริการสุขภาพและสวัสดิการชุมชน (Health & Welfare Service)",
    icon: HeartPulse,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 11,
    title: "ระบบสำรวจความพึงพอใจของประชาชน (Citizen Feedback)",
    icon: MessageSquare, // ใช้ซ้ำได้หรือหาไอคอนอื่น
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 12,
    title: "ระบบเตือนภัยพิบัติดินสไลด์, น้ำท่วม, ไฟไหม้",
    icon: AlertTriangle,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 13,
    title: "ระบบ Monitoring พลังงานไฟฟ้า",
    icon: Zap,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    id: 14,
    title: "ระบบจำหน่ายตั๋ว การชำระค่าธรรมเนียม",
    icon: Ticket,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
];

export default function UserIndexPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-8 space-y-8">
      {/* --- HEADER SECTION --- */}
      <header className="flex flex-col items-center gap-6 relative">
        {/* Notification Bell (Absolute Position like in design) */}
        <div className="absolute right-0 top-0">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white shadow-sm rounded-xl h-10 w-10 relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </Button>
        </div>

        {/* Logo Center */}
        <div className="flex items-center gap-3 mt-4">
          <Image
            src={Logo} // ใส่ตัวแปรที่ import มา
            alt="GovCenter Logo" // ต้องใส่เสมอ (เพื่อ SEO และ Accessibility)
            width={500} // กำหนดความกว้างที่ต้องการแสดงผล
            height={154} // กำหนดความสูง (หรือใส่ auto ใน class ก็ได้)
            className="object-contain" // ถ้าอยากจัด style เพิ่ม
            priority // ถ้าเป็น Logo อยู่บนสุด ใส่ priority ให้โหลดเร็วขึ้น
          />
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              className="pl-12 h-12 rounded-2xl border-gray-200 shadow-sm bg-white text-base"
              placeholder="ค้นหาบริการ..."
            />
          </div>
          <Button className="h-12 w-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-sm shrink-0">
            <SlidersHorizontal className="w-5 h-5 text-white" />
          </Button>
        </div>
      </header>

      {/* --- CONTENT SECTION --- */}
      <main className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center text-emerald-600">
          บริการหลัก
        </h2>

        {/* 1. Highlight Cards (2 Large Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlightServices.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              className="min-h-[180px] flex items-center justify-center text-center p-8"
              iconSize="w-8 h-8"
              textSize="text-xl"
            />
          ))}
        </div>

        {/* 2. Standard Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {standardServices.map((item) => (
            <ServiceCard key={item.id} item={item} className="min-h-[160px]" />
          ))}
        </div>
      </main>
    </div>
  );
}

// --- HELPER COMPONENT (Small internal component) ---
function ServiceCard({
  item,
  className,
  iconSize = "w-6 h-6",
  textSize = "text-sm",
}: {
  item: any;
  className?: string;
  iconSize?: string;
  textSize?: string;
}) {
  const router = useRouter();
  return (
    <Card
      className={cn(
        "border-none shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 cursor-pointer rounded-3xl bg-white group",
        className
      )}
      onClick={() => item.path && router.push(item.path)}
    >
      <CardContent className="p-6 flex flex-col items-start gap-4 w-full h-full">
        {/* Icon Circle */}
        <div
          className={cn(
            "p-3 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
            item.bgColor,
            item.color
          )}
        >
          <item.icon className={iconSize} />
        </div>

        {/* Text */}
        <h3 className={cn("font-medium text-gray-800 leading-snug", textSize)}>
          {item.title}
        </h3>
      </CardContent>
    </Card>
  );
}
