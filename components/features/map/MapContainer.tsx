"use client";

import { useRef, useEffect } from "react";
import { MapRef } from "react-map-gl/mapbox";
import { MapTools } from "@/components/features/map/MapTools";
import SmartCityMap from "@/components/features/map/SmartCityMap";
import { useMapStore } from "@/stores/useMapStore";

interface MapContainerProps {
  canCreatePin?: boolean;
}

export function MapContainer({ canCreatePin = false }: MapContainerProps) {
  const mapRef = useRef<MapRef>(null);

  // Use Zustand store
  const activeLayer = useMapStore((state) => state.activeLayer);
  const isCreatePinMode = useMapStore((state) => state.isCreatePinMode);
  const { setActiveLayer, toggleCreatePinMode, reset } = useMapStore(
    (state) => state.actions
  );

  // Reset store on unmount
  useEffect(() => {
    return () => reset();
  }, [reset]);

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
    reset();
  };

  const handleCreatePin = () => {
    if (canCreatePin) {
      toggleCreatePinMode();
      // Logic for entering create pin mode (e.g. change cursor) can be handled here or in SmartCityMap via store
      console.log("Toggled Create Pin Mode");
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100">
      <div className="absolute inset-0 z-0">
        <SmartCityMap activeLayer={activeLayer} mapRef={mapRef} />
      </div>

      <MapTools
        activeLayer={activeLayer}
        onLayerChange={setActiveLayer}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onCreatePin={canCreatePin ? handleCreatePin : undefined}
        isCreatePinMode={isCreatePinMode}
      />
    </div>
  );
}
