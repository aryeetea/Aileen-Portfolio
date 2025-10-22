"use client";
import { useState } from "react";

export default function Gallery({ images = [], columns = 3 }) {
  const [index, setIndex] = useState(null);

  const gridStyle = {
    display: "grid",
    gap: 12,
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };

  return (
    <>
      <div style={gridStyle}>
        {images.map((img, i) => (
          <button
            key={img.src || i}
            onClick={() => setIndex(i)}
            className="card"
            style={{overflow:"hidden", borderRadius:16, padding:0, cursor:"zoom-in"}}
          >
            <img src={img.src} alt={img.alt || "Gallery image"} style={{height:200, width:"100%", objectFit:"cover"}} />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          onClick={() => setIndex(null)}
          style={{
            position:"fixed", inset:0, background:"rgba(0,0,0,.5)",
            display:"grid", placeItems:"center", padding:16, zIndex:50, cursor:"zoom-out"
          }}
        >
          <div className="card" style={{maxWidth:1000, width:"min(92vw, 1000px)", overflow:"hidden"}}>
            <img
              src={images[index].src}
              alt={images[index].alt || "Preview"}
              style={{width:"100%", height:"auto"}}
            />
            <div style={{display:"flex", justifyContent:"space-between", padding:12}}>
              <button className="btn btnGhost" onClick={(e)=>{e.stopPropagation(); setIndex((i)=> (i-1+images.length)%images.length);}}>◀ Prev</button>
              <button className="btn btnGhost" onClick={(e)=>{e.stopPropagation(); setIndex((i)=> (i+1)%images.length);}}>Next ▶</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}