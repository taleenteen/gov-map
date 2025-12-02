"use client";

import React, { useState, useRef, useCallback } from "react";
import Map, {
  Source,
  Layer,
  ViewStateChangeEvent,
  MapRef,
  MapMouseEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { zonesGeoJson } from "@/data/mock-map-data";
import { PinService } from "@/services/pin.service";
import { ApiPin, PinType } from "@/types/api";
import { Pin } from "@/types/map";
import MapPopup from "./MapPopup";
import WaterCard from "@/components/features/cards/WaterCard";
import { generatePinImage, ICONS } from "@/utils/map-style-utils";

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
  const [pins, setPins] = useState<ApiPin[]>([]);

  React.useEffect(() => {
    const fetchPins = async () => {
      try {
        const data = await PinService.getAll();
        setPins(data);
      } catch (error) {
        console.error("Failed to fetch pins:", error);
      }
    };
    fetchPins();
  }, []);

  // Filter pins based on activeLayer
  const filteredPins = activeLayer
    ? pins.filter((pin) => pin.type.toLowerCase() === activeLayer.toLowerCase())
    : pins;

  // Separate pins into points and zones
  const pointPins = filteredPins.filter(
    (pin) => !pin.geometry || pin.geometry.type === "POINT"
  );
  const zonePins = filteredPins.filter(
    (pin) => pin.geometry?.type === "LINESTRING"
  );

  const pointsGeoJson = {
    type: "FeatureCollection",
    features: pointPins.map((pin) => {
      // Determine icon based on type
      let icon = "pin-water";
      switch (pin.type) {
        case PinType.WATER:
          icon = "pin-water";
          break;
        case PinType.FIRE:
          icon = "pin-fire";
          break;
        case PinType.CAMERA:
          icon = "pin-camera";
          break;
        case PinType.TAX:
          icon = "pin-tax";
          break;
        case PinType.INFRASTRUCTURE:
          icon = "pin-groundwater";
          break;
        default:
          icon = "pin-water";
      }

      // Handle geometry (support both legacy lat/lng and GeoJSON)
      let coordinates = [100.515, 13.715]; // Default
      if (
        pin.geometry &&
        typeof pin.geometry.coordinates === "object" &&
        Array.isArray(pin.geometry.coordinates)
      ) {
        coordinates = pin.geometry.coordinates as number[];
      } else if (pin.geometry?.lng && pin.geometry?.lat) {
        coordinates = [pin.geometry.lng, pin.geometry.lat];
      }

      return {
        type: "Feature",
        properties: {
          id: pin.id,
          title: pin.title,
          description: pin.description,
          type: pin.type,
          subtype: pin.subtype,
          status: pin.status,
          updatedAt: pin.updatedAt,
          lat: coordinates[1],
          lng: coordinates[0],
          // Helper property for icon-image expression
          icon,
          // Map attributes to display properties if needed
          ...pin.attributes,
        },
        geometry: {
          type: "Point",
          coordinates,
        },
      };
    }),
  };

  const zonesDataGeoJson = {
    type: "FeatureCollection",
    features: zonePins.map((pin) => ({
      type: "Feature",
      properties: {
        id: pin.id,
        title: pin.title,
        description: pin.description,
        type: pin.type,
        status: pin.status,
        ...pin.attributes,
      },
      geometry: {
        type: "LineString",
        coordinates: pin.geometry?.coordinates || [],
      },
    })),
  };

  const [cursor, setCursor] = useState<string>("auto");

  const onMapLoad = useCallback((e: any) => {
    const map = e.target;
    // Generate and add images
    generatePinImage(map, "pin-water", "#3b82f6", ICONS.droplet);
    generatePinImage(map, "pin-fire", "#ef4444", ICONS.flame);
    generatePinImage(map, "pin-camera", "#a855f7", ICONS.video);
    generatePinImage(map, "pin-tax", "#374151", ICONS.home);
    generatePinImage(map, "pin-pond", "#60a5fa", ICONS.waves, 0.75); // Smaller scale
    generatePinImage(map, "pin-groundwater", "#0891b2", ICONS.cylinder, 0.75); // Smaller scale
  }, []);

  const onMouseEnter = useCallback(() => setCursor("pointer"), []);
  const onMouseLeave = useCallback(() => setCursor("auto"), []);

  const onClick = (event: MapMouseEvent) => {
    const feature = event.features?.[0];
    if (!feature) {
      setPopupInfo(null);
      return;
    }

    const clusterId = feature.properties?.cluster_id;

    if (clusterId) {
      // Clicked on a cluster
      const mapboxSource = mapRef.current?.getMap().getSource("pins");
      (mapboxSource as any).getClusterExpansionZoom(
        clusterId,
        (err: any, zoom: number) => {
          if (err) return;

          mapRef.current?.flyTo({
            center: (feature.geometry as any).coordinates,
            zoom,
            duration: 500,
          });
        }
      );
    } else {
      // Clicked on a pin
      const pin = feature.properties as Pin;
      // Only set popup for points, not zones/lines for now (unless requested)
      if (feature.geometry.type === "Point") {
        setPopupInfo(pin);
      }
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-900">
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
        onLoad={onMapLoad}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
        reuseMaps
        interactiveLayerIds={["clusters", "unclustered-point"]}
      >
        <Source id="zones-data" type="geojson" data={zonesDataGeoJson as any}>
          <Layer
            id="zone-fills"
            type="fill"
            paint={{ "fill-color": "#3b82f6", "fill-opacity": 0.2 }}
          />
          <Layer
            id="zone-lines"
            type="line"
            paint={{ "line-color": "#60a5fa", "line-width": 4 }}
          />
        </Source>

        <Source
          id="pins"
          type="geojson"
          data={pointsGeoJson as any}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          {/* Cluster Circles */}
          <Layer
            id="clusters"
            type="circle"
            filter={["has", "point_count"]}
            paint={{
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6", // < 100
                100,
                "#f1f075", // < 750
                750,
                "#f28cb1", // >= 750
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                20, // < 100
                100,
                30, // < 750
                750,
                40, // >= 750
              ],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#fff",
            }}
          />

          {/* Cluster Counts */}
          <Layer
            id="cluster-count"
            type="symbol"
            filter={["has", "point_count"]}
            layout={{
              "text-field": "{point_count_abbreviated}",
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            }}
            paint={{
              "text-color": "#ffffff",
            }}
          />

          {/* Unclustered Points (Icon) */}
          <Layer
            id="unclustered-point"
            type="symbol"
            filter={["!", ["has", "point_count"]]}
            layout={{
              "icon-image": ["get", "icon"],
              "icon-size": 1,
              "icon-allow-overlap": true,
            }}
          />

          {/* Badge Background (Circle) */}
          <Layer
            id="pin-badge-bg"
            type="circle"
            filter={[
              "all",
              ["!", ["has", "point_count"]],
              ["any", ["has", "level"], ["has", "viewers"], ["has", "alert"]],
            ]}
            paint={{
              "circle-radius": 12,
              "circle-color": [
                "case",
                ["has", "level"],
                "#2563eb", // blue-600
                ["has", "viewers"],
                "#ef4444", // red-500
                ["has", "alert"],
                "#eab308", // yellow-500
                "#000000",
              ],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
              "circle-translate": [14, -14], // Adjusted slightly further out
            }}
          />

          {/* Badge Text */}
          <Layer
            id="pin-badge-text"
            type="symbol"
            filter={[
              "all",
              ["!", ["has", "point_count"]],
              ["any", ["has", "level"], ["has", "viewers"], ["has", "alert"]],
            ]}
            layout={{
              "text-field": [
                "case",
                ["has", "level"],
                ["get", "level"],
                ["has", "viewers"],
                ["to-string", ["get", "viewers"]],
                ["has", "alert"],
                "!",
                "",
              ],
              "text-size": 10,
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-allow-overlap": true,
            }}
            paint={{
              "text-color": "#ffffff",
              "text-translate": [14, -14], // Matches circle-translate
            }}
          />

          {/* Label (Bottom) */}
          <Layer
            id="pin-label"
            type="symbol"
            filter={["all", ["!", ["has", "point_count"]], ["has", "label"]]}
            layout={{
              "text-field": ["get", "label"],
              "text-size": 12,
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-anchor": "top",
              "text-offset": [0, 1.5], // Below the icon
              "text-allow-overlap": false,
            }}
            paint={{
              "text-color": "#ffffff",
              "text-halo-color": "rgba(0,0,0,0.7)",
              "text-halo-width": 2,
            }}
          />
        </Source>

        {popupInfo &&
          (popupInfo.type as string).toUpperCase() !== PinType.WATER && (
            <MapPopup
              popupInfo={popupInfo}
              onClose={() => setPopupInfo(null)}
            />
          )}
      </Map>

      {popupInfo &&
        (popupInfo.type as string).toUpperCase() === PinType.WATER && (
          <WaterCard data={popupInfo} onClose={() => setPopupInfo(null)} />
        )}
    </div>
  );
}
