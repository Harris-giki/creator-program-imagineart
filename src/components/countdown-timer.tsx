"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  deadline: string;
  compact?: boolean;
}

function getTimeLeft(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: false,
  };
}

export function CountdownTimer({ deadline, compact = false }: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeLeft(deadline));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(deadline)), 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (time.ended) {
    return <span className="text-muted font-medium">Ended</span>;
  }

  if (compact) {
    return (
      <span className="font-mono text-xs">
        {time.days}d {time.hours}h {time.minutes}m
      </span>
    );
  }

  return (
    <div className="flex gap-2">
      {[
        { value: time.days, label: "Days" },
        { value: time.hours, label: "Hours" },
        { value: time.minutes, label: "Min" },
        { value: time.seconds, label: "Sec" },
      ].map(({ value, label }) => (
        <div
          key={label}
          className={cn(
            "flex flex-col items-center justify-center",
            "w-16 h-16 rounded-xl border border-border-color bg-surface"
          )}
        >
          <span className="text-xl font-bold font-mono text-primary">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
