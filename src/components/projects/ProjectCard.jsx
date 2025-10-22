"use client";

export default function ProjectCard({ title, year, blurb, tags = [], image, link, status }) {
  return (
    <a href={link || "#"} className="card" style={{display:"block", overflow:"hidden", borderRadius:24, transition:"box-shadow .25s ease"}}>
      {image && (
        <div style={{overflow:"hidden"}}>
          <img
            src={image}
            alt={title}
            style={{height:224, width:"100%", objectFit:"cover", transform:"scale(1)", transition:"transform .5s ease"}}
            className="project-img"
          />
        </div>
      )}
      <div style={{padding:20}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
          <div className="text-ink2" style={{fontSize:14}}>{year}</div>
          {status && <span className="badge badgeBrand">🔧 {status}</span>}
        </div>
        <h3 style={{margin:"4px 0 0 0", fontWeight:800, fontSize:18}} className="text-ink">{title}</h3>
        <p style={{marginTop:8}} className="text-ink2">{blurb}</p>
        {tags.length > 0 && (
          <div style={{display:"flex", flexWrap:"wrap", gap:8, marginTop:12}}>
            {tags.map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        a.card:hover { box-shadow: var(--shadow-lg); }
        a.card:hover .project-img { transform: scale(1.03); }
      `}</style>
    </a>
  );
}