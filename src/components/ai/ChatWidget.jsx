"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "aileen.chat.messages";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState(() => {
    if (typeof window === "undefined") return [{ role: "assistant", content: "Hi! I’m Aileen’s assistant. How can I help? ✨" }];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [{ role: "assistant", content: "Hi! I’m Aileen’s assistant. How can I help? ✨" }];
    } catch { return [{ role: "assistant", content: "Hi! I’m Aileen’s assistant. How can I help? ✨" }]; }
  });

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 80); }, [open]);
  useEffect(() => { const el = scrollerRef.current; if (el) el.scrollTop = el.scrollHeight; }, [messages, loading]);

  useEffect(() => {
    function onKey(e){ if (e.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function sendPrompt(e) {
    e?.preventDefault();
    const text = prompt.trim();
    if (!text || loading) return;

    setPrompt("");
    setMessages(m => [...m, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessages(m => [...m, { role: "assistant", content: `⚠️ ${err?.error || `Request failed: ${res.status}`}` }]);
        return;
      }

      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", content: data.reply || "(no reply)" }]);
    } catch (err) {
      setMessages(m => [...m, { role: "assistant", content: `⚠️ Network error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  }

  const fabStyle = useMemo(() => ({
    position: "fixed",
    right: "max(16px, env(safe-area-inset-right))",
    bottom: "max(16px, env(safe-area-inset-bottom))",
    zIndex: 9999,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 56, height: 56, borderRadius: "50%",
    background: "linear-gradient(180deg, var(--brand), #ff4e90)",
    color: "#fff", border: "none",
    boxShadow: "0 10px 28px rgba(0,0,0,.18)",
    cursor: "pointer", fontSize: 22,
    transition: "transform .12s ease",
  }), []);

  const panelStyle = useMemo(() => ({
    position: "fixed",
    right: "max(16px, env(safe-area-inset-right))",
    bottom: "calc(max(16px, env(safe-area-inset-bottom)) + 64px)",
    zIndex: 9998,
    width: "min(360px, 92vw)",
    background: "var(--panel)",
    border: "1px solid rgba(0,0,0,.1)",
    borderRadius: 16,
    boxShadow: "var(--shadow-lg)",
    display: "flex", flexDirection: "column", overflow: "hidden",
    animation: "fadeSlide .18s ease",
  }), []);

  const headerStyle = {
    padding: "10px 12px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "rgba(255,255,255,.85)",
    borderBottom: "1px solid rgba(0,0,0,.06)"
  };

  const leftHeader = {
    display: "flex", alignItems: "center", gap: 10
  };

  const avatar = {
    width: 28, height: 28, borderRadius: "50%",
    background: "#ffeaf4", display: "grid", placeItems: "center",
    border: "1px solid rgba(0,0,0,.08)", fontSize: 14,
  };

  const msgsStyle = {
    padding: 12, display: "grid", gap: 8,
    maxHeight: 360, overflowY: "auto",
    background: "linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.98))"
  };

  const bubble = (role) => ({
    padding: "10px 12px",
    borderRadius: 12,
    background: role === "user" ? "#fff" : "#ffeaf4",
    border: "1px solid rgba(0,0,0,.08)",
    color: "var(--ink-2)",
    whiteSpace: "pre-wrap"
  });

  function onKeyDown(e){
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendPrompt(); }
  }

  return (
    <>
      {open && (
        <div style={panelStyle} role="dialog" aria-label="Chat Assistant">
          <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
          <div style={headerStyle}>
            <div style={leftHeader}>
              <div style={avatar}>🌸</div>
              <strong>Assistant</strong>
            </div>
            <button onClick={() => setOpen(false)} className="btn btnGhost" style={{ padding: "6px 10px", fontSize: 12 }}>
              Close
            </button>
          </div>

          <div ref={scrollerRef} style={msgsStyle}>
            {messages.map((m, i) => (
              <div key={i} style={bubble(m.role)}>
                <div style={{ fontSize: 12, opacity: .6, marginBottom: 4 }}>
                  {m.role === "user" ? "You" : "Assistant"}
                </div>
                {m.content}
              </div>
            ))}
            {loading && <div style={bubble("assistant")}>Thinking…</div>}
          </div>

          <form onSubmit={sendPrompt} style={{ display: "flex", gap: 8, padding: 12 }}>
            <textarea
              ref={inputRef}
              className="field"
              rows={2}
              placeholder="Ask about Aileen, her projects, or design process… (Shift+Enter = new line)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={onKeyDown}
              style={{ flex: 1, resize: "none" }}
            />
            <button className="btn btnPrimary" disabled={loading}>Send</button>
          </form>
        </div>
      )}

      <button
        aria-label="Open chat"
        style={fabStyle}
        onClick={() => setOpen(v => !v)}
        title="Chat"
      >
        💬
      </button>
    </>
  );
}