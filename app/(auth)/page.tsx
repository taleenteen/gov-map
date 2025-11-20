import { Metadata } from "next";
import { RoleSelection } from "@/components/features/auth/RoleSelection";

export const metadata: Metadata = {
  title: "เลือกบทบาทเข้าใช้งาน | Smart City",
  description: "ระบบบริหารจัดการเมืองอัจฉริยะ สำหรับประชาชนและเจ้าหน้าที่",
};

export default function AuthPage() {
  return (
    <main className="min-h-screen w-full bg-gray-500 flex items-center justify-center p-4">
      <RoleSelection />
    </main>
  );
}
