"use client";

import React, { useState } from "react";
import Map, {
  Marker,
  Popup,
  Source,
  Layer,
  ViewStateChangeEvent,
  MapRef,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Droplets,
  Flame,
  Video,
  Activity,
  Thermometer,
  AlertTriangle,
  Home,
} from "lucide-react";
import { zonesGeoJson } from "@/data/mock-map-data";
import TaxCard from "@/components/features/cards/TaxCard";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const urgentPins = [
  {
    id: 1,
    lat: 13.705,
    lng: 100.505,
    type: "water",
    title: "สถานีสูบน้ำคลองเตย",
    level: "85%",
    status: "Normal",
  },
  {
    id: 2,
    lat: 13.725,
    lng: 100.525,
    type: "fire",
    title: "จุดตรวจจับความร้อน A-01",
    temp: "42°C",
    alert: "High Temp",
  },
  {
    id: 3,
    lat: 13.715,
    lng: 100.515,
    type: "camera",
    title: "CCTV แยกสาทร",
    viewers: 12,
    status: "Live",
  },
  {
    id: 4,
    lat: 13.735,
    lng: 100.535,
    type: "tax",
    title: "อาคารพาณิชย์ A",
    // Mock data for TaxCard
    propertyId: "LD-2025-089",
    propertyType: "อาคารพาณิชย์",
    owner: "นายสมชาย ใจดี",
    address: "123/45 หมู่ 4 ต.บางรัก อ.เมือง จ.กรุงเทพฯ",
    appraisalValue: "5,200,000",
    taxStatus: "ชำระแล้ว",
    taxAmount: "฿12,500",
    dueDate: "05 พ.ย. 2568",
  },
];

interface SmartCityMapProps {
  activeLayer: string | null;
  mapRef: React.RefObject<MapRef | null>;
}

export default function SmartCityMap({
  activeLayer,
  mapRef,
}: SmartCityMapProps) {
  const [popupInfo, setPopupInfo] = useState<any | null>(null);

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
        {filteredPins.map((pin) => (
          <Marker
            key={pin.id}
            latitude={pin.lat}
            longitude={pin.lng}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(pin);
            }}
          >
            <div className="cursor-pointer hover:scale-110 transition-transform duration-200">
              {pin.type === "water" && (
                <div className="bg-blue-500 p-2 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] border-2 border-white">
                  <Droplets className="text-white w-5 h-5" />
                </div>
              )}
              {pin.type === "fire" && (
                <div className="bg-red-500 p-2 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] border-2 border-white animate-pulse">
                  <Flame className="text-white w-5 h-5" />
                </div>
              )}
              {pin.type === "camera" && (
                <div className="bg-green-500 p-2 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)] border-2 border-white">
                  <Video className="text-white w-5 h-5" />
                </div>
              )}
              {pin.type === "tax" && (
                <div className="bg-gray-700 p-2 rounded-full shadow-[0_0_15px_rgba(55,65,81,0.5)] border-2 border-white">
                  <Home className="text-white w-5 h-5" />
                </div>
              )}
            </div>
          </Marker>
        ))}

        {/* 4. Popup Card */}
        {popupInfo && (
          <Popup
            anchor="top"
            latitude={popupInfo.lat}
            longitude={popupInfo.lng}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            className="custom-popup z-50 p-0"
            maxWidth="400px"
            offset={15}
          >
            {/* Card 1: Water */}
            {popupInfo.type === "water" && (
              <div className="p-0 rounded-lg overflow-hidden w-60">
                <div className="bg-blue-600 p-3 flex justify-between items-center">
                  <span className="text-white font-bold flex items-center gap-2">
                    <Droplets size={16} /> ระดับน้ำ
                  </span>
                  <span className="bg-blue-800 text-xs text-white px-2 py-1 rounded">
                    ปกติ
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">
                    {popupInfo.title}
                  </h3>
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Capacity</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {popupInfo.level}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card 2: Fire */}
            {popupInfo.type === "fire" && (
              <div className="p-0 rounded-lg overflow-hidden w-60">
                <div className="bg-red-600 p-3 flex justify-between items-center animate-pulse">
                  <span className="text-white font-bold flex items-center gap-2">
                    <AlertTriangle size={16} /> แจ้งเตือนความร้อน
                  </span>
                  <span className="bg-white text-red-600 text-xs font-bold px-2 py-1 rounded">
                    DANGER
                  </span>
                </div>
                <div className="p-4 bg-white border-b-4 border-red-600">
                  <h3 className="font-bold text-gray-800 text-lg mb-2">
                    {popupInfo.title}
                  </h3>
                  <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
                    <Thermometer className="text-red-500" />
                    <div>
                      <p className="text-xs text-red-400">Current Temp</p>
                      <p className="text-xl font-bold text-red-700">
                        {popupInfo.temp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card 3: Camera */}
            {popupInfo.type === "camera" && (
              <div className="p-0 rounded-lg overflow-hidden w-64 bg-gray-900 text-white">
                <div className="relative h-32 bg-gray-800 flex items-center justify-center">
                  <Video className="text-gray-600 w-10 h-10" />
                  <div className="absolute top-2 left-2 bg-red-600 text-[10px] px-2 rounded flex items-center gap-1 animate-pulse">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/50 text-[10px] px-2 rounded">
                    CAM-04
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm mb-1">{popupInfo.title}</h3>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Activity size={12} /> Online
                    </span>
                    <span>{popupInfo.viewers} watching</span>
                  </div>
                </div>
              </div>
            )}

            {/* Card 4: Tax */}
            {popupInfo.type === "tax" && (
              <TaxCard
                data={{
                  id: "TX-2568-009123", // Mock ID from image
                  propertyId: popupInfo.propertyId,
                  propertyType: popupInfo.propertyType,
                  owner: popupInfo.owner,
                  address: popupInfo.address,
                  appraisalValue: popupInfo.appraisalValue,
                  taxStatus: popupInfo.taxStatus,
                  taxAmount: popupInfo.taxAmount,
                  dueDate: popupInfo.dueDate,
                }}
                onClose={() => setPopupInfo(null)}
              />
            )}
          </Popup>
        )}
      </Map>
    </div>
  );
}
