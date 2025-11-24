import { Droplets } from "lucide-react";
import { requestData } from "@/data/mock-table-data";
import { RequestTable } from "@/components/features/dashboard/RequestTable";

export default function TableWaterPage() {
  return (
    <>
      {/* --- Section 1: Header (ปรับตาม Layout ใหม่) --- */}
      <section className="p-6 flex gap-4 bg-white border-b border-gray-200">
        <div className="p-3 flex justify-center items-center rounded-xl bg-blue-50 text-blue-600">
          <Droplets className="w-6 h-6" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-900 leading-none mb-1">
            ระบบตรวจสอบปริมาณและคุณภาพน้ำ
          </h1>
          <p className="text-muted-foreground text-sm">
            แดชบอร์ดภาพรวมและการจัดการทรัพยากรน้ำ
          </p>
        </div>
      </section>

      {/* --- Section 2: Main Content --- */}
      <div className="p-6 w-full space-y-8 mx-auto">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">รายการคำขอล่าสุด</h2>
          <RequestTable data={requestData} />
        </div>
      </div>
    </>
  );
}
