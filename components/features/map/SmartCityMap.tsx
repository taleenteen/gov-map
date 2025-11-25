"use client";

import React, { useState } from "react";
import Map, {
  Source,
  Layer,
  ViewStateChangeEvent,
  MapRef,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { zonesGeoJson } from "@/data/mock-map-data";
import { urgentPins, Pin } from "@/data/map-pins";
import MapMarkers from "./MapMarkers";
import MapPopup from "./MapPopup";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface SmartCityMapProps {
  activeLayer: string | null;
  mapRef: React.RefObject<MapRef | null>;
}

export default function SmartCityMap({
  activeLayer,
  mapRef,
}: SmartCityMapProps) {
  const [popupInfo, setPopupInfo] = useState<Pin | null>(null);

  const [viewState, setViewState] = useState({
    latitude: 13.715,
    longitude: 100.515,
    zoom: 13.5,
  });

  // Filter pins based on activeLayer
  const filteredPins = activeLayer
    ? urgentPins.filter((pin) => pin.type === activeLayer)
    : urgentPins;

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-900">
      {/* ซ่อน Logo Mapbox และ Attribution และ Padding Popup */}
      <style jsx global>{`
        .mapboxgl-ctrl-logo,
        .mapboxgl-ctrl-bottom-right,
        .mapboxgl-ctrl-attrib {
          display: none !important;
        }
        .mapboxgl-popup-content {
          padding: 0 !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
          background-color: transparent !important;
        }
      `}</style>

      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
        reuseMaps
      >
        {/* แสดง Zone */}
        <Source id="zones-data" type="geojson" data={zonesGeoJson as any}>
          <Layer
            id="zone-fills"
            type="fill"
            paint={{ "fill-color": "#3b82f6", "fill-opacity": 0.2 }}
          />
          <Layer
            id="zone-lines"
            type="line"
            paint={{ "line-color": "#60a5fa", "line-width": 2 }}
          />
        </Source>

        {/* Render Pins */}
        <MapMarkers pins={filteredPins} onPinClick={setPopupInfo} />

        {/* Popup Card */}
        {popupInfo && (
          <MapPopup popupInfo={popupInfo} onClose={() => setPopupInfo(null)} />
        )}
      </Map>
    </div>
  );
}
