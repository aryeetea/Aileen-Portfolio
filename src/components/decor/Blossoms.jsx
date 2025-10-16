"use client";
import React, { useEffect, useMemo, useState } from "react";

export default function Blossoms({ count = 26 }) {
  const [c, setC] = useState(count);
  useEffect(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    setC(w < 640 ? Math.ceil(count * 0.4) : w < 1024 ? Math.ceil(count * 0.7) : count);
  }, [count]);

  const petals = useMemo(
    () =>
      Array.from({ length: c }).map((_, i) => {
        const size = 10 + Math.random() * 14;
        const left = Math.random() * 100;
        const delay = Math.random() * -24;
        const fall = 18 + Math.random() * 12;
        const sway = 8 + Math.random() * 6;
        const hue  = 338 + Math.random() * 12;
        return { id:i, size, left, delay, fall, sway, hue };
      }),
    [c]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {petals.map(p => (
        <span
          key={p.id}
          className="absolute -top-10 will-change-transform"
          style={{
            left:`${p.left}vw`,
            width:`${p.size}px`,
            height:`${p.size*0.8}px`,
            background:`hsl(${p.hue} 85% 88%)`,
            borderRadius:"60% 40% 60% 40% / 60% 60% 40% 40%",
            filter:"drop-shadow(0 1px 1px rgba(0,0,0,.12))",
            animation:`fall ${p.fall}s linear infinite, sway ${p.sway}s ease-in-out infinite`,
            animationDelay:`${p.delay}s`,
            opacity:.95
          }}
        />
      ))}
    </div>
  );
}