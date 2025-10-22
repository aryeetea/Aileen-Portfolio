"use client";
export default function Bubbles({ count = 10 }) {
  const items = Array.from({ length: count });
  return (
    <div aria-hidden style={{pointerEvents:"none", position:"absolute", inset:0, zIndex:-1}}>
      {items.map((_, i) => {
        const left = Math.round(Math.random() * 90) + "%";
        const delay = (Math.random() * 3).toFixed(2) + "s";
        const size = Math.round(80 + Math.random() * 120);
        const hue = i % 2 === 0 ? "rgba(255, 231, 241, .7)" : "rgba(239, 234, 255, .7)";
        return (
          <span
            key={i}
            className="float"
            style={{
              position:"absolute",
              left, top: `${-10 + Math.random() * 30}%`,
              width: size, height: size, borderRadius:"50%",
              filter:"blur(2px)",
              background: hue,
              animationDelay: delay,
            }}
          />
        );
      })}
    </div>
  );
}