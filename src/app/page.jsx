"use client";

import { useEffect } from "react";

import Bubbles from "../components/decor/Bubbles";
import Container from "../components/layout/container";
import Section from "../components/layout/Section";
import ProjectCard from "../components/projects/ProjectCard";
import Gallery from "../components/abroad/Gallery";
import ChatWidget from "../components/ai/ChatWidget";

// ✅ single source of truth
import { PROFILE, PROJECTS, ABROAD } from "@/content/site";

export default function Home() {
  const inputStyle = {
    border: "1px solid rgba(0,0,0,.1)",
    borderRadius: 12,
    padding: "10px 12px",
  };

  // 🔥 highlight the active nav link (pink) on click + scroll
  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "abroad", "contact"];

    const navLinks = Array.from(document.querySelectorAll('.navPills a[href^="#"]'));
    const footerLinks = Array.from(document.querySelectorAll('.footerNav a[href^="#"]'));
    const allLinks = [...navLinks, ...footerLinks];

    const setActive = (id) => {
      allLinks.forEach((a) => {
        const href = a.getAttribute("href");
        a.classList.toggle("active", href === `#${id}`);
      });
    };

    const onClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      const id = href?.slice(1);
      if (id) setActive(id);
    };
    allLinks.forEach((a) => a.addEventListener("click", onClick));

    // scroll-based highlighting
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        // choose the one most in view
        const topMost = visible.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];
        setActive(topMost.target.id);
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: [0.25, 0.6, 0.9] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    // initial state
    setActive("home");

    return () => {
      obs.disconnect();
      allLinks.forEach((a) => a.removeEventListener("click", onClick));
    };
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
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
            <a href="/Aileen_Resume.pdf" className="btn btnPrimary" style={{ marginLeft: 8 }}>
              Résumé
            </a>
          </nav>
        </Container>
      </header>

      {/* HERO */}
      <Section id="home">
        <div className="card" style={{ padding: "28px 24px", position: "relative", overflow: "hidden" }}>
          {/* soft blobs */}
          <div aria-hidden style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "#ffeaf4", filter: "blur(24px)", opacity: .7 }} />
          <div aria-hidden style={{ position: "absolute", left: -60, bottom: -60, width: 260, height: 260, borderRadius: "50%", background: "#efeaff", filter: "blur(24px)", opacity: .7 }} />
          {/* cute stickers */}
          <div aria-hidden className="sticker float" style={{ position: "absolute", right: 20, bottom: 20 }}>🌸</div>
          <div aria-hidden className="sticker float" style={{ position: "absolute", left: 20, top: 20 }}>⭐️</div>

          <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 24 }}>
            <div>
              <span className="badge badgeBrand pulseSoft">✨ Open to opportunities</span>
              <h1 className="h1" style={{ marginTop: 12 }}>{PROFILE.name}</h1>
              <p className="badge badgeSoft" style={{ marginTop: 8 }}>{PROFILE.tag}</p>
              <p className="text-ink2" style={{ marginTop: 16, maxWidth: 640 }}>
                {PROFILE.blurb}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
                <a href="#projects" className="btn btnPrimary">See Projects</a>
                <a href="#contact" className="btn btnGhost">Get in Touch</a>
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
            ["What I care about", "Clarity, kindness, and designs that make people feel calm and confident."],
            ["Recent projects", "MoodMuse PWA and RetroIM — both focused on friendly, playful UX."],
            ["Fun fact", "I collect cute stickers and sometimes design UI like it’s stationery 🩷"],
          ].map(([h, p]) => (
            <div key={h} className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 600 }} className="text-ink">{h}</div>
              <p style={{ marginTop: 6 }} className="text-ink2">{p}</p>
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
        <p className="text-ink2" style={{ maxWidth: 700 }}>{ABROAD.blurb}</p>
        <div style={{ marginTop: 24 }}>
          <Gallery columns={3} images={ABROAD.images} />
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" eyebrow="Let’s talk">
        <div className="grid grid-2">
          <div className="card" style={{ padding: 20 }}>
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

          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 600 }} className="text-ink">Contact</div>
            <p className="text-ink2" style={{ marginTop: 6 }}>{PROFILE.email}</p>
            <p className="text-ink2" style={{ marginTop: 6 }}>{PROFILE.location}</p>
            <div style={{ marginTop: 12 }}>
              <a href="/Aileen_Resume.pdf" className="btn btnGhost">Download Résumé</a>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER — nav + copyright only */}
      <footer className="footerBar">
        <div className="footerInner">
          <div className="footerNav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#abroad">Study Abroad</a>
            <a href="#contact">Contact</a>
            <a href="/Aileen_Resume.pdf">Résumé</a>
          </div>
          <div className="text-ink2" style={{ fontSize: 14 }}>
            © {new Date().getFullYear()} {PROFILE.name} • All rights reserved
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}