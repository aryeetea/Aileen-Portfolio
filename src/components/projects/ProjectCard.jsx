"use client";

export default function ProjectCard({ title, year, blurb, tags = [], image, link, status }) {
  return (
    <a
      href={link || "#"}
      className="group block rounded-2xl bg-[var(--panel)] ring-1 ring-black/5 shadow-[0_8px_24px_rgba(0,0,0,.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,.1)] transition-all duration-300 overflow-hidden"
    >
      {/* Project image */}
      {image && (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-ink2">{year}</div>

          {/* Status Badge */}
          {status && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 bg-amber-100 rounded-full px-2 py-1 animate-pulse-glow">
              <span className="text-lg leading-none">🔧</span> {status}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-ink group-hover:text-[#7C0A02] transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-ink2">{blurb}</p>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs rounded-full bg-white/70 ring-1 ring-black/5 px-2 py-1 text-ink2"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}