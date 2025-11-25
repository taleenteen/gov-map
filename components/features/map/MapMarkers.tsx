import React from "react";
import { Marker } from "react-map-gl/mapbox";
import { Droplets, Flame, Video, Home } from "lucide-react";
import { Pin } from "@/data/map-pins";

interface MapMarkersProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
}

export default function MapMarkers({ pins, onPinClick }: MapMarkersProps) {
  return (
    <>
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          latitude={pin.lat}
          longitude={pin.lng}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onPinClick(pin);
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
    </>
  );
}
