"use client";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    // สำหรับ Submenu
    title: string;
    url: string;
  }[];
}

export interface NavGroup {
  label?: string; // ชื่อกลุ่ม (ถ้ามี)
  items: NavItem[];
}

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
  SidebarFooter, // ✅ เพิ่ม Footer
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator, // ✅ ใช้ Separator ของ Sidebar เอง
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { AppLogo } from "@/components/features/brand/AppLogo";
import { cn } from "@/lib/utils";
import { ChevronRight, LogOut, User } from "lucide-react";

// --- รับ Props เข้ามาแทนการ Hardcode ---
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  extraGroups?: NavGroup[]; // เมนูเสริมที่จะต่อท้าย (เช่น แดชบอร์ด)
}

// เมนูหลักที่ "ต้องมีทุกหน้า" (Core Navigation)
import {
  Home,
  LayoutDashboard,
  Settings,
  Calendar,
  Briefcase,
  Info,
} from "lucide-react";
import React from "react";
const coreGroups: NavGroup[] = [
  {
    items: [
      {
        title: "งานบริการ",
        url: "#",
        icon: Briefcase,
        items: [
          { title: "ระบบบริหารจัดการแผนที่ภาษี", url: "#" },
          { title: "ระบบตรวจสอบปริมาณน้ำ", url: "#" },
          { title: "ระบบความปลอดภัย", url: "#" },
        ],
      },
    ],
  },
  {
    items: [
      { title: "หน้าหลัก", url: "/", icon: Home },
      { title: "แดชบอร์ด", url: "/dashboard", icon: LayoutDashboard },
      { title: "ตั้งค่า", url: "/settings", icon: Settings },
      { title: "ช่วยเหลือ", url: "/help", icon: Info },
    ],
  },
];

export function AppSidebar({ extraGroups = [], ...props }: AppSidebarProps) {
  const { open } = useSidebar();

  // รวมกลุ่มเมนู: Core + Extra
  const allGroups = [...coreGroups, ...extraGroups];

  return (
    <Sidebar
      collapsible="icon"
      className="border-none rounded-r-3xl bg-white h-full shadow-2xl"
      {...props}
    >
      <SidebarTrigger className="absolute -right-3 top-6 z-50 hidden h-8 w-8 rounded-full bg-white shadow-md md:flex items-center justify-center" />

      {/* --- HEADER --- */}
      <SidebarHeader className="p-4 pb-0 h-[4.5rem] justify-center">
        <AppLogo isCollapsed={!open} />
      </SidebarHeader>

      {/* --- CONTENT --- */}
      <SidebarContent className="mt-4 scrollbar-none">
        {" "}
        {/* scrollbar-none เพื่อความสวยงาม */}
        {allGroups.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <React.Fragment key={item.title}>
                    {/* เช็คว่าเป็น Collapsible หรือ Link ธรรมดา */}
                    {item.items ? (
                      // 🟢 กรณีมีเมนูย่อย (Collapsible)
                      <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem
                          className={cn(!open ? "flex justify-center" : "")}
                        >
                          <CollapsibleTrigger asChild>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <SidebarMenuButton
                                  // ❌ ลบ prop tooltip ทิ้งไปเลย
                                  className={cn(
                                    "py-6 transition-all duration-200 hover:bg-btn-hover group-data-[state=open]/collapsible:font-bold group-data-[collapsible=icon]:size-12! group-data-[collapsible=icon]:p-3!",
                                    !open ? "justify-center" : "justify-start"
                                  )}
                                >
                                  <item.icon className="!w-6 !h-6 shrink-0" />
                                  {open && (
                                    <>
                                      <span className="text-base ml-2 truncate">
                                        {item.title}
                                      </span>
                                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </>
                                  )}
                                </SidebarMenuButton>
                              </TooltipTrigger>

                              {/* 2. Custom Tooltip Content & Arrow ตรงนี้ */}
                              {/* แสดงเฉพาะตอนปิด Sidebar (!open) เพื่อไม่ให้รก */}
                              {!open && (
                                <TooltipContent
                                  side="right"
                                  className="bg-btn-hover text-white border-none"
                                >
                                  {item.title}
                                  {/* ✅ ใส่ Arrow และเติมสีให้เหมือน background */}
                                  <TooltipArrow className="fill-btn-hover" />
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {open && (
                              <SidebarMenuSub className="ml-0 border-l-0 pl-0 ">
                                <div className="border-gray-200 ml-6 pl-4 space-y-1 mt-1">
                                  {item.items.map((sub) => (
                                    <SidebarMenuSubItem key={sub.title}>
                                      <SidebarMenuSubButton
                                        asChild
                                        className="h-auto py-2 text-sm text-gray-600 hover:bg-btn-hover"
                                      >
                                        <a href={sub.url}>
                                          <span>{sub.title}</span>
                                        </a>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </div>
                              </SidebarMenuSub>
                            )}
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      // 🔵 กรณีเมนูธรรมดา
                      <SidebarMenuItem
                        className={cn(!open ? "flex justify-center" : "")}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              // ❌ ลบ prop tooltip ทิ้งไปเลย
                              className={cn(
                                "py-6 transition-all duration-200 hover:bg-btn-hover group-data-[collapsible=icon]:size-12! group-data-[collapsible=icon]:p-3!",
                                !open ? "justify-center" : "justify-start"
                              )}
                            >
                              <a href={item.url}>
                                <item.icon className="!w-6 !h-6 shrink-0" />
                                {open && (
                                  <span className="text-base ml-2 truncate">
                                    {item.title}
                                  </span>
                                )}
                              </a>
                            </SidebarMenuButton>
                          </TooltipTrigger>

                          {/* 2. Custom Tooltip Content & Arrow ตรงนี้ */}
                          {!open && (
                            <TooltipContent
                              side="right"
                              className="bg-btn-hover text-white border-none"
                            >
                              {item.title}
                              {/* ✅ ใส่ Arrow และเติมสีให้เหมือน background */}
                              <TooltipArrow className="fill-btn-hover" />
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </SidebarMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>

            {/* ใส่เส้นคั่นระหว่างกลุ่ม (ถ้าไม่ใช่กลุ่มสุดท้าย) */}
            {index < allGroups.length - 1 && (
              <div className="my-2 mx-4 h-[1px] bg-gray-100" />
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* --- FOOTER (User Profile) --- */}
      <SidebarFooter className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-br-3xl">
        <div
          className={cn("flex items-center gap-3", !open && "justify-center")}
        >
          <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center overflow-hidden shrink-0 border-2 border-white shadow-sm">
            {/* ใส่ Image จริงตรงนี้ */}
            <img
              src="https://github.com/shadcn.png"
              alt="user"
              className="h-full w-full object-cover"
            />
          </div>

          {open && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                Full Name
              </p>
              <p className="text-xs text-gray-500 truncate">เจ้าหน้าที่</p>
            </div>
          )}

          {open && (
            <button className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
              <LogOut size={18} />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
