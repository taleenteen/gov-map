import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  WaterLevelGauge,
  TankInfo,
  WaterVolumeTrend,
  PumpStatusList,
} from "@/components/features/water/widgets";

export interface WaterCardProps {
  data?: unknown; // Relaxed type for now as we are using widgets with internal mock data
  onClose?: () => void;
}

export default function WaterCard({ data: _data, onClose }: WaterCardProps) {
  const { open } = useSidebar();

  // Calculate left position based on sidebar state
  // Sidebar width is 16rem (256px) when expanded, 3rem (48px) when collapsed
  // We add some padding/gap
  const leftPosition = open ? "left-[17rem]" : "left-[4rem]";

  return (
    <div
      className={`fixed top-4 bottom-4 ${leftPosition} z-40 w-[509px] h-[629px] transition-all duration-200 ease-linear flex flex-col gap-4 pointer-events-none`}
    >
      {/* Container for the cards - enable pointer events for children */}
      <div className="w-full h-full flex flex-col gap-4 pointer-events-auto">
        {/* Top Row: Gauge and Tank Info */}
        <div className="grid grid-cols-12 gap-4 h-full">
          <div className="col-span-5 h-full"></div>
          <div className="col-span-7 h-full">
            <TankInfo />
          </div>
        </div>

        {/* Middle Row: Trend */}
        <div className="h-full">
          <WaterVolumeTrend />
        </div>

        {/* Bottom Row: Pumps */}
        <div className="h-full">
          <PumpStatusList />
        </div>
      </div>

      {/* Close Button (Floating) */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute -top-2 -right-2 rounded-full shadow-md bg-white hover:bg-gray-100 pointer-events-auto"
        onClick={onClose}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
