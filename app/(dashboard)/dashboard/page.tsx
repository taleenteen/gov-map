import { StatCard } from "@/components/features/dashboard/StatCard";
import { ChartCard } from "@/components/features/dashboard/ChartCard";
import { ServiceCard } from "@/components/features/dashboard/ServiceCard";
import { statsData, servicesData } from "@/data/mock-dashboard-data";
import { SquareKanban } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <section className="p-6 flex gap-3 bg-white border-b-gray-500">
        <div className="p-4 flex justify-center items-center rounded-xl bg-slate-50 text-slate-600">
          <SquareKanban className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard ภาพรวม</h1>
          <p className="text-muted-foreground text-sm">
            ภาพรวมการใช้งานบริการทั้งหมดในระบบ GovCenter
          </p>
        </div>
      </section>
      <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-[350px]">
            <ChartCard title="กิจกรรมรายเดือน">
              <div className="w-full h-full flex items-center justify-center bg-blue-50/30 rounded-lg border border-dashed border-blue-200 text-blue-400">
                [ Area Chart Component Placehoder ]
              </div>
            </ChartCard>
          </div>
          <div className="h-[350px]">
            <ChartCard title="การใช้งานตามประเภท">
              <div className="w-full h-full flex items-center justify-center bg-gray-50/30 rounded-lg border border-dashed border-gray-200 text-gray-400">
                [ Bar Chart Component Placehoder ]
              </div>
            </ChartCard>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">บริการทั้งหมด</h2>
            <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
              เลือกบริการเพื่อดูรายละเอียด
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesData.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                icon={service.icon}
                status={service.status}
                stats={service.stats}
                colorClass={service.colorClass}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
