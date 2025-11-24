export type RequestStatus = "pending" | "approved" | "review";
export type RequestPriority = "high" | "medium" | "low";

export interface RequestItem {
  id: string;
  title: string;
  applicant: string;
  date: string;
  status: RequestStatus;
  priority: RequestPriority;
}

export const requestData: RequestItem[] = [
  {
    id: "1",
    title: "คำขอใบอนุญาตประกอบธุรกิจ",
    applicant: "บริษัท เทคโซลูชั่น จำกัด",
    date: "2025-11-15",
    status: "pending",
    priority: "high",
  },
  {
    id: "2",
    title: "ประเมินภาษีที่ดิน",
    applicant: "สมชาย ใจดี",
    date: "2025-11-14",
    status: "approved",
    priority: "medium",
  },
  {
    id: "3",
    title: "รายงานการปฏิบัติตามกฎหมายสิ่งแวดล้อม",
    applicant: "บริษัท อุตสาหกรรมสีเขียว",
    date: "2025-11-14",
    status: "review",
    priority: "high",
  },
  {
    id: "4",
    title: "ต่ออายุใบอนุญาตสาธารณสุข",
    applicant: "ร้านอาหารในเมือง",
    date: "2025-11-13",
    status: "pending",
    priority: "low",
  },
  {
    id: "5",
    title: "อนุญาตก่อสร้างอาคาร",
    applicant: "บริษัท เอบีซี ดีเวลลอปเปอร์",
    date: "2025-11-12",
    status: "approved",
    priority: "medium",
  },
  {
    id: "6",
    title: "คำขอตรวจสอบคุณภาพน้ำ",
    applicant: "กองช่างเทศบาล",
    date: "2025-11-11",
    status: "review",
    priority: "high",
  },
  {
    id: "7",
    title: "ตารางเก็บขยะ",
    applicant: "สมหญิง รักดี",
    date: "2025-11-10",
    status: "approved",
    priority: "low",
  },
  {
    id: "8",
    title: "คำขอซ่อมแซมไฟฟ้าส่องสว่าง",
    applicant: "คณะกรรมการชุมชน",
    date: "2025-11-09",
    status: "pending",
    priority: "medium",
  },
];
