"use client";
import { useEffect, useMemo, useState } from "react";

export default function Bubbles({ count = 10 }) {
  // don’t render on the server
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // generate random positions once after mount
  const items = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: count }, () => ({
      left: `${Math.round(Math.random() * 90)}%`,
      top: `${Math.round(Math.random() * 30) - 10}%`,
      size: Math.round(80 + Math.random() * 120),
      delay: `${(Math.random() * 2.5).toFixed(2)}s`,
      color: Math.random() < 0.5 ? "rgba(255,231,241,.7)" : "rgba(239,234,255,.7)",
    }));
  }, [mounted, count]);

  if (!mounted) return null; // server renders null; client hydrates null → then paints bubbles

  return (
    <div aria-hidden style={{ pointerEvents: "none", position: "absolute", inset: 0, zIndex: -1 }}>
      {items.map((b, i) => (
        <span
          key={i}
          className="float"
          style={{
            position: "absolute",
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            filter: "blur(2px)",
            background: b.color,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}