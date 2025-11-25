import React, { useState } from "react";
import {
  Video,
  Activity,
  X,
  MapPin,
  Clock,
  AlertCircle,
  Clock3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraCardProps {
  data: {
    title: string;
    viewers?: number;
    status?: string;
    location?: string;
    time?: string;
    alertMessage?: string;
  };
  onClose?: () => void;
}

export default function CameraCard({ data, onClose }: CameraCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-[439px] bg-white rounded-xl overflow-hidden shadow-xl font-sans">
      {/* Header */}
      <div className="bg-security text-white p-3 flex justify-between items-center">
        <h3 className="font-medium text-base">
          ระบบแจ้งเตือนภัยและความปลอดภัย
        </h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
        </button>
      </div>

      <div className="p-3 space-y-4">
        {/* Alert Box */}
        {data.alertMessage && (
          <div className="bg-[#FFB4B4] text-[#C41C1C] px-3 py-0 rounded-full flex items-center gap-2 w-fit">
            <span className="font-bold text-lg">!</span>
            <span className="font-medium">{data.alertMessage}</span>
          </div>
        )}

        {/* Info List */}
        <div className="space-y-3 text-gray-700">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <span className="font-medium">
              จุดแจ้งเหตุ: {data.location || data.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock3 className="w-5 h-5 text-gray-500 shrink-0" />

            {/* Using MapPin as placeholder for time icon if Clock doesn't match perfectly, but Clock is better semantically */}
            {/* The image uses a location pin icon for time as well? Let's use Clock for time. */}
            <div className="flex items-center gap-3">
              <span className="font-medium">เวลา: {data.time || "Now"}</span>
              <span className="text-red-400">ความคิด GOD</span>
            </div>
          </div>
        </div>

        {/* Accordion Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-[#198754] hover:bg-[#157347] text-white h-10 text-base font-medium rounded-2xl"
        >
          {isExpanded ? "ซ่อนกล้องวงจรปิด" : "ดูกล้องวงจรปิด"}
        </Button>

        {/* Expanded Content (Video) */}
        {isExpanded && (
          <div className="animate-in slide-in-from-top-2 duration-200 pt-2">
            <div className="relative h-48 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
              <Video className="text-gray-600 w-12 h-12" />
              <div className="absolute top-2 left-2 bg-red-600 text-[10px] px-2 py-0.5 rounded flex items-center gap-1 animate-pulse text-white">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />{" "}
                {data.status || "LIVE"}
              </div>
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded">
                CAM-04
              </div>
              <div className="absolute bottom-2 left-2 text-white text-xs flex items-center gap-1">
                <Activity size={12} /> {data.viewers || 0} watching
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
