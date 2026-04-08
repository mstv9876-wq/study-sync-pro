import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

const PomodoroTimer = () => {
  const [seconds, setSeconds] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setIsBreak((b) => !b);
          setIsRunning(false);
          return isBreak ? WORK_DURATION : BREAK_DURATION;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsBreak(false);
    setSeconds(WORK_DURATION);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = isBreak
    ? (1 - seconds / BREAK_DURATION) * 100
    : (1 - seconds / WORK_DURATION) * 100;

  return (
    <div className="glass rounded-xl p-6 text-center">
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {isBreak ? "Break Time" : "Focus Session"}
      </div>

      {/* Circular progress */}
      <div className="relative w-40 h-40 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" strokeWidth="4" className="stroke-muted" />
          <circle
            cx="60" cy="60" r="54" fill="none" strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 54}`}
            strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className={isBreak ? "stroke-neon-violet" : "stroke-neon-cyan"}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-mono font-bold tabular-nums">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button variant="neon" size="icon" onClick={() => setIsRunning((r) => !r)}>
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button variant="glass" size="icon" onClick={reset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
