"use client";

import Blossoms from "../components/decor/Blossoms";
import Lanterns from "../components/decor/Lanterns";
import Container from "../components/layout/container";
import Section from "../components/layout/Section";
import ProjectCard from "../components/projects/ProjectCard";
import Gallery from "../components/abroad/Gallery";
import ChatWidget from "../components/ai/ChatWidget";

const PROFILE = {
  name: "Aileen Aryeetey",
  tag: "UI/UX Designer • Creative Technologist",
  blurb:
    "I design clean, human interfaces with a soft aesthetic and clear writing. I add small, helpful AI when it improves the experience.",
  email: "naaayele04@gmail.com",
  location: "New Jersey • USA",
};

const PROJECTS = [
  {
    title: "MoodMuse PWA",
    year: "2025",
    blurb: "A mood tracking PWA with friendly avatars and a clean dashboard.",
    tags: ["PWA", "Figma", "AI"],
    image: "/projects/moodmuse.png",
    link: "#",
    status: "In Progress",
  },
  {
    title: "RetroIM",
    year: "2025",
    blurb: "A nostalgic messenger with themes (Anime, Gaming, Sports, Movie).",
    tags: ["Flutter", "Mobile UI"],
    image: "/projects/retroim.png",
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
  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(180deg, #fff7ed 0%, #f9f5ec 40%, transparent 100%)",
        }}
      />
      <Blossoms count={26} />
      <Lanterns />

      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 shadow-lg shadow-black/5">
        <Container className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-300/90 ring-1 ring-black/5">
              <span className="font-bold text-[#7C0A02]">AA</span>
            </span>
            <span className="font-semibold">{PROFILE.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="text-ink2 hover:text-ink">About</a>
            <a href="#projects" className="text-ink2 hover:text-ink">Projects</a>
            <a href="#abroad" className="text-ink2 hover:text-ink">Study Abroad</a>
            <a href="#contact" className="text-ink2 hover:text-ink">Contact</a>
          </nav>
        </Container>
      </header>

      {/* HERO */}
      <Section id="home">
        <div className="p-6 md:p-10 card backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-bold text-ink">{PROFILE.name}</h1>
          <p className="mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-ink">
            {PROFILE.tag}
          </p>
          <p className="mt-5 max-w-xl text-ink2">{PROFILE.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">See Projects</a>
            <a href="#contact" className="btn-ghost">Get in Touch</a>
            <a href="/Aileen_Resume.pdf" className="btn-ghost">Download Résumé</a>
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" title="About" eyebrow="Profile">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Human-first UX", "I favor clarity and comfort. Every screen should feel calm and obvious."],
            ["Clear writing", "Words are UI. I prefer simple language and meaningful labels."],
            ["Helpful AI", "I add AI where it truly helps—summaries, better wording, and guidance."],
          ].map(([h, p]) => (
            <div key={h} className="card p-5">
              <div className="font-semibold text-ink">{h}</div>
              <p className="mt-1 text-sm text-ink2">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" eyebrow="Selected Work">
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </Section>

      {/* STUDY ABROAD */}
      <Section id="abroad" title="Study Abroad: China" eyebrow="WKU • 2025">
        <p className="max-w-2xl text-ink2">{ABROAD.blurb}</p>
        <div className="mt-8">
          <Gallery columns={3} images={ABROAD.images} />
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" eyebrow="Let’s talk">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-5">
            <div>
              <span className="font-medium">Email:</span>{" "}
              <a href={`mailto:${PROFILE.email}`} className="underline underline-offset-2">
                {PROFILE.email}
              </a>
            </div>
            <div className="mt-2 text-sm text-ink2">{PROFILE.location}</div>
          </div>

          <form
            action="https://formspree.io/f/REPLACE_ME"
            method="POST"
            className="card p-5 grid gap-3"
          >
            <input name="name" required placeholder="Your name" className="rounded-lg border border-black/10 px-3 py-2" />
            <input type="email" name="email" required placeholder="Your email" className="rounded-lg border border-black/10 px-3 py-2" />
            <textarea name="message" required rows={4} placeholder="Your message" className="rounded-lg border border-black/10 px-3 py-2" />
            <button className="btn-primary">Send</button>
          </form>
        </div>
        <footer className="mt-10 text-center text-sm text-ink2">
          © {new Date().getFullYear()} {PROFILE.name} — Inspired by Chinese design and modern UX
        </footer>
      </Section>

      <ChatWidget />
    </div>
  );
}