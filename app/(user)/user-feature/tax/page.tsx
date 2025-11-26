"use client";

import React, { useState } from "react";
import { ArrowLeft, FileText, Receipt, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// --- Mock Data ---
const taxItems = [
  {
    id: "LD-2025-089",
    title: "ภาษีที่ดินและสิ่งปลูกสร้าง",
    type: "ที่อยู่อาศัย",
    subType: "ภ.ง.ด.90",
    landId: "1234",
    year: "2568",
    amount: 1250.0,
    dueDate: "31 มกราคม 2568",
    status: "overdue", // overdue, paid, pending
  },
  {
    id: "SG-2025-142",
    title: "ภาษีป้าย",
    type: "พาณิชยกรรม",
    subType: "ภ.ง.ด.90",
    landId: "5678",
    year: "2568",
    amount: 3800.0,
    dueDate: "15 กุมภาพันธ์ 2568",
    status: "pending",
  },
  {
    id: "WT-2025-001",
    title: "ค่าน้ำประปา",
    type: "ที่อยู่อาศัย",
    subType: "-",
    landId: "9988",
    year: "2568",
    amount: 5420.0,
    dueDate: "10 มกราคม 2568",
    status: "paid",
  },
];

export default function UserTaxPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "overdue" | "paid">("all");

  // Filter items
  const filteredItems = taxItems.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "overdue") return item.status === "overdue";
    if (activeTab === "paid") return item.status === "paid";
    return true;
  });

  // Calculate total
  const totalAmount = filteredItems
    .filter((item) => item.status !== "paid")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-8">
      {/* --- Header --- */}
      <header className="bg-white sticky top-0 z-10 border-b border-gray-100 px-4 py-4 md:px-8 md:py-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="-ml-2 text-gray-500"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              ชำระภาษี
            </h1>
            <p className="text-sm text-gray-500">
              จัดการภาษีและชำระเงินออนไลน์
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 md:px-8 space-y-6">
        {/* --- Tabs --- */}
        <div className="flex p-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <TabButton
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
            label="รายการภาษีที่ต้องชำระ"
          />
          <TabButton
            active={activeTab === "overdue"}
            onClick={() => setActiveTab("overdue")}
            label="ค้างชำระ"
          />
          <TabButton
            active={activeTab === "paid"}
            onClick={() => setActiveTab("paid")}
            label="ชำระแล้ว"
          />
        </div>

        {/* --- List --- */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <TaxCard key={item.id} item={item} />
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>ไม่พบรายการ</p>
            </div>
          )}
        </div>
      </main>

      {/* --- Footer (Sticky Bottom) --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:static md:bg-transparent md:border-none md:p-0 md:mt-8">
        <div className="max-w-4xl mx-auto md:bg-white md:p-6 md:rounded-2xl md:shadow-sm md:border md:border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">ยอดรวมทั้งหมด</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-600">
                ฿
                {totalAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {filteredItems.length} รายการ • รวมภาษีทั้งหมด
            </p>
          </div>
          <Button className="h-12 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-lg shadow-emerald-100">
            ชำระเงินทั้งหมด
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Components ---

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
        active
          ? "bg-emerald-500 text-white shadow-sm"
          : "text-gray-500 hover:bg-gray-50"
      )}
    >
      {label}
    </button>
  );
}

function TaxCard({ item }: { item: (typeof taxItems)[0] }) {
  const isPaid = item.status === "paid";
  const isOverdue = item.status === "overdue";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
          {isOverdue && (
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-md">
              ค้างชำระ
            </span>
          )}
          {item.status === "pending" && (
            <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2.5 py-1 rounded-md">
              รอชำระ
            </span>
          )}
          {isPaid && (
            <span className="bg-green-100 text-green-600 text-xs font-bold px-2.5 py-1 rounded-md">
              ชำระแล้ว
            </span>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-gray-500">รหัสทรัพย์สิน</div>
          <div className="text-right font-medium text-gray-900">{item.id}</div>

          <div className="text-gray-500">ประเภททรัพย์สิน</div>
          <div className="text-right font-medium text-gray-900">
            {item.type}
          </div>

          <div className="text-gray-500">ประเภทแปลง</div>
          <div className="text-right font-medium text-gray-900">
            {item.subType}
          </div>

          <div className="text-gray-500">เลขที่ดิน</div>
          <div className="text-right font-medium text-gray-900">
            {item.landId}
          </div>

          <div className="text-gray-500">ปีภาษี</div>
          <div className="text-right font-medium text-gray-900">
            {item.year}
          </div>
        </div>

        <div className="border-t border-gray-100 my-4" />

        {/* Amount */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-500 mb-1">ยอดต้องชำระ</p>
            <p className="text-xs text-red-500">วันที่ครบกำหนด</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-emerald-600">
              ฿
              {item.amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs text-red-500 mt-1">{item.dueDate}</p>
          </div>
        </div>

        {/* Actions */}
        {!isPaid && (
          <div className="space-y-3 pt-2">
            <Button className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium gap-2 shadow-sm">
              <CreditCard className="w-4 h-4" /> ชำระภาษี
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11 rounded-xl border-gray-200 bg-gray-50 hover:bg-white text-gray-600 gap-2"
              >
                <FileText className="w-4 h-4" /> ดูใบรายการ
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-11 rounded-xl border-gray-200 bg-gray-50 hover:bg-white text-gray-600 gap-2"
              >
                <Receipt className="w-4 h-4" /> ดูใบประเมิน
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
