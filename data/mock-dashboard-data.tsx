import {
  Briefcase,
  Users,
  AlertCircle,
  CheckCircle2,
  Home,
  Droplets,
  FileText,
  Trash2,
  MessageSquare,
  Camera,
  Wind,
  HeartPulse,
  ThumbsUp,
  Lightbulb,
  Sun,
  Clock,
} from "lucide-react";

// 1. ข้อมูล Stat Cards (แถวบนสุด)
export const statsData = [
  {
    title: "บริการทั้งหมด",
    value: 12,
    icon: Briefcase,
    trend: "+2",
    trendDirection: "up" as const,
  },
  {
    title: "ผู้ใช้งานรวม",
    value: "2,847",
    icon: Users,
    trend: "+12.5%",
    trendDirection: "up" as const,
  },
  {
    title: "คำขอดำเนินการ",
    value: 156,
    icon: AlertCircle,
    trend: "-8.2%",
    trendDirection: "down" as const,
  },
  {
    title: "อัตราความสำเร็จ",
    value: "94.2%",
    icon: CheckCircle2,
    trend: "+2.1%",
    trendDirection: "up" as const,
  },
];

// 2. ข้อมูล Service Cards (Grid ด้านล่าง)
export const servicesData = [
  {
    title: "ระบบแผนที่ภาษีและที่ดิน",
    icon: Home,
    status: "online" as const,
    stats: { users: 432, requests: 158 },
    colorClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "ระบบตรวจสอบคุณภาพน้ำอัจฉริยะ",
    icon: Droplets,
    status: "online" as const,
    stats: { users: 389, requests: 142 },
    colorClass: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "ระบบยื่นคำขอใบอนุญาต",
    icon: FileText,
    status: "online" as const,
    stats: { users: 524, requests: 234 },
    colorClass: "bg-green-50 text-green-600",
  },
  {
    title: "บริการจัดการขยะอิเล็กทรอนิกส์",
    icon: Trash2,
    status: "online" as const,
    stats: { users: 287, requests: 89 },
    colorClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "บริการรับเรื่องร้องเรียน",
    icon: MessageSquare,
    status: "online" as const,
    stats: { users: 512, requests: 175 },
    colorClass: "bg-orange-50 text-orange-600",
  },
  {
    title: "ระบบตรวจสอบความปลอดภัย",
    icon: Camera,
    status: "maintenance" as const, // ตัวอย่างสถานะปรับปรุง
    stats: { users: 145, requests: 45 },
    colorClass: "bg-red-50 text-red-600",
  },
  {
    title: "ระบบตรวจสอบสิ่งแวดล้อม",
    icon: Wind,
    status: "online" as const,
    stats: { users: 398, requests: 167 },
    colorClass: "bg-teal-50 text-teal-600",
  },
  {
    title: "บริการสุขภาพและสวัสดิการ",
    icon: HeartPulse,
    status: "online" as const,
    stats: { users: 456, requests: 198 },
    colorClass: "bg-pink-50 text-pink-600",
  },
  {
    title: "ระบบรับฟังความคิดเห็น",
    icon: ThumbsUp,
    status: "online" as const,
    stats: { users: 687, requests: 245 },
    colorClass: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "ระบบไฟฟ้าส่องสว่างอัจฉริยะ",
    icon: Lightbulb,
    status: "online" as const,
    stats: { users: 234, requests: 78 },
    colorClass: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "ระบบตรวจสอบโซล่าเซลล์",
    icon: Sun,
    status: "online" as const,
    stats: { users: 189, requests: 58 },
    colorClass: "bg-amber-50 text-amber-600",
  },
  {
    title: "ระบบบันทึกเวลาเข้า-ออก",
    icon: Clock,
    status: "online" as const,
    stats: { users: 342, requests: 123 },
    colorClass: "bg-slate-50 text-slate-600",
  },
];
