// app/(user)/map/page.tsx
import { MapTools } from "@/components/features/map/MapTools";
import SmartCityMap from "@/components/features/map/SmartCityMap"; // แผนที่ที่เราทำกันไว้

export default function MapPage() {
  return (
    <div className="relative w-full h-[calc(100vh-2rem)] overflow-hidden rounded-2xl border border-gray-200">
      {/* ชั้นล่าง: แผนที่ */}
      <div className="absolute inset-0 z-0">
        <SmartCityMap />
      </div>

      {/* ชั้นบน: เครื่องมือ (วางทับได้เลย เพราะเรา set absolute ใน component แล้ว) */}
      <MapTools />
    </div>
  );
}
