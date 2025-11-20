"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // ต้องลง shadcn popover ก่อนนะครับ
import {
  Droplets, // ไอคอนน้ำ
  Flame, // ไอคอนไฟ
  Video, // ไอคอน CCTV
  Filter, // ไอคอนกรอง
  Home, // ไอคอนบ้าน
  Plus, // ไอคอน Zoom In
  Minus, // ไอคอน Zoom Out
  RotateCcw, // ไอคอน Reset
  ChevronDown, // ลูกศรลง
  Bell, // กระดิ่ง
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MapTools() {
  // State สำหรับจำว่าเลือก Layer ไหนอยู่ (water, fire, cctv)
  const [activeLayer, setActiveLayer] = useState<string | null>("water");

  return (
    <>
      {/* -------------------------------------------------- */}
      {/* 1. กลุ่มบนขวา: ปุ่มสถานะ + แจ้งเตือน */}
      {/* -------------------------------------------------- */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {/* Dropdown สถานะ (Mock) */}
        <Button className="h-10 bg-white text-foreground hover:bg-gray-50 border shadow-sm gap-2 rounded-lg">
          <span className="text-sm font-medium">สถานะ</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>

        {/* ปุ่มแจ้งเตือน (Bell) */}
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white shadow-sm border-gray-200 relative"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {/* จุดแดงแจ้งเตือน */}
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 border-2 border-white rounded-full" />
        </Button>
      </div>

      {/* -------------------------------------------------- */}
      {/* 2. แท่งเครื่องมือแนวตั้ง (Layer & Filter) */}
      {/* -------------------------------------------------- */}
      <div className="absolute top-16 right-4 z-10 flex flex-col gap-2 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-100 w-12 items-center">
        {/* ปุ่ม Home */}
        <ToolButton
          icon={<Home className="w-5 h-5" />}
          label="หน้าหลัก"
          onClick={() => console.log("Go Home")}
        />
        <div className="w-6 h-[1px] bg-gray-200 my-1" /> {/* เส้นคั่น */}
        {/* ปุ่มเลือก Layer น้ำ */}
        <ToolButton
          isActive={activeLayer === "water"}
          activeColor="bg-blue-500 text-white"
          icon={<Droplets className="w-5 h-5" />}
          onClick={() => setActiveLayer("water")}
        />
        {/* ปุ่มเลือก Layer ไฟ */}
        <ToolButton
          isActive={activeLayer === "fire"}
          activeColor="bg-red-500 text-white"
          icon={<Flame className="w-5 h-5" />}
          onClick={() => setActiveLayer("fire")}
        />
        {/* ปุ่มเลือก Layer กล้อง */}
        <ToolButton
          isActive={activeLayer === "cctv"}
          activeColor="bg-green-500 text-white"
          icon={<Video className="w-5 h-5" />}
          onClick={() => setActiveLayer("cctv")}
        />
        <div className="w-6 h-[1px] bg-gray-200 my-1" /> {/* เส้นคั่น */}
        {/* ปุ่ม Filter + Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </PopoverTrigger>

          {/* เนื้อหาข้างใน Popover (เหมือนในรูป) */}
          <PopoverContent
            side="left"
            align="start"
            className="w-60 p-0 mr-2 overflow-hidden shadow-xl border-none"
          >
            <div className="bg-white flex flex-col">
              <div className="p-4 border-b bg-gray-50/50">
                <h4 className="font-semibold text-sm text-gray-900">
                  กรองหลักสูตร
                </h4>
              </div>

              <div className="p-4 space-y-3">
                <CheckboxItem
                  label="ปกติ"
                  color="bg-green-500"
                  defaultChecked
                />
                <CheckboxItem
                  label="อันตราย"
                  color="bg-green-500"
                  defaultChecked
                />
                <CheckboxItem
                  label="ระมัดระวัง"
                  color="border border-gray-300"
                />
              </div>

              <div className="p-3 bg-gray-50 flex gap-2 border-t">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white h-8 text-xs">
                  บันทึก
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-8 text-xs bg-white"
                >
                  รีเซ็ต
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* -------------------------------------------------- */}
      {/* 3. ปุ่ม Zoom (ขวาล่าง) */}
      {/* -------------------------------------------------- */}
      <div className="absolute bottom-8 right-4 z-10 flex flex-col bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <button className="p-2 hover:bg-gray-50 border-b border-gray-100 text-gray-600">
          <Plus className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-50 border-b border-gray-100 text-gray-600">
          <Minus className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-50 text-gray-600">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}

// --- Helper Component: ปุ่มในแนวตั้ง ---
interface ToolButtonProps {
  icon: React.ReactNode;
  isActive?: boolean;
  activeColor?: string;
  onClick?: () => void;
  label?: string;
}

function ToolButton({ icon, isActive, activeColor, onClick }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200",
        isActive
          ? `${activeColor} shadow-md scale-105` // ถ้า Active ให้เปลี่ยนสีตามที่ส่งมา
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900" // ถ้า Inactive ให้เป็นสีเทา
      )}
    >
      {icon}
    </button>
  );
}

// --- Helper Component: Checkbox ใน Popover ---
function CheckboxItem({
  label,
  color,
  defaultChecked,
}: {
  label: string;
  color: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />
        <div
          className={cn(
            "w-5 h-5 rounded border flex items-center justify-center transition-colors peer-checked:bg-green-600 peer-checked:border-green-600 border-gray-300"
            // color prop คือสีของ Icon หรือ indicator (ในที่นี้ทำแบบ simple ก่อน)
          )}
        >
          {/* Icon Checkmark */}
          <svg
            className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <span className="text-sm text-gray-700 group-hover:text-gray-900">
        {label}
      </span>
    </label>
  );
}
