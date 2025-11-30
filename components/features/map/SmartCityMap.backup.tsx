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
import { urgentPins } from "@/data/map-pins";
import { Pin } from "@/types/map";
import MapPopup from "./MapPopup";
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

  // Filter pins based on activeLayer
  const filteredPins = activeLayer
    ? urgentPins.filter((pin) => pin.type === activeLayer)
    : urgentPins;

  const pinsGeoJson = {
    type: "FeatureCollection",
    features: filteredPins.map((pin) => ({
      type: "Feature",
      properties: {
        ...pin,
        // Helper property for icon-image expression
        icon:
          pin.type === "water"
            ? "pin-water"
            : pin.type === "fire"
            ? "pin-fire"
            : pin.type === "camera"
            ? "pin-camera"
            : pin.type === "tax"
            ? "pin-tax"
            : pin.subtype === "pond"
            ? "pin-pond"
            : "pin-groundwater",
      },
      geometry: {
        type: "Point",
        coordinates: [pin.lng, pin.lat],
      },
    })),
  };

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

  const onClick = (event: MapMouseEvent) => {
    const feature = event.features?.[0];
    if (!feature) return;

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
      setPopupInfo(pin);
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
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
        reuseMaps
        interactiveLayerIds={["clusters", "unclustered-point"]}
      >
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

        <Source
          id="pins"
          type="geojson"
          data={pinsGeoJson as any}
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

        {popupInfo && (
          <MapPopup popupInfo={popupInfo} onClose={() => setPopupInfo(null)} />
        )}
      </Map>
    </div>
  );
}
