import React, { useState, useCallback } from "react";
import { X, Search, Plus, Minus, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Map, {
  Source,
  Layer,
  Marker,
  MapMouseEvent,
  ViewStateChangeEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface CreatePinCardProps {
  onClose: () => void;
}

interface Point {
  id: number;
  lat: number;
  lng: number;
}

export function CreatePinCard({ onClose }: CreatePinCardProps) {
  const [locationType, setLocationType] = useState<"pin" | "area">("pin");
  const [points, setPoints] = useState<Point[]>([]);
  const [viewState, setViewState] = useState({
    latitude: 13.736717,
    longitude: 100.523186,
    zoom: 15,
  });

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      const { lng, lat } = event.lngLat;
      const newPoint = { id: Date.now(), lat, lng };

      if (locationType === "pin") {
        setPoints([newPoint]); // Replace existing point
      } else {
        setPoints((prev) => [...prev, newPoint]); // Add new point
      }
    },
    [locationType]
  );

  const handleDeletePoint = (id: number) => {
    setPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const geoJsonData = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: points.map((p) => [p.lng, p.lat]),
    },
  };

  return (
    <Card className="w-[900px] h-[600px] p-3 grid grid-cols-12 grid-rows-[1fr_auto] gap-4 shadow-2xl border-0 rounded-xl">
      {/* Left Side: Form */}
      <div className="col-span-5 flex flex-col bg-white p-0 overflow-y-auto">
        <CardHeader className="border-b border-gray-200 space-y-1 p-0 pb-4">
          <CardTitle className="text-xl font-bold p-0">เพิ่มหมุดใหม่</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-0 pt-4">
          {/* Visibility */}
          <div className="space-y-3">
            <Label className="text-xs text-gray-500">ตั้งค่าการมองเห็น</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="public"
                defaultChecked
                className="data-[state=checked]:bg-green-600"
              />
              <Label htmlFor="public" className="font-normal">
                สาธารณะ
              </Label>
            </div>
          </div>

          {/* Pin Type */}
          <RadioGroup defaultValue="e-service" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="e-service"
                id="e-service"
                className="text-green-600 border-green-600"
              />
              <Label htmlFor="e-service" className="font-normal">
                e-Service
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="info" id="info" />
              <Label htmlFor="info" className="font-normal">
                Info
              </Label>
            </div>
          </RadioGroup>

          {/* Category Dropdown */}
          <Select>
            <SelectTrigger className="w-full text-gray-500">
              <SelectValue placeholder="ประเภทหมุด" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="water">แหล่งน้ำ</SelectItem>
              <SelectItem value="fire">ดับเพลิง</SelectItem>
              <SelectItem value="camera">กล้อง CCTV</SelectItem>
            </SelectContent>
          </Select>

          {/* Inputs */}
          <div className="space-y-3">
            <Input placeholder="ชื่อหมุด" className="bg-gray-50/50" />
            <Input placeholder="Data ID" className="bg-gray-50/50" />
          </div>

          {/* Display Type */}
          <div className="space-y-3">
            <h4 className="font-bold text-lg">ประเภทที่จะแสดง</h4>
            <div className="h-px bg-gray-100 w-full" />
            <Label className="text-xs text-gray-500">
              ประเภทพารามิเตอร์ (เลือกได้หลายข้อ)
            </Label>

            <div className="space-y-2">
              {[
                "ค่า pH",
                "ค่า DO (ออกซิเจนละลายน้ำ)",
                "ความขุ่น",
                "ปริมาณน้ำ",
                "เซ็นเซอร์น้ำ",
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={item}
                    defaultChecked
                    className="data-[state=checked]:bg-green-600 border-gray-300"
                  />
                  <Label htmlFor={item} className="font-normal text-sm">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Location Inputs (Dynamic) */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">ตำแหน่งบนแผนที่</Label>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาตำแหน่ง..."
                className="pl-9 bg-gray-50/50"
              />
            </div>

            <div className="space-y-2">
              {points.length === 0 && (
                <div className="text-sm text-gray-400 text-center py-4 border border-dashed rounded-lg">
                  คลิกบนแผนที่เพื่อเพิ่มจุด
                </div>
              )}
              {points.map((point, index) => (
                <div
                  key={point.id}
                  className="space-y-1 p-2 border rounded-lg bg-gray-50 relative group"
                >
                  <div className="flex justify-between items-center">
                    <Label className="text-xs text-gray-500">
                      จุดที่ {index + 1}
                    </Label>
                    <button
                      onClick={() => handleDeletePoint(point.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={point.lat.toFixed(6)}
                      readOnly
                      className="bg-white h-8 text-xs"
                      placeholder="Lat"
                    />
                    <Input
                      value={point.lng.toFixed(6)}
                      readOnly
                      className="bg-white h-8 text-xs"
                      placeholder="Lng"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </div>

      {/* Right Side: Map Preview */}
      <div className="col-span-7 relative bg-gray-100 rounded-lg overflow-hidden h-full">
        <Map
          {...viewState}
          onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
          onClick={handleMapClick}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          attributionControl={false}
          cursor={locationType === "pin" ? "pointer" : "crosshair"}
        >
          {/* Render Lines for Area Mode */}
          {locationType === "area" && points.length > 1 && (
            <Source
              id="polyline-source"
              type="geojson"
              data={geoJsonData as any}
            >
              <Layer
                id="line-layer"
                type="line"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "#0ea5e9", // Sky blue
                  "line-width": 2,
                  "line-dasharray": [2, 1],
                }}
              />
            </Source>
          )}

          {/* Render Markers */}
          {points.map((point, index) => (
            <Marker
              key={point.id}
              latitude={point.lat}
              longitude={point.lng}
              anchor="bottom"
            >
              <div className="relative flex flex-col items-center">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md">
                  {index + 1}
                </div>
                <div className="w-0.5 h-2 bg-green-600" />
              </div>
            </Marker>
          ))}
        </Map>

        {/* Top Right: Pin/Area Toggle */}
        <div className="absolute top-4 right-4 bg-white p-1 rounded-lg shadow-md z-10">
          <RadioGroup
            value={locationType}
            onValueChange={(v) => {
              setLocationType(v as "pin" | "area");
              setPoints([]); // Reset points when switching mode
            }}
            className="flex gap-1"
          >
            <div className="flex items-center">
              <RadioGroupItem
                value="pin"
                id="map-loc-pin"
                className="peer sr-only"
              />
              <Label
                htmlFor="map-loc-pin"
                className="px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium transition-colors peer-data-[state=checked]:bg-green-600 peer-data-[state=checked]:text-white text-gray-600 hover:bg-gray-100"
              >
                หมุด
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem
                value="area"
                id="map-loc-area"
                className="peer sr-only"
              />
              <Label
                htmlFor="map-loc-area"
                className="px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium transition-colors peer-data-[state=checked]:bg-green-600 peer-data-[state=checked]:text-white text-gray-600 hover:bg-gray-100"
              >
                หมุดพื้นที่
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Bottom Right: Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none border-b"
              onClick={() =>
                setViewState((prev) => ({ ...prev, zoom: prev.zoom + 1 }))
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() =>
                setViewState((prev) => ({ ...prev, zoom: prev.zoom - 1 }))
              }
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-white shadow-md rounded-lg"
            onClick={() =>
              setViewState({
                latitude: 13.736717,
                longitude: 100.523186,
                zoom: 15,
              })
            }
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardFooter className="col-span-12 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          className="rounded-full px-8 border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          ยกเลิก
        </Button>
        <Button className="rounded-full px-8 bg-green-700 hover:bg-green-800 text-white">
          เพิ่มหมุด
        </Button>
      </CardFooter>
    </Card>
  );
}
