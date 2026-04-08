import { create } from "zustand";

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

interface TimerState {
  seconds: number;
  isRunning: boolean;
  isBreak: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  seconds: WORK_DURATION,
  isRunning: false,
  isBreak: false,
  start: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  reset: () => set({ seconds: WORK_DURATION, isRunning: false, isBreak: false }),
  tick: () => {
    const { seconds, isBreak } = get();
    if (seconds <= 1) {
      const newIsBreak = !isBreak;
      set({
        isBreak: newIsBreak,
        isRunning: false,
        seconds: newIsBreak ? BREAK_DURATION : WORK_DURATION,
      });
    } else {
      set({ seconds: seconds - 1 });
    }
  },
}));
