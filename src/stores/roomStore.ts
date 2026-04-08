import { create } from "zustand";

interface RoomState {
  currentRoomId: string | null;
  mic: boolean;
  cam: boolean;
  setCurrentRoom: (id: string | null) => void;
  toggleMic: () => void;
  toggleCam: () => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  currentRoomId: null,
  mic: true,
  cam: true,
  setCurrentRoom: (id) => set({ currentRoomId: id }),
  toggleMic: () => set((s) => ({ mic: !s.mic })),
  toggleCam: () => set((s) => ({ cam: !s.cam })),
}));
