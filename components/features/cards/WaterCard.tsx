import React from "react";
import { Droplet, Zap, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface WaterCardProps {
  data: {
    id: string | number;
    title: string;
    status: "Normal" | "Danger" | "Warning";
    systemName: string;
    measurements: {
      label: string;
      value: string;
      isNormal: boolean;
    }[];
    summary: string;
    summaryStatus: "Good" | "Bad";
  };
  onClose?: () => void;
}

export default function WaterCard({ data, onClose }: WaterCardProps) {
  const isDanger = data.status === "Danger";
  const isWarning = data.status === "Warning";

  return (
    <div className="w-[443px] max-h-[441px] bg-white rounded-xl overflow-y-auto shadow-xl font-sans p-6 relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {/* Header */}
      <div className="flex items-start gap-4 mb-2">
        <div className="w-14 h-14 bg-[#F0F9FF] rounded-2xl flex items-center justify-center shrink-0">
          <Droplet className="w-6 h-6 text-[#0EA5E9]" />
        </div>
        <div>
          <span
            className={`inline-block px-3 py-1 rounded-lg text-sm font-bold mb-2 ${
              isDanger
                ? "bg-[#FFE4E6] text-critical"
                : isWarning
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-secondary-text"
            }`}
          >
            {isDanger ? "อันตราย" : isWarning ? "เฝ้าระวัง" : "ปกติ"}
          </span>
          <h2 className="text-2xl font-medium text-gray-900 leading-tight">
            {data.title}
          </h2>
        </div>
      </div>

      {/* System Banner */}
      <div className="bg-[#E0F2FE] rounded-lg py-2 px-3 flex items-center gap-3 mb-2 border border-[#BAE6FD]">
        <Zap className="w-3 h-3 text-[#2563EB] shrink-0 fill-[#2563EB]" />
        <span className="text-[#0369A1] text-xs font-medium">
          {data.systemName}
        </span>
      </div>

      {/* Measurements */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">ผลตรวจคุณภาพน้ำวันนี้</p>
        <div className="space-y-0.5">
          {data.measurements.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-700">
              {item.isNormal ? (
                <Check className="w-5 h-5 text-green-500 shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-500 shrink-0" />
              )}
              <span className="text-xs">
                {item.label}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Box */}
      <div
        className={`rounded-lg py-2 px-3 mb-6 text-center ${
          data.summaryStatus === "Bad"
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        <span className="font-medium">{data.summary}</span>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className=" bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 h-9 text-base rounded-2xl"
          onClick={onClose}
        >
          ยกเลิก
        </Button>
        <Button className="flex-1 bg-[#198754] hover:bg-[#157347] text-white h-9 text-base rounded-2xl">
          ดูทั้งหมด
        </Button>
      </div>
    </div>
  );
}
