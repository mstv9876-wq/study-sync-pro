import { useEffect } from "react";
import { useFocusStore } from "@/stores/focusStore";

export const useDistractionDetection = (enabled: boolean = true) => {
  const { incrementTabSwitch } = useFocusStore();

  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        incrementTabSwitch();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [enabled, incrementTabSwitch]);
};
