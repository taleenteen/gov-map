import { FileText, Users, Clock, CheckCircle, Activity } from "lucide-react";
import { ActivityStatus } from "@/components/features/dashboard/RecentActivityList";

// 1. Stats Data
export const waterStats = [
  {
    title: "คำขอทั้งหมด",
    value: "1,234",
    icon: FileText,
    trend: "+12%",
    trendDirection: "up" as const,
  },
  {
    title: "ผู้ใช้งาน",
    value: "856",
    icon: Users,
    trend: "+8%",
    trendDirection: "up" as const,
  },
  {
    title: "รอดำเนินการ",
    value: "42",
    icon: Clock,
    trend: "-15%",
    trendDirection: "down" as const, // สีแดงตามภาพ
  },
  {
    title: "เสร็จสิ้น",
    value: "1,192",
    icon: CheckCircle,
    trend: "+18%",
    trendDirection: "up" as const, // สีม่วงในภาพ (แต่ใช้ logic สีเขียวไปก่อน หรือปรับสีใน component)
  },
];

// 2. Recent Activities Data (ตามภาพเป๊ะๆ)
export const recentActivities = [
  {
    id: "1",
    user: "สมชาย ใจดี",
    action: "ส่งคำขอ",
    detail: "ใบอนุญาตธุรกิจ #1234",
    status: "pending" as ActivityStatus,
    time: "5 นาทีที่แล้ว",
  },
  {
    id: "2",
    user: "สมหญิง รักดี",
    action: "อนุมัติคำขอ",
    detail: "เอกสารภาษี #5678",
    status: "approved" as ActivityStatus,
    time: "12 นาทีที่แล้ว",
  },
  {
    id: "3",
    user: "สมศักดิ์ มีสุข",
    action: "อัปเดตข้อมูล",
    detail: "ทะเบียนที่ดิน #9012",
    status: "review" as ActivityStatus,
    time: "23 นาทีที่แล้ว",
  },
  {
    id: "4",
    user: "สมใจ ดีมาก",
    action: "ส่งเรื่องร้องเรียน",
    detail: "บริการสาธารณะ #3456",
    status: "pending" as ActivityStatus,
    time: "1 ชั่วโมงที่แล้ว",
  },
  {
    id: "5",
    user: "สมปอง เก่งจริง",
    action: "ตรวจสอบเสร็จสิ้น",
    detail: "รายงานสิ่งแวดล้อม #7890",
    status: "approved" as ActivityStatus,
    time: "2 ชั่วโมงที่แล้ว",
  },
];
