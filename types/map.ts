export interface Pin {
  id: number;
  lat: number;
  lng: number;
  type: "water" | "fire" | "camera" | "tax" | "info";
  title: string;
  subtype?: "groundwater" | "pond"; // For info pins
  label?: string; // For info pins
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
