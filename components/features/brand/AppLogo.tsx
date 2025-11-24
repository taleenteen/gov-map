import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/brand/logo-mark.png";

interface AppLogoProps {
  className?: string;
  variant?: "default" | "icon";
  isCollapsed?: boolean;
}

export const AppLogo = ({
  className,
  variant = "default",
  isCollapsed = false,
}: AppLogoProps) => {
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
      <div className="relative shrink-0">
        <Image
          src={logoMark}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full object-contain"
          priority
        />
      </div>

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
