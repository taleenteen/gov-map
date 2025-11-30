import React from "react";
import { Marker } from "react-map-gl/mapbox";
import { Droplets, Flame, Video, Home, Waves, Cylinder } from "lucide-react";
import { Pin } from "@/types/map";
import { PinEService } from "@/components/features/map/pins/PinEService";
import { PinInfo } from "@/components/features/map/pins/PinInfo";

interface MapMarkersProps {
  clusters: any[];
  onPinClick: (pin: Pin) => void;
  supercluster: any;
  setViewState: any;
}

export default function MapMarkers({
  clusters,
  onPinClick,
  supercluster,
  setViewState,
}: MapMarkersProps) {
  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  20
                );
                setViewState((prev: any) => ({
                  ...prev,
                  latitude,
                  longitude,
                  zoom: expansionZoom,
                  transitionDuration: 500,
                }));
              }}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full text-white font-bold border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                {pointCount}
              </div>
            </Marker>
          );
        }

        // It's a single pin (leaf)
        const pin = cluster.properties as Pin;
        let color = "bg-gray-500";
        let hoverColor = "hover:bg-gray-600";
        let Icon = Home;
        let badge = undefined;

        switch (pin.type) {
          case "water":
            color = "bg-blue-500";
            hoverColor = "hover:bg-blue-600";
            Icon = Droplets;
            if (pin.level) badge = { text: pin.level, color: "bg-blue-600" };
            break;
          case "fire":
            color = "bg-red-500";
            hoverColor = "hover:bg-red-600";
            Icon = Flame;
            if (pin.alert) badge = { text: "!", color: "bg-yellow-500" };
            break;
          case "camera":
            color = "bg-purple-500";
            hoverColor = "hover:bg-purple-600";
            Icon = Video;
            if (pin.viewers)
              badge = { text: pin.viewers.toString(), color: "bg-red-500" };
            break;
          case "tax":
            color = "bg-slate-700";
            hoverColor = "hover:bg-slate-800";
            Icon = Home;
            badge = { text: "$", color: "bg-yellow-500" };
            break;
          case "info":
            if (pin.subtype === "pond") {
              Icon = Waves;
              color = "bg-blue-400";
            } else {
              Icon = Cylinder;
              color = "bg-cyan-600";
            }
            return (
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
                <PinInfo icon={Icon} label={pin.label} color={color} />
              </Marker>
            );
        }

        return (
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
            <PinEService
              icon={Icon}
              color={color}
              hoverColor={hoverColor}
              badge={badge}
            />
          </Marker>
        );
      })}
    </>
  );
}
