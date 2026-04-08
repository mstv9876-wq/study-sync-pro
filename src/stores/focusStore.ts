import { create } from "zustand";

interface FocusState {
  tabSwitchCount: number;
  showReminder: boolean;
  incrementTabSwitch: () => void;
  dismissReminder: () => void;
  resetFocus: () => void;
}

export const useFocusStore = create<FocusState>((set, get) => ({
  tabSwitchCount: 0,
  showReminder: false,
  incrementTabSwitch: () => {
    const count = get().tabSwitchCount + 1;
    set({ tabSwitchCount: count, showReminder: count >= 3 });
  },
  dismissReminder: () => set({ showReminder: false }),
  resetFocus: () => set({ tabSwitchCount: 0, showReminder: false }),
}));
