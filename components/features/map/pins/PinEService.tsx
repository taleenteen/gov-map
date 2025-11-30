import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PinEServiceProps {
  icon: LucideIcon;
  color?: string; // Tailwind class for background e.g. "bg-blue-500"
  hoverColor?: string; // Tailwind class for hover
  badge?: {
    text?: string;
    color?: string; // Tailwind class for badge bg e.g. "bg-red-500"
  };
  onClick?: () => void;
  className?: string;
}

export function PinEService({
  icon: Icon,
  color = "bg-blue-500",
  hoverColor = "hover:bg-blue-600",
  badge,
  onClick,
  className,
}: PinEServiceProps) {
  return (
    <div
      className="relative group cursor-pointer flex flex-col items-center justify-center"
      onClick={onClick}
    >
      {/* Pin Head */}
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 transform group-hover:scale-110 border-2 border-white z-10",
          color,
          hoverColor,
          className
        )}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Pin Point (Triangle) */}
      <div
        className={cn(
          "w-4 h-4 rotate-45 -mt-2.5 rounded-sm transition-colors duration-300",
          color,
          hoverColor, // Apply same hover color logic if possible, or just rely on group-hover
          "group-hover:brightness-90" // Slight darken on hover if specific class not easy
        )}
      />

      {/* Shadow Pulse (Optional, for active state) */}
      <div className="absolute -bottom-1 w-4 h-1 bg-black/20 rounded-full blur-sm" />

      {/* Badge */}
      {badge && (
        <div
          className={cn(
            "absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-sm z-20",
            badge.color || "bg-yellow-400"
          )}
        >
          {badge.text}
        </div>
      )}
    </div>
  );
}
