import { useEffect } from "react";
import { useTimerStore } from "@/stores/timerStore";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const PomodoroTimer = () => {
  const { seconds, isRunning, isBreak, start, pause, reset, tick } = useTimerStore();

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const total = isBreak ? 5 * 60 : 25 * 60;
  const progress = (1 - seconds / total) * 100;

  return (
    <div className="bg-card rounded-xl p-6 text-center border border-border shadow-sm">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {isBreak ? "Break Time" : "Focus Session"}
      </div>
      <div className="relative w-40 h-40 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" strokeWidth="4" className="stroke-muted" />
          <circle
            cx="60" cy="60" r="54" fill="none" strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 54}`}
            strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
            strokeLinecap="round"
            stroke={isBreak ? "hsl(280 60% 55%)" : "hsl(var(--brand))"}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-mono font-bold tabular-nums text-foreground">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button variant="default" size="icon" onClick={isRunning ? pause : start}>
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={reset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
