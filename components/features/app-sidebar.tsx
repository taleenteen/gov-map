"use client";
import {
  Calendar,
  Home,
  Inbox, // ใช้แทนงานบริการในตัวอย่างเดิม
  Search,
  Settings,
  Briefcase, // ไอคอนกระเป๋าสำหรับ "งานบริการ"
  ChevronRight, // ไอคอนลูกศร
  LayoutDashboard, // ไอคอน Dashboard
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  useSidebar,
  SidebarMenuSub, // ✅ เพิ่มสำหรับเมนูย่อย
  SidebarMenuSubItem, // ✅ เพิ่มสำหรับเมนูย่อย
  SidebarMenuSubButton, // ✅ เพิ่มสำหรับเมนูย่อย
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"; // ✅ Import Collapsible
import { AppLogo } from "@/components/features/brand/AppLogo";
import { cn } from "@/lib/utils";

// เมนูทั่วไป (ล่างสุด)
const mainItems = [
  { title: "หน้าหลัก", url: "#", icon: Home },
  { title: "แดชบอร์ด", url: "#", icon: LayoutDashboard }, // เปลี่ยนไอคอนให้ตรงภาพ
  { title: "ตั้งค่า", url: "#", icon: Settings },
  { title: "ช่วยเหลือ", url: "#", icon: Calendar }, // ในภาพเป็นเครื่องหมายตกใจ แต่ใช้ Calendar ตามเดิมไปก่อน
];

// เมนูงานบริการ (ที่มีลูกศร)
const serviceItem = {
  title: "งานบริการ",
  icon: Briefcase, // รูปกระเป๋า
  items: [
    { title: "แจ้งเรื่องร้องเรียน", url: "#" },
    { title: "ชำระภาษีออนไลน์", url: "#" },
    { title: "ขออนุญาตก่อสร้าง", url: "#" },
  ],
};

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-none rounded-r-3xl bg-white"
      style={{ "--sidebar-width-icon": "5rem" } as React.CSSProperties}
    >
      <SidebarTrigger className="absolute -right-3 top-6 z-50 hidden h-8 w-8 rounded-full bg-white shadow-md md:flex items-center justify-center" />

      <SidebarHeader className="p-4 pb-0 h-[4.5rem] justify-center">
        <AppLogo isCollapsed={!open} />
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* ========================================= */}
              {/* 1️⃣ ส่วนเมนูงานบริการ (Collapsible) */}
              {/* ========================================= */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem
                  className={cn(!open ? "flex justify-center" : "")}
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={cn(
                        "py-6 transition-all duration-200 group-data-[state=open]/collapsible:font-bold", // ถ้าเปิดอยู่ให้ตัวหนา
                        !open ? "justify-center" : "justify-start"
                      )}
                    >
                      <serviceItem.icon className="!w-6 !h-6" />

                      {/* แสดงข้อความและลูกศรเฉพาะตอน Sidebar กางออก */}
                      {open && (
                        <>
                          <span className="text-base ml-2">
                            {serviceItem.title}
                          </span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {/* เมนูย่อย (Sub Menu) */}
                  <CollapsibleContent>
                    {open && ( // ซ่อนเมนูย่อยถ้า Sidebar ปิดอยู่
                      <SidebarMenuSub>
                        {serviceItem.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* ========================================= */}
              {/* 2️⃣ เส้นขีดคั่น (Separator) */}
              {/* ========================================= */}
              <div className="my-2 mx-4 h-[1px] bg-gray-300" />

              {/* ========================================= */}
              {/* 3️⃣ ส่วนเมนูทั่วไป (Loop) */}
              {/* ========================================= */}
              {mainItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(!open ? "flex justify-center" : "gap-2")}
                >
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "py-6 transition-all duration-200",
                      !open ? "flex justify-center" : "flex justify-start"
                    )}
                  >
                    <a href={item.url}>
                      <item.icon className="!w-6 !h-6" />
                      {/* ซ่อนข้อความเมื่อปิด Sidebar */}
                      {open && (
                        <span className="text-base ml-2">{item.title}</span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
