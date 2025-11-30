import { create } from "zustand";

interface MapState {
  activeLayer: string | null;
  isCreatePinMode: boolean;
  actions: {
    setActiveLayer: (layer: string | null) => void;
    toggleCreatePinMode: () => void;
    setCreatePinMode: (isActive: boolean) => void;
    reset: () => void;
  };
}

export const useMapStore = create<MapState>((set) => ({
  activeLayer: "water",
  isCreatePinMode: false,
  actions: {
    setActiveLayer: (layer) => set({ activeLayer: layer }),
    toggleCreatePinMode: () =>
      set((state) => ({ isCreatePinMode: !state.isCreatePinMode })),
    setCreatePinMode: (isActive) => set({ isCreatePinMode: isActive }),
    reset: () => set({ activeLayer: "water", isCreatePinMode: false }),
  },
}));

export const useMapActions = () => useMapStore((state) => state.actions);
export const useMapActiveLayer = () =>
  useMapStore((state) => state.activeLayer);
export const useMapIsCreatePinMode = () =>
  useMapStore((state) => state.isCreatePinMode);
