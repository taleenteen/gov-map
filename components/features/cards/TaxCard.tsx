import React, { useState } from "react";
import {
  X,
  MapPin,
  Home,
  User,
  FileText,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaxCardProps {
  data: {
    id: string;
    propertyId: string;
    propertyType: string;
    owner: string;
    address: string;
    appraisalValue: string;
    taxStatus: string;
    taxAmount: string;
    dueDate: string;
  };
  onClose?: () => void;
}

export default function TaxCard({ data, onClose }: TaxCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-[350px] bg-white rounded-xl overflow-hidden shadow-xl font-sans transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="bg-[#475569] text-white p-3 flex justify-between items-center">
        <h3 className="font-semibold text-lg">รายละเอียดทรัพย์สิน</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* ID & Status Badge */}
        <div className="flex justify-between items-start">
          <span className="text-gray-900 font-medium">{data.id}</span>
          <span className="bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
            ชำระแล้ว
          </span>
        </div>

        {/* Details List */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <span>รหัสทรัพย์สิน: {data.propertyId}</span>
          </div>
          <div className="flex items-start gap-3">
            <Home className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <span>ประเภททรัพย์สิน: {data.propertyType}</span>
          </div>
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <span>เจ้าของ: {data.owner}</span>
          </div>
          <div className="flex items-start gap-3">
            <Home className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <span>{data.address}</span>
          </div>
          <div className="flex items-start gap-3">
            <Home className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <span>มูลค่าประเมิน: {data.appraisalValue} บาท</span>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
            <span>
              สถานะภาษี:{" "}
              <span className="text-green-600">{data.taxStatus}</span>
            </span>
          </div>
        </div>

        {/* Tax Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <h4 className="font-semibold text-gray-900 mb-2">ข้อมูลภาษี</h4>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">ยอดภาษี</span>
            <span className="font-bold text-gray-900">{data.taxAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">กำหนดชำระ</span>
            <span className="text-gray-900">{data.dueDate}</span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium py-2 transition-colors"
        >
          {isExpanded ? (
            <>
              ซ่อนรายละเอียดเพิ่มเติม <ChevronUp size={16} />
            </>
          ) : (
            <>
              ดูรายละเอียดเพิ่มเติม <ChevronDown size={16} />
            </>
          )}
        </button>

        {/* Collapsible Content */}
        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Action Buttons */}
            <div className="space-y-2">
              <Button className="w-full bg-[#198754] hover:bg-[#157347] text-white h-9">
                ดูประวัติการชำระ
              </Button>
              <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white h-9">
                ส่งหนังสือแจ้งเตือน
              </Button>
              <Button className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white h-9">
                ดำเนินการทางกฎหมาย
              </Button>
            </div>

            <hr className="border-gray-200" />

            {/* Footer: Risk Level */}
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">ข้อมูลเพิ่มเติม</h4>
                <p className="text-sm text-gray-600">ระดับความเสี่ยง</p>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
