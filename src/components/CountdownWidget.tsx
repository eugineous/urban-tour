"use client";
import { useEffect, useState } from "react";

export default function CountdownWidget({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return setTime({ days: 0, hours: 0, mins: 0, secs: 0 });
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const boxes = [
    { label: "DAYS", value: time.days },
    { label: "HRS", value: time.hours },
    { label: "MINS", value: time.mins },
    { label: "SECS", value: time.secs },
  ];

  return (
    <div className="flex gap-3">
      {boxes.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="font-graffiti text-4xl neon-lime w-16 h-16 flex items-center justify-center rounded-lg"
            style={{ background: "rgba(170,255,0,0.08)", border: "1px solid rgba(170,255,0,0.25)" }}>
            {String(value).padStart(2, "0")}
          </div>
          <p className="text-xs text-gray-500 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
