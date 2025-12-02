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
import WaterLevelCard from "@/components/features/water/widgets/guage";
import { WaterSystemOverview } from "@/components/features/water/widgets/WaterSystemOverview";
import { WaterTrendOverview } from "@/components/features/water/widgets/WaterTrendOverview";
import { WaterQualityOverview } from "@/components/features/water/widgets/WaterQualityOverview";
import WaterCarGauage from "@/components/features/water/widgets/WaterCarGauage";

export interface WaterCardProps {
  data?: unknown; // Relaxed type for now as we are using widgets with internal mock data
  onClose?: () => void;
}

export default function WaterCard({ data: _data, onClose }: WaterCardProps) {
  const { open } = useSidebar();
  const [viewMode, setViewMode] = React.useState<
    "default" | "overview" | "trend-overview" | "quality-overview"
  >("default");

  // Calculate left position based on sidebar state
  // Sidebar width is 16rem (256px) when expanded, 3rem (48px) when collapsed
  // We add some padding/gap
  const leftPosition = open ? "left-[17rem]" : "left-[4rem]";

  return (
    <div
      className={`fixed top-4 bottom-4 ${leftPosition} z-40 w-[750px] h-[629px] transition-all duration-200 ease-linear flex flex-col gap-4 pointer-events-none p-1`}
    >
      {viewMode === "default" ? (
        <>
          {/* Close Button (Floating) */}
          <div className="grid grid-cols-12 gap-4 pointer-events-auto">
            {/* Item 1 */}
            <div className="col-span-12 md:col-span-6 ">
              {" "}
              {/* <WaterCarGauage /> */}
              <WaterLevelCard
                onViewTrend={() => setViewMode("overview")}
                onViewQuality={() => setViewMode("quality-overview")}
              />
            </div>

            {/* Item 2 */}
            <div className="col-span-12 md:col-span-6">
              <TankInfo />
            </div>

            {/* Item 3 */}
            <div className="col-span-12">
              <WaterVolumeTrend
                onViewDetails={() => setViewMode("trend-overview")}
              />
            </div>
            <div className="col-span-12">
              <PumpStatusList />
            </div>
            {/* <div className="col-span-12 md:col-span-6 bg-blue-200 p-4">Box 1</div>
        <div className="col-span-12 md:col-span-6 bg-green-200 p-4">Box 2</div> */}
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="absolute -top-2 -right-2 rounded-full shadow-md bg-white hover:bg-gray-100 pointer-events-auto"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </>
      ) : viewMode === "overview" ? (
        <WaterSystemOverview onBack={() => setViewMode("default")} />
      ) : viewMode === "trend-overview" ? (
        <WaterTrendOverview onBack={() => setViewMode("default")} />
      ) : (
        <WaterQualityOverview onBack={() => setViewMode("default")} />
      )}
    </div>
  );
}
