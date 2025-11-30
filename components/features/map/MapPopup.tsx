import React from "react";
import { Popup } from "react-map-gl/mapbox";
import TaxCard from "@/components/features/cards/TaxCard";
import WaterCard from "@/components/features/cards/WaterCard";
import FireCard from "@/components/features/cards/FireCard";
import CameraCard from "@/components/features/cards/CameraCard";
import { Pin } from "@/types/map";
import { PinType } from "@/types/api";

interface MapPopupProps {
  popupInfo: any; // Using any to accommodate both legacy Pin and new ApiPin structure with attributes
  onClose: () => void;
}

export default function MapPopup({ popupInfo, onClose }: MapPopupProps) {
  // Helper to safely get attribute values
  const getAttr = (key: string, defaultValue: any = "") => {
    return popupInfo[key] || defaultValue;
  };

  const type = popupInfo.type?.toUpperCase();

  return (
    <Popup
      anchor="top"
      latitude={popupInfo.lat}
      longitude={popupInfo.lng}
      onClose={onClose}
      closeButton={false}
      closeOnClick={false}
      className="custom-popup z-50 p-0"
      maxWidth="450px"
      offset={1}
    >
      {/* Card 1: Water */}
      {type === PinType.WATER && (
        <WaterCard
          data={{
            id: popupInfo.id,
            title: popupInfo.title,
            status:
              (popupInfo.status as "Normal" | "Danger" | "Warning") || "Normal",
            systemName:
              "ระบบตรวจสอบปริมาณและคุณภาพน้ำ (Smart Water Monitoring)",
            measurements: [
              {
                label: "pH",
                value: getAttr("ph")
                  ? `${getAttr("ph")} (อยู่ในเกณฑ์ปกติ)`
                  : "N/A",
                isNormal: true,
              },
              {
                label: "ความขุ่น",
                value: getAttr("turbidity")
                  ? `${getAttr("turbidity")} NTU`
                  : "N/A",
                isNormal: true,
              },
              {
                label: "DO (ออกซิเจนละลายน้ำ)",
                value: getAttr("do") ? `${getAttr("do")} mg/L` : "N/A",
                isNormal: true,
              },
              {
                label: "ปริมาณน้ำ",
                value: getAttr("water_level") || "N/A",
                isNormal: true,
              },
              {
                label: "เซ็นเซอร์น้ำ",
                value: getAttr("water_sensor") || "ปกติ",
                isNormal: true,
              },
            ],
            summary: "สถานะรวม: น้ำอยู่ในเกณฑ์ดี — พร้อมใช้งานตามมาตรฐาน",
            summaryStatus: "Good",
          }}
          onClose={onClose}
        />
      )}

      {/* Card 2: Fire */}
      {type === PinType.FIRE && (
        <FireCard
          data={{
            title: popupInfo.title,
            temp: getAttr("temp", "N/A"),
            alert: getAttr("alert", "Normal"),
          }}
          onClose={onClose}
        />
      )}

      {/* Card 3: Camera */}
      {type === PinType.CAMERA && (
        <CameraCard
          data={{
            title: popupInfo.title,
            viewers: parseInt(getAttr("viewers", "0")),
            status: popupInfo.status || "Online",
            location: getAttr("location", "Unknown"),
            time: getAttr("time", "Now"),
            alertMessage: getAttr("alertMessage"),
          }}
          onClose={onClose}
        />
      )}

      {/* Card 4: Tax */}
      {type === PinType.TAX && (
        <TaxCard
          data={{
            id: getAttr("dataId", "TX-XXXX-XXXXXX"),
            propertyId: getAttr("propertyId"),
            propertyType: getAttr("propertyType"),
            owner: getAttr("owner"),
            address: getAttr("address"),
            appraisalValue: getAttr("appraisalValue"),
            taxStatus: getAttr("taxStatus", "Paid"),
            taxAmount: getAttr("taxAmount"),
            dueDate: getAttr("dueDate"),
          }}
          onClose={onClose}
        />
      )}
    </Popup>
  );
}
