export interface Pin {
  id: number;
  lat: number;
  lng: number;
  type: "water" | "fire" | "camera" | "tax";
  title: string;
  // Water specific
  level?: string;
  status?: string;
  // Fire specific
  temp?: string;
  alert?: string;
  // Camera specific
  viewers?: number;
  location?: string;
  time?: string;
  alertMessage?: string;
  // Tax specific
  propertyId?: string;
  propertyType?: string;
  owner?: string;
  address?: string;
  appraisalValue?: string;
  taxStatus?: string;
  taxAmount?: string;
  dueDate?: string;
}

export const urgentPins: Pin[] = [
  {
    id: 1,
    lat: 13.705,
    lng: 100.505,
    type: "water",
    title: "สถานีสูบน้ำคลองเตย",
    level: "85%",
    status: "Danger",
  },
  {
    id: 5,
    lat: 13.745,
    lng: 100.545,
    type: "water",
    title: "ประตูระบายน้ำบางซื่อ",
    level: "40%",
    status: "Normal",
  },
  {
    id: 6,
    lat: 13.755,
    lng: 100.555,
    type: "water",
    title: "สถานีสูบน้ำพระโขนง",
    level: "65%",
    status: "Warning",
  },
  {
    id: 2,
    lat: 13.725,
    lng: 100.525,
    type: "fire",
    title: "จุดตรวจจับความร้อน A-01",
    temp: "42°C",
    alert: "High Temp",
  },
  {
    id: 3,
    lat: 13.715,
    lng: 100.515,
    type: "camera",
    title: "CCTV แยกสาทร",
    viewers: 12,
    status: "Live",
    location: "ซอยวัฒนา 5",
    time: "15:54",
    alertMessage: "พื้นที่เสี่ยง:ระดับน้ำสูง",
  },
  {
    id: 4,
    lat: 13.735,
    lng: 100.535,
    type: "tax",
    title: "อาคารพาณิชย์ A",
    // Mock data for TaxCard
    propertyId: "LD-2025-089",
    propertyType: "อาคารพาณิชย์",
    owner: "นายสมชาย ใจดี",
    address: "123/45 หมู่ 4 ต.บางรัก อ.เมือง จ.กรุงเทพฯ",
    appraisalValue: "5,200,000",
    taxStatus: "ชำระแล้ว",
    taxAmount: "฿12,500",
    dueDate: "05 พ.ย. 2568",
  },
];
