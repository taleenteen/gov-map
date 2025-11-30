import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PinInfoProps {
  icon: LucideIcon;
  label?: string;
  color?: string; // Tailwind class
  onClick?: () => void;
  className?: string;
}

export function PinInfo({
  icon: Icon,
  label,
  color = "bg-white",
  onClick,
  className,
}: PinInfoProps) {
  return (
    <div
      className="relative group cursor-pointer flex flex-col items-center"
      onClick={onClick}
    >
      {/* Pin Circle */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110 border-2 border-white",
          color,
          className
        )}
      >
        {/* Icon color usually contrasts with bg. If bg is white, icon is primary. If bg is colored, icon is white. */}
        <Icon
          className={cn(
            "w-5 h-5",
            color === "bg-white" ? "text-primary" : "text-white"
          )}
        />
      </div>

      {/* Pin Point */}
      <div className={cn("w-3 h-3 rotate-45 -mt-2 rounded-sm", color)} />

      {/* Label */}
      {label && (
        <div className="mt-1 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded-md text-white text-[10px] font-medium whitespace-nowrap shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
          {label}
        </div>
      )}
    </div>
  );
}
