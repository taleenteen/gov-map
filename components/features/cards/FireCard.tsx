import React from "react";
import { AlertTriangle, Thermometer } from "lucide-react";

interface FireCardProps {
  data: {
    title: string;
    temp?: string;
    alert?: string;
  };
  onClose?: () => void;
}

export default function FireCard({ data, onClose }: FireCardProps) {
  return (
    <div className="p-0 rounded-lg overflow-hidden w-60">
      <div className="bg-red-600 p-3 flex justify-between items-center animate-pulse">
        <span className="text-white font-bold flex items-center gap-2">
          <AlertTriangle size={16} /> แจ้งเตือนความร้อน
        </span>
        <span className="bg-white text-red-600 text-xs font-bold px-2 py-1 rounded">
          {data.alert || "DANGER"}
        </span>
      </div>
      <div className="p-4 bg-white border-b-4 border-red-600">
        <h3 className="font-bold text-gray-800 text-lg mb-2">{data.title}</h3>
        <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
          <Thermometer className="text-red-500" />
          <div>
            <p className="text-xs text-red-400">Current Temp</p>
            <p className="text-xl font-bold text-red-700">{data.temp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
