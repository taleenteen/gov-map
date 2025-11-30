import React from "react";
import { Popup } from "react-map-gl/mapbox";
import TaxCard from "@/components/features/cards/TaxCard";
import WaterCard from "@/components/features/cards/WaterCard";
import FireCard from "@/components/features/cards/FireCard";
import CameraCard from "@/components/features/cards/CameraCard";
import { Pin } from "@/types/map";

interface MapPopupProps {
  popupInfo: Pin;
  onClose: () => void;
}

export default function MapPopup({ popupInfo, onClose }: MapPopupProps) {
  return (
    <Popup
      anchor="top"
      latitude={popupInfo.lat}
      longitude={popupInfo.lng}
      onClose={onClose}
      closeButton={false}
      className="custom-popup z-50 p-0"
      maxWidth="450px"
      offset={1}
    >
      {/* Card 1: Water */}
      {popupInfo.type === "water" && (
        <WaterCard
          data={{
            id: popupInfo.id,
            title: popupInfo.title,
            status:
              (popupInfo.status as "Normal" | "Danger" | "Warning") || "Normal",
            systemName:
              "ระบบตรวจสอบปริมาณและคุณภาพน้ำ (Smart Water Monitoring)",
            measurements: [
              { label: "pH", value: "7.2 (อยู่ในเกณฑ์ปกติ)", isNormal: true },
              { label: "ความขุ่น", value: "8 NTU", isNormal: true },
              { label: "อุณหภูมิ", value: "29.4°C", isNormal: true },
              {
                label: "DO (ออกซิเจนละลายน้ำ)",
                value: "6.5 mg/L",
                isNormal: true,
              },
              { label: "คลอรีนอิสระ", value: "0.4 mg/L", isNormal: true },
              { label: "สี/กลิ่น", value: "ปกติ", isNormal: true },
            ],
            summary:
              popupInfo.status === "Danger"
                ? "สถานะรวม: น้ำอยู่ในเกณฑ์อันตราย — ไม่ควรนำไปใช้งาน"
                : popupInfo.status === "Warning"
                ? "สถานะรวม: น้ำอยู่ในเกณฑ์เฝ้าระวัง — ควรตรวจสอบก่อนใช้งาน"
                : "สถานะรวม: น้ำอยู่ในเกณฑ์ดี — พร้อมใช้งานตามมาตรฐาน",
            summaryStatus:
              popupInfo.status === "Danger"
                ? "Bad"
                : popupInfo.status === "Warning"
                ? "Bad" // Or add a Warning status to WaterCard if supported, otherwise Bad is red
                : "Good",
          }}
          onClose={onClose}
        />
      )}

      {/* Card 2: Fire */}
      {popupInfo.type === "fire" && (
        <FireCard
          data={{
            title: popupInfo.title,
            temp: popupInfo.temp,
            alert: popupInfo.alert,
          }}
          onClose={onClose}
        />
      )}

      {/* Card 3: Camera */}
      {popupInfo.type === "camera" && (
        <CameraCard
          data={{
            title: popupInfo.title,
            viewers: popupInfo.viewers,
            status: popupInfo.status,
            location: popupInfo.location,
            time: popupInfo.time,
            alertMessage: popupInfo.alertMessage,
          }}
          onClose={onClose}
        />
      )}

      {/* Card 4: Tax */}
      {popupInfo.type === "tax" && (
        <TaxCard
          data={{
            id: "TX-2568-009123", // Mock ID from image
            propertyId: popupInfo.propertyId || "",
            propertyType: popupInfo.propertyType || "",
            owner: popupInfo.owner || "",
            address: popupInfo.address || "",
            appraisalValue: popupInfo.appraisalValue || "",
            taxStatus: popupInfo.taxStatus as any,
            taxAmount: popupInfo.taxAmount || "",
            dueDate: popupInfo.dueDate || "",
          }}
          onClose={onClose}
        />
      )}
    </Popup>
  );
}
