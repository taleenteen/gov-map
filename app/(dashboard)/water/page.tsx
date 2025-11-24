import { Droplets } from "lucide-react";
import { StatCard } from "@/components/features/dashboard/StatCard";
import { ChartCard } from "@/components/features/dashboard/ChartCard";
import { RecentActivityList } from "@/components/features/dashboard/RecentActivityList";
import { waterStats, recentActivities } from "@/data/mock-water-data";

export default function WaterDashboardPage() {
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
      <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
        {/* 1. Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {waterStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              trendDirection={stat.trendDirection}
            />
          ))}
        </div>

        {/* 2. Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* กราฟเส้น (Area Chart) - กินพื้นที่ 2 ส่วน */}
          <div className="lg:col-span-2 h-[400px]">
            <ChartCard title="แนวโน้มกิจกรรมรายเดือน">
              <div className="w-full h-full flex items-center justify-center bg-blue-50/20 rounded-lg border border-dashed border-blue-200 text-blue-400">
                [ Area Chart Component Placeholder ]
              </div>
            </ChartCard>
          </div>

          {/* กราฟวงกลม (Pie Chart) - กินพื้นที่ 1 ส่วน */}
          <div className="h-[400px]">
            <ChartCard title="Status Distribution">
              <div className="w-full h-full flex items-center justify-center bg-green-50/20 rounded-lg border border-dashed border-green-200 text-green-500">
                [ Pie Chart Component Placeholder ]
              </div>
            </ChartCard>
          </div>
        </div>

        {/* 3. Recent Activity List (Component ใหม่ที่เพิ่งทำ) */}
        <div>
          <RecentActivityList items={recentActivities} />
        </div>
      </div>
    </>
  );
}
