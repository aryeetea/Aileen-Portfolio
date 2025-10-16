export default function ProjectCard({ title, year, blurb, tags = [], image, link }) {
  return (
    <a
      href={link || "#"}
      target={link ? "_blank" : undefined}
      rel={link ? "noopener noreferrer" : undefined}
      className="group block card overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,.10)] transition-shadow"
    >
      {image && (
        <div className="relative">
          <img
            src={image}
            alt={`${title} cover`}
            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/0 via-white/0 to-white/0 group-hover:via-white/10 group-hover:to-white/20 transition-colors" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          {year && <span className="text-xs text-ink2">{year}</span>}
        </div>
        {blurb && <p className="mt-2 text-sm text-ink2">{blurb}</p>}
        {tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full bg-white/85 px-2 py-0.5 text-xs text-ink2 ring-1 ring-black/5">
                {t}
              </span>
            ))}
          </div>
        )}
        {link && <div className="mt-3 text-sm font-medium text-[#7C0A02]">View project ↗</div>}
      </div>
    </a>
  );
}