"use client";
import { useEffect, useMemo, useState } from "react";

export default function Gallery({ images = [], columns = 3, aspect = "16 / 11" }) {
  const [index, setIndex] = useState(null);

  // responsive grid hint from columns
  const min = Math.max(260, Math.floor(1100 / (columns || 3)));
  const gridStyle = {
    display: "grid",
    gap: 24,
    gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
    alignItems: "start",
  };

  // pick a few hero tiles (defensive for short arrays)
  const heroSet = useMemo(() => {
    const picks = new Set();
    [1, 5, 9].forEach((i) => {
      if (typeof i === "number" && i >= 0 && i < images.length) picks.add(i);
    });
    return picks;
  }, [images.length]);

  // keys + scroll lock (only on client due to "use client")
  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => ((i ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => ((i ?? 0) - 1 + images.length) % images.length);
    };
    const prev = document.body && document.body.style ? document.body.style.overflow : "";
    if (document.body && document.body.style) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (document.body && document.body.style) document.body.style.overflow = prev || "";
    };
  }, [index, images.length]);

  // soft gradient frame
  const frame = {
    background: "linear-gradient(180deg, var(--brand-2), rgba(255,111,169,.65))",
    padding: 1,
    borderRadius: 26,
  };

  // safe helpers
  const at = (arr, i) => (Array.isArray(arr) ? arr[i] : undefined);
  const current = index !== null ? at(images, index) : null;

  return (
    <>
      <div style={gridStyle}>
        {images.map((img, i) => {
          const isHero = heroSet.has(i);
          return (
            <button
              key={img?.src || i}
              onClick={() => setIndex(i)}
              className="card"
              aria-label={`Open ${img?.alt || "image"}`}
              style={{
                ...frame,
                border: "1px solid rgba(0,0,0,.06)",
                cursor: "zoom-in",
                gridColumn: isHero ? "span 2" : undefined,
                gridRow: isHero ? "span 2" : undefined,
                perspective: 800,
                transition: "transform .2s ease, box-shadow .2s ease",
              }}
              onMouseMove={(e) => {
                const el = e.currentTarget.firstElementChild; // the <figure>
                if (!el) return;
                const r = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width - 0.5) * 4;  // -2..2
                const y = ((e.clientY - r.top) / r.height - 0.5) * 4;
                el.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget.firstElementChild;
                if (el) el.style.transform = "rotateX(0) rotateY(0)";
              }}
            >
              <figure
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 24,
                  margin: 0,
                  transformStyle: "preserve-3d",
                  transition: "transform .25s ease",
                }}
              >
                <img
                  src={img?.src}
                  alt={img?.alt || ""}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: isHero ? "3 / 2" : aspect,
                    objectFit: "cover",
                    display: "block",
                    transform: "translateZ(10px) scale(1)",
                    transition: "transform .35s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "translateZ(10px) scale(1.03)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "translateZ(10px) scale(1)")}
                />
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(255,255,255,.0), rgba(0,0,0,.08))",
                    pointerEvents: "none",
                  }}
                />
              </figure>
            </button>
          );
        })}
      </div>

      {index !== null && current && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIndex(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.55)",
            backdropFilter: "blur(4px)",
            display: "grid",
            placeItems: "center",
            padding: 16,
            zIndex: 50,
            cursor: "zoom-out",
          }}
        >
          <div
            className="card"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(96vw, 1080px)",
              borderRadius: 24,
              overflow: "hidden",
              background: "var(--panel)",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={current.src}
                alt={current.alt || "Preview"}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div
                className="badge"
                style={{
                  position: "absolute",
                  right: 12,
                  top: 12,
                  background: "rgba(255,255,255,.9)",
                  border: "1px solid rgba(0,0,0,.08)",
                }}
              >
                {index + 1} / {images.length}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: 12,
              }}
            >
              <button
                className="btn btnGhost"
                onClick={() => setIndex((i) => ((i ?? 0) - 1 + images.length) % images.length)}
              >
                ◀ Prev
              </button>
              <button className="btn btnPrimary" onClick={() => setIndex(null)}>
                Close
              </button>
              <button
                className="btn btnGhost"
                onClick={() => setIndex((i) => ((i ?? 0) + 1) % images.length)}
              >
                Next ▶
              </button>
            </div>

            {/* Thumbnails */}
            <div
              style={{
                display: "grid",
                gridAutoFlow: "column",
                gap: 10,
                overflowX: "auto",
                padding: "0 12px 12px",
              }}
            >
              {images.map((t, ti) => (
                <button
                  key={t?.src || ti}
                  onClick={() => setIndex(ti)}
                  className="card"
                  style={{
                    padding: 0,
                    borderRadius: 10,
                    overflow: "hidden",
                    opacity: ti === index ? 1 : 0.7,
                    outline: ti === index ? "2px solid var(--ring)" : "1px solid rgba(0,0,0,.08)",
                  }}
                >
                  <img
                    src={t?.src}
                    alt={t?.alt || ""}
                    style={{ width: 80, height: 56, objectFit: "cover", display: "block" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
