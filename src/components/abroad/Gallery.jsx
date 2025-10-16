"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Gallery({ images = [], columns = 3 }) {
  const [index, setIndex] = useState(null);
  const open = (i) => setIndex(i);
  const close = () => setIndex(null);
  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <>
      <div className={`grid gap-4 sm:grid-cols-2 md:grid-cols-${Math.max(2, columns)} auto-rows-[14rem]`}>
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => open(i)}
            className="group relative rounded-2xl overflow-hidden ring-1 ring-black/5 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#9f0c0c]"
            aria-label={`Open image ${i + 1}`}
          >
            <img src={img.src} alt={img.alt || `Photo ${i+1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-center text-xs sm:text-sm font-medium text-white/90 group-hover:text-[#d90f0f] transition-colors duration-300 backdrop-blur-sm bg-black/20 group-hover:bg-white/20">
              {img.alt || "China"}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button className="absolute top-4 right-4 text-white text-2xl font-bold" aria-label="Close">×</button>
            <button className="absolute left-6 text-white text-3xl font-semibold" onClick={(e)=>{e.stopPropagation();prev();}} aria-label="Previous">‹</button>
            <motion.img
              key={images[index].src}
              src={images[index].src}
              alt={images[index].alt || "China photo"}
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl ring-1 ring-white/20 object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e)=>e.stopPropagation()}
            />
            <button className="absolute right-6 text-white text-3xl font-semibold" onClick={(e)=>{e.stopPropagation();next();}} aria-label="Next">›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}