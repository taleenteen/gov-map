"use client";
import { useRouter } from "next/navigation";
import { AppLogo } from "@/components/features/brand/AppLogo";

export const RoleSelection = () => {
  const router = useRouter();

  const handleSelectRole = (role: "user" | "officer" | "admin" | "ceo") => {
    localStorage.setItem("mock_user_role", role);

    if (role === "user") {
      router.push("/user-map");
    } else if (role === "officer") {
      router.push("/officer-map");
    } else if (role === "ceo") {
      router.push("/dashboard-ceo");
    } else {
      router.push("/admin-map");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="flex flex-col items-center space-y-2">
        <AppLogo variant="default" className="w-48" />
        <p className="text-gray-500 text-sm">(Demo)</p>
      </div>

      <div className="w-full space-y-4">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            เลือกบทบาทเข้าใช้งาน
          </h2>
        </div>

        <button
          onClick={() => handleSelectRole("admin")}
          className="group relative w-full flex items-center p-4 border-2 border-blue-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
        >
          <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#004cff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shield-user-icon"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
              <circle cx="12" cy="11" r="4" />
            </svg>
          </div>
          <div className="ml-4 text-left">
            <p className="font-bold text-gray-800 group-hover:text-blue-700">
              เจ้าหน้าที่ / Super Admin
            </p>
            <p className="text-xs text-gray-500">
              จัดการข้อมูลและอนุมัติคำร้อง
            </p>
          </div>
          <div className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </div>
        </button>

        <button
          onClick={() => handleSelectRole("ceo")}
          className="group relative w-full flex items-center p-4 border-2 border-cyan-100 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all duration-200"
        >
          <div className="p-3 bg-cyan-100 rounded-full group-hover:bg-cyan-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00ffd5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-star-icon"
            >
              <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
              <path d="M8 15H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>
          <div className="ml-4 text-left">
            <p className="font-bold text-gray-800 group-hover:text-cyan-700">
              ผู้บริหาร / CEO
            </p>
            <p className="text-xs text-gray-500">ตรวจเช็คข้อมูลและแดชบอร์ด</p>
          </div>
          <div className="ml-auto text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </div>
        </button>

        <button
          onClick={() => handleSelectRole("officer")}
          className="group relative w-full flex items-center p-4 border-2 border-red-100 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <div className="p-3 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div className="ml-4 text-left">
            <p className="font-bold text-gray-800 group-hover:text-red-700">
              เจ้าหน้าที่ / Officer
            </p>
            <p className="text-xs text-gray-500">
              จัดการข้อมูลและอนุมัติคำร้อง
            </p>
          </div>
          <div className="ml-auto text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </div>
        </button>

        <button
          onClick={() => handleSelectRole("user")}
          className="group relative w-full flex items-center p-4 border-2 border-green-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200"
        >
          <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="ml-4 text-left">
            <p className="font-bold text-gray-800 group-hover:text-green-700">
              ประชาชนทั่วไป
            </p>
            <p className="text-xs text-gray-500">ดูข้อมูลแผนที่และแจ้งเหตุ</p>
          </div>
          <div className="ml-auto text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </div>
        </button>
      </div>
    </div>
  );
};
