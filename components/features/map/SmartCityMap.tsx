"use client";

import React, { useState, useMemo } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  Source,
  Layer,
  ViewStateChangeEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css"; // 👈 อย่าลืม import CSS ไม่งั้นแมพพัง!
import { Droplets, Flame, MapPin } from "lucide-react"; // ใช้ Icon จาก Lucide แทนรูปภาพก่อนได้
import { zonesGeoJson, pinsData } from "@/data/mock-map-data";

// Mapbox Token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function SmartCityMap() {
  // State สำหรับเก็บตำแหน่ง Popup ที่เปิดอยู่
  const [popupInfo, setPopupInfo] = useState<{
    lat: number;
    lng: number;
    title: string;
  } | null>(null);

  // Initial View State (กรุงเทพฯ)
  const [viewState, setViewState] = useState({
    latitude: 13.71,
    longitude: 100.515,
    zoom: 13,
  });

  // Style สำหรับ Layer พื้นที่ระบายสี (Fill)

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border border-gray-200">
      <Map
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        // เปลี่ยน Style map ได้ที่นี่ (ดาวเทียม: satellite-streets-v12)
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false} // ปิด Credit รกๆ (ถ้าจ่ายเงินแล้ว)
      >
        {/* 1. ปุ่ม Zoom In/Out */}
        <NavigationControl position="bottom-right" />

        {/* 2. แสดง Zone (Polygon) */}
        <Source
          id="zones-data"
          type="geojson"
          data={zonesGeoJson as any}
        ></Source>

        {/* 3. แสดง Pins (Markers) */}
        {pinsData.map((pin) => (
          <Marker
            key={pin.id}
            latitude={pin.lat}
            longitude={pin.lng}
            anchor="bottom"
            onClick={(e) => {
              // ป้องกัน Event ทะลุไปโดน Map
              e.originalEvent.stopPropagation();
              setPopupInfo({ lat: pin.lat, lng: pin.lng, title: pin.title });
            }}
          >
            {/* Custom Icon Icon: ใช้ Lucide หรือ <img> ก็ได้ */}
            <div className="cursor-pointer hover:scale-110 transition-transform duration-200">
              {pin.type === "water" ? (
                <div className="bg-blue-500 p-2 rounded-full shadow-lg border-2 border-white">
                  <Droplets className="text-white w-5 h-5" />
                </div>
              ) : (
                <div className="bg-red-500 p-2 rounded-full shadow-lg border-2 border-white">
                  <Flame className="text-white w-5 h-5" />
                </div>
              )}
            </div>
          </Marker>
        ))}

        {/* 4. แสดง Popup เมื่อคลิก Pin */}
        {popupInfo && (
          <Popup
            anchor="top"
            latitude={popupInfo.lat}
            longitude={popupInfo.lng}
            onClose={() => setPopupInfo(null)}
            closeButton={false} // ปิดปุ่ม x เดิมของ mapbox แล้วทำเองสวยกว่า
            className="custom-popup" // เอาไปแต่ง CSS ต่อได้
          >
            <div className="p-2 min-w-[150px]">
              <h3 className="font-bold text-gray-800 mb-1">
                {popupInfo.title}
              </h3>
              <p className="text-xs text-gray-500">
                คลิกเพื่อดูรายละเอียดเพิ่มเติม
              </p>
              <button
                className="mt-2 w-full bg-indigo-600 text-white text-xs py-1 px-2 rounded hover:bg-indigo-700"
                onClick={() => alert("ดูรายละเอียด: " + popupInfo.title)}
              >
                ดูข้อมูล
              </button>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
