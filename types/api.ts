export enum PinType {
  WATER = "WATER",
  FIRE = "FIRE",
  CAMERA = "CAMERA",
  TAX = "TAX",
  INFO = "INFO",
  INFRASTRUCTURE = "INFRASTRUCTURE",
}

export enum PinStatus {
  NORMAL = "NORMAL",
  WARNING = "WARNING",
  DANGER = "DANGER",
  MAINTENANCE = "MAINTENANCE",
  OFFLINE = "OFFLINE",
}

export enum GeometryType {
  POINT = "POINT",
  POLYGON = "POLYGON",
  LINESTRING = "LINESTRING",
}

export interface GeometryDto {
  type: GeometryType;
  coordinates: unknown; // GeoJSON coordinates
  lat?: number;
  lng?: number;
}

export interface CreatePinDto {
  title: string;
  dataId?: string;
  description?: string;
  type: PinType;
  subtype?: string;
  tags?: string[];
  status?: PinStatus;
  isPublic?: boolean;
  geometry: GeometryDto;
  attributes?: Record<string, unknown>;
  images?: string[];
}

export type UpdatePinDto = Partial<CreatePinDto>;

export interface ApiPin {
  id: string;
  dataId?: string;
  title: string;
  description?: string;
  type: PinType;
  subtype?: string;
  tags: string[];
  status: PinStatus;
  isPublic: boolean;
  geometry?: {
    type: GeometryType;
    coordinates: unknown;
    lat?: number;
    lng?: number;
  };
  attributes?: Record<string, unknown>;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
