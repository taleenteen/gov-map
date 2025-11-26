"use client";

import { useRef, useState } from "react";
import { MapRef } from "react-map-gl/mapbox";
import { AdminMapTools } from "@/components/features/map/AdminMapTools";
import SmartCityMap from "@/components/features/map/SmartCityMap";

export function AdminMapContainer() {
  const mapRef = useRef<MapRef>(null);
  const [currentLayer, setCurrentLayer] = useState<string | null>("water");

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleReset = () => {
    mapRef.current?.flyTo({
      center: [100.515, 13.715],
      zoom: 13.5,
      duration: 2000,
    });
    setCurrentLayer("");
  };

  const handleCreatePin = () => {
    // TODO: Implement create pin logic
    console.log("Create Pin Clicked");
    alert("Create Pin Mode Activated");
  };

  return (
    <div className="relative w-full h-full bg-gray-100">
      <div className="absolute inset-0 z-0">
        <SmartCityMap activeLayer={currentLayer} mapRef={mapRef} />
      </div>

      <AdminMapTools
        activeLayer={currentLayer}
        onLayerChange={setCurrentLayer}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onCreatePin={handleCreatePin}
      />
    </div>
  );
}
