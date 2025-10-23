"use client";

import Bubbles from "../components/decor/Bubbles";
import Container from "../components/layout/container";
import Section from "../components/layout/Section";
import ProjectCard from "../components/projects/ProjectCard";
import Gallery from "../components/abroad/Gallery";
import ChatWidget from "../components/ai/ChatWidget";

const PROFILE = {
  name: "Aileen Aryeetey",
  tag: "UI/UX Designer • Creative Technologist",
  blurb: `
 My name is Aileen Aryeetey. I’m 21 years old, and I aspire to be a UI/UX designer. I love designing calm, human-centered interfaces that feel clear and natural. I like adding small, thoughtful touches of AI when they genuinely make things easier or more enjoyable.
`,
  email: "naaayele04@gmail.com",
  location: "New Jersey • USA",
};

const PROJECTS = [
  {
    title: "MoodMuse PWA",
    year: "2025",
    blurb: "A mood tracking PWA with friendly avatars and a clean dashboard.",
    tags: ["PWA", "Figma", "AI"],
    image: "/projects/MoodMuse.png",
    link: "#",
    status: "In Progress",
  },
  {
    title: "RetroIM",
    year: "2025",
    blurb: "A nostalgic messenger with themes (Anime, Gaming, Sports, Movie).",
    tags: ["Flutter", "Mobile UI"],
    image: "/projects/Retroim.png",
    link: "#",
    status: "In Progress",
  },
];

const ABROAD = {
  blurb:
    "I studied design and culture in China. It shaped my eye for balance, color, and storytelling in interfaces.",
  images: [
    { src: "/abroad/china-1.jpg", alt: "Chinese architecture with lanterns" },
    { src: "/abroad/china-2.jpg", alt: "Street market in Wenzhou" },
    { src: "/abroad/china-3.jpg", alt: "Temple at dusk" },
    { src: "/abroad/china-4.jpg", alt: "Wenzhou-Kean University campus" },
    { src: "/abroad/china-5.jpg", alt: "Cultural event in China" },
  ],
};

export default function Home() {
  // make a small helper so styles aren't repeated
  const inputStyle = {
    border: "1px solid rgba(0,0,0,.1)",
    borderRadius: 12,
    padding: "10px 12px",
  };
  return (
    <div style={{position:"relative", minHeight:"100vh"}}>
      <Bubbles count={10} />

      {/* NAV */}
      <header className="navPillBar">
        <Container>
          <nav className="navPills">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#abroad">Study Abroad</a>
            <a href="#contact">Contact</a>
            <a href="/Aileen_Resume.pdf" className="btn btnPrimary" style={{marginLeft:8}}>Résumé</a>
          </nav>
        </Container>
      </header>

      {/* HERO */}
      <Section id="home">
        <div className="card" style={{padding:"28px 24px", position:"relative", overflow:"hidden"}}>
          <div aria-hidden style={{position:"absolute", right:-40, top:-40, width:200, height:200, borderRadius:"50%", background:"#ffeaf4", filter:"blur(24px)", opacity:.7}} />
          <div aria-hidden style={{position:"absolute", left:-60, bottom:-60, width:260, height:260, borderRadius:"50%", background:"#efeaff", filter:"blur(24px)", opacity:.7}} />
          <div className="grid" style={{gridTemplateColumns:"1fr", gap:24}}>
            <div>
              <span className="badge badgeBrand pulseSoft">✨ Open to opportunities</span>
              <h1 className="h1" style={{marginTop:12}}>{PROFILE.name}</h1>
              <p className="badge badgeSoft" style={{marginTop:8}}>{PROFILE.tag}</p>
              <p className="text-ink2" style={{marginTop:16, maxWidth:640}}>{PROFILE.blurb}</p>
              <div style={{display:"flex", gap:12, flexWrap:"wrap", marginTop:20}}>
                <a href="#projects" className="btn btnPrimary">See Projects</a>
                <a href="#contact"  className="btn btnGhost">Get in Touch</a>
                <a href="/Aileen_Resume.pdf" className="btn btnGhost">Download Résumé</a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ABOUT */}
<Section id="about" title="About" eyebrow="Profile">
  <div className="grid grid-3">
    {[
      ["Name", "Aileen Aryeetey (艾予昭)"],
      ["Birthday", "March 26, 2002"],
      ["Fun Fact", "I love designing software in an artistic way."],
    ].map(([h, p]) => (
      <div key={h} className="card" style={{padding:20}}>
        <div style={{fontWeight:600}} className="text-ink">{h}</div>
        <p style={{marginTop:6}} className="text-ink2">{p}</p>
      </div>
    ))}
  </div>
</Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" eyebrow="Selected Work">
        <div className="grid grid-2">
          {PROJECTS.map((p) => <ProjectCard key={p.title} {...p} />)}
        </div>
      </Section>

      {/* STUDY ABROAD */}
      <Section id="abroad" title="Study Abroad: China" eyebrow="WKU • 2025">
        <p className="text-ink2" style={{maxWidth:700}}>{ABROAD.blurb}</p>
        <div style={{marginTop:24}}>
          <Gallery columns={3} images={ABROAD.images} />
        </div>
      </Section>

      {/* CONTACT */}
<Section id="contact" title="Contact" eyebrow="Let’s talk">
  <div className="grid grid-2">
    <div className="card" style={{padding:20}}>
      <form
        action="https://formspree.io/f/REPLACE_ME"
        method="POST"
        className="card"
        style={{ padding: 20, display: "grid", gap: 12 }}
      >
        <input name="name" required placeholder="Your name" style={inputStyle} />
        <input type="email" name="email" required placeholder="Your email" style={inputStyle} />
        <textarea name="message" required rows={4} placeholder="Your message" style={inputStyle} />
        <button className="btn btnPrimary">Send</button>
      </form>
    </div>

    <div className="card" style={{padding:20}}>
      <div style={{fontWeight:600}} className="text-ink">Contact</div>
      <p className="text-ink2" style={{marginTop:6}}>{PROFILE.email}</p>
      <p className="text-ink2" style={{marginTop:6}}>{PROFILE.location}</p>
      <div style={{marginTop:12}}>
        <a href="/Aileen_Resume.pdf" className="btn btnGhost">Download Résumé</a>
      </div>
    </div>
  </div>

  <footer style={{marginTop:40, textAlign:"center", fontSize:14}} className="text-ink2">
    © {new Date().getFullYear()} {PROFILE.name} — Cute, professional, and human-centered
  </footer>
</Section>

      <ChatWidget />
    </div>
  );
}