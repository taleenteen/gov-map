import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils"; // ถ้าคุณมี util นี้ (มาตรฐาน shadcn) ถ้าไม่มีให้ลบ cn ออกแล้วใส่ string ธรรมดา
// Import รูปที่คุณมี
import logoMark from "@/assets/brand/logo-mark.png";

interface AppLogoProps {
  className?: string;
  variant?: "default" | "icon"; // default = มีรูป+ชื่อ, icon = มีแค่รูป
  isCollapsed?: boolean; // รับค่าจาก Sidebar ว่ายุบอยู่ไหม
}

export const AppLogo = ({
  className,
  variant = "default",
  isCollapsed = false,
}: AppLogoProps) => {
  // ชื่อหน่วยงาน (เปลี่ยนได้ตามจริง)
  const title = "เทศบาลตำบลหลักเมือง";
  const subtitle = "จังหวัด ราชบุรี";

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap",
        className
      )}
    >
      {/* ส่วนรูปโลโก้ */}
      <div className="relative shrink-0">
        <Image
          src={logoMark}
          alt="Logo"
          width={40} // ขนาดตามดีไซน์ (ประมาณ 40px)
          height={40}
          className="rounded-full object-contain"
          priority // โหลดด่วนเพราะอยู่ส่วนบนสุด
        />
      </div>

      {/* ส่วนข้อความ (จะซ่อนเมื่อ isCollapsed เป็น true) */}
      <div
        className={cn(
          "flex flex-col transition-all duration-300",
          isCollapsed
            ? "w-0 opacity-0 translate-x-[-10px]"
            : "w-auto opacity-100 translate-x-0"
        )}
      >
        <span className="font-bold text-sm leading-tight text-foreground">
          {title}
        </span>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </Link>
  );
};
