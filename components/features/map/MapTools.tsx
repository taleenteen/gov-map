"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Droplets,
  Flame,
  Video,
  Filter,
  Home,
  Plus,
  Minus,
  RotateCcw, // ไอคอน Reset
  ChevronDown, // ลูกศรลง
  Bell, // กระดิ่ง
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MapToolsProps {
  activeLayer: string | null;
  onLayerChange: (layer: string | null) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function MapTools({
  activeLayer,
  onLayerChange,
  onZoomIn,
  onZoomOut,
  onReset,
}: MapToolsProps) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  return (
    <>
      {/* -------------------------------------------------- */}
      {/* 1. กลุ่มบนขวา: ปุ่มสถานะ + แจ้งเตือน */}
      {/* -------------------------------------------------- */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {/* Dropdown สถานะ */}
        {/* Dropdown สถานะ */}
        <Popover open={isStatusOpen} onOpenChange={setIsStatusOpen}>
          <PopoverTrigger asChild>
            <Button className="h-12 bg-white text-primary hover:bg-gray-50 shadow-sm gap-2 rounded-lg">
              <span className="text-sm font-medium">สถานะ</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-gray-500 transition-transform duration-200",
                  isStatusOpen && "rotate-180"
                )}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-60 p-0 border-0 rounded-2xl overflow-hidden"
            align="end"
          >
            <div className="bg-white flex flex-col rounded-2xl">
              <div className="p-4 bg-gray-50/50">
                <h4 className="font-medium text-md text-gray-500">
                  กรองหลักสูตร
                </h4>
              </div>

              <div className="p-4 space-y-5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="normal"
                    defaultChecked
                    className="data-[state=checked]:bg-brand-primary border-gray-500 data-[state=checked]:border-brand-primary"
                  />
                  <label
                    htmlFor="normal"
                    className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ปกติ
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="danger"
                    defaultChecked
                    className="data-[state=checked]:bg-brand-primary border-gray-500 data-[state=checked]:border-brand-primary"
                  />
                  <label
                    htmlFor="danger"
                    className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    อันตราย
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="caution"
                    defaultChecked
                    className="data-[state=checked]:bg-brand-primary border-gray-500 data-[state=checked]:border-brand-primary"
                  />
                  <label
                    htmlFor="caution"
                    className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ระมัดระวัง
                  </label>
                </div>
              </div>

              <div className="p-3 bg-gray-50 flex gap-2 rounded-b-2xl">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white h-8 text-xs">
                  บันทึก
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-8 text-xs text-brand-primary bg-white border-brand-primary"
                >
                  รีเซ็ต
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* ปุ่มแจ้งเตือน (Bell) */}
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 p-6 rounded-2xl bg-white shadow-sm border-gray-200"
        >
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            {/* จุดแดงแจ้งเตือน */}
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-red-500 border-2 border-white rounded-full" />
          </div>
        </Button>
      </div>

      {/* -------------------------------------------------- */}
      {/* 2. แท่งเครื่องมือแนวตั้ง (Layer & Filter) */}
      {/* -------------------------------------------------- */}
      <div className="absolute top-26 right-4 z-10 flex flex-col gap-2 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-100 w-12 items-center">
        {/* ปุ่ม Home (Tax Layer) */}
        <ToolButton
          isActive={activeLayer === "tax"}
          activeColor="bg-gray-700 text-white"
          icon={<Home className="w-5 h-5" />}
          label="หน้าหลัก"
          onClick={() => onLayerChange(activeLayer === "tax" ? null : "tax")}
        />
        {/* ปุ่มเลือก Layer น้ำ */}
        <ToolButton
          isActive={activeLayer === "water"}
          activeColor="bg-blue-500 text-white"
          icon={<Droplets className="w-5 h-5" />}
          onClick={() =>
            onLayerChange(activeLayer === "water" ? null : "water")
          }
        />
        {/* ปุ่มเลือก Layer ไฟ */}
        <ToolButton
          isActive={activeLayer === "fire"}
          activeColor="bg-red-500 text-white"
          icon={<Flame className="w-5 h-5" />}
          onClick={() => onLayerChange(activeLayer === "fire" ? null : "fire")}
        />
        {/* ปุ่มเลือก Layer กล้อง */}
        <ToolButton
          isActive={activeLayer === "cctv"}
          activeColor="bg-green-500 text-white"
          icon={<Video className="w-5 h-5" />}
          onClick={() => onLayerChange(activeLayer === "cctv" ? null : "cctv")}
        />
        <div className="w-6 h-px bg-gray-200 my-1" /> {/* เส้นคั่น */}
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
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-normal"
                    defaultChecked
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="filter-normal"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ปกติ
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-danger"
                    defaultChecked
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="filter-danger"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    อันตราย
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-caution"
                    className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                  />
                  <label
                    htmlFor="filter-caution"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ระมัดระวัง
                  </label>
                </div>
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
      <div className="absolute bottom-26 right-4 z-10 flex flex-col bg-white p-1 rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <button
          onClick={onZoomIn}
          className="p-2 hover:bg-gray-50 border-b border-gray-100 text-gray-600"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2 hover:bg-gray-50 border-b border-gray-100 text-gray-600"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-8 right-4 z-10 flex flex-col bg-white p-1 rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <button
          onClick={onReset}
          className="p-2 hover:bg-gray-50 text-gray-600"
        >
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
