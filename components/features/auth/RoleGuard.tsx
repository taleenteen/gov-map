"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppLogo } from "@/components/features/brand/AppLogo";

const ALLOWED_ROLES = ["admin", "officer", "ceo"];

export default function RoleGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("mock_user_role");

    if (role && ALLOWED_ROLES.includes(role)) {
      setIsAuthorized(true);
    } else {
      // Redirect to home/login if not authorized
      router.replace("/");
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 gap-4">
        <AppLogo variant="default" className="w-32 animate-pulse" />
        <p className="text-gray-400 text-sm">Checking permissions...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
}
