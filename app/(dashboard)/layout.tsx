"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/features/app-sidebar";
import { BarChart3, Edit3, FileText, SquareKanban } from "lucide-react";
import { LucideIcon } from "lucide-react";
import RoleGuard from "@/components/features/auth/RoleGuard";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboardMenus: NavGroup[] = [
    {
      items: [
        { title: "ภาพรวม", url: "/dashboard/overview", icon: BarChart3 },
        {
          title: "จัดการ",
          url: "#",
          icon: Edit3,
          items: [
            { title: "แทงค์น้ำ", url: "/manage/tanks" },
            { title: "บ่อน้ำ", url: "/manage/ponds" },
            { title: "บ่อบาดาล", url: "/manage/groundwater" },
          ],
        },
        { title: "รายงาน", url: "/dashboard/reports", icon: FileText },
      ],
    },
  ];

  return (
    <RoleGuard>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "16rem",
            "--sidebar-width-icon": "5rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar extraGroups={dashboardMenus} />

        <SidebarInset>
          <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </RoleGuard>
  );
}
