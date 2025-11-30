import { ApiClient } from "./api-client";
import { ApiPin, CreatePinDto, UpdatePinDto } from "@/types/api";

export const PinService = {
  getAll: async () => {
    const response = await ApiClient.get<any>("/pins");
    return response.data || response;
  },

  getById: async (id: string) => {
    return ApiClient.get<ApiPin>(`/pins/${id}`);
  },

  create: async (data: CreatePinDto) => {
    return ApiClient.post<ApiPin>("/pins", data);
  },

  update: async (id: string, data: UpdatePinDto) => {
    return ApiClient.patch<ApiPin>(`/pins/${id}`, data);
  },

  delete: async (id: string) => {
    return ApiClient.delete<void>(`/pins/${id}`);
  },
};
