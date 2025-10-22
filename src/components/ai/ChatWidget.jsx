"use client";
import { useEffect, useRef, useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I’m Aileen’s assistant. Ask me about my projects, study abroad, or how to contact me." }
  ]);
  const [error, setError] = useState(null);

  const listRef = useRef(null);
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || busy) return;
    setError(null);

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Server error");
        setMessages([...next, { role: "assistant", content: "Hmm, I hit a server error. Please try again." }]);
      } else {
        setMessages([...next, { role: "assistant", content: data.reply ?? "…" }]);
        if (data.mock) {
          setError("Running in mock mode — add OPENAI_API_KEY to .env.local and restart.");
        }
      }
    } catch (e) {
      setError("Network error. Are you running `npm run dev`?");
      setMessages([...next, { role: "assistant", content: "Network error—try again." }]);
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const bubble = {
    maxWidth:"85%", borderRadius:14, padding:"8px 10px", border:"1px solid rgba(0,0,0,.1)"
  };

  return (
    <div style={{position:"fixed", bottom:24, right:24, zIndex:60}}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="btn btnPrimary"
          style={{height:56, width:56, borderRadius:"50%", padding:0, boxShadow:"var(--shadow-lg)"}}
          aria-label="Open chat"
        >
          💬
        </button>
      ) : (
        <div className="card" style={{width:360, height:440, borderRadius:20, overflow:"hidden"}}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", background:"#fff", borderBottom:"1px solid rgba(0,0,0,.1)"}}>
            <div style={{fontWeight:600}}>Ask Aileen’s AI</div>
            <button onClick={() => setOpen(false)} className="btn btnGhost" style={{padding:"6px 10px"}}>✕</button>
          </div>

          <div ref={listRef} style={{height:300, overflowY:"auto", padding:12, display:"grid", gap:8}}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...bubble,
                  marginLeft: m.role === "user" ? "auto" : 0,
                  background: m.role === "user" ? "linear-gradient(180deg, var(--brand) 0%, #ff4e90 100%)" : "rgba(255,255,255,.9)",
                  color: m.role === "user" ? "#fff" : "inherit",
                }}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div style={{...bubble, background:"rgba(255,255,255,.9)"}}>
                Typing…
              </div>
            )}
          </div>

          <div style={{padding:10, borderTop:"1px solid rgba(0,0,0,.1)", background:"rgba(255,255,255,.8)"}}>
            {error && (
              <div style={{fontSize:12, color:"#7f1d1d", background:"#fee2e2", border:"1px solid #fecaca", borderRadius:10, padding:"6px 8px", marginBottom:8}}>
                {error}
              </div>
            )}
            <div style={{display:"flex", gap:8}}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about Aileen’s projects or study abroad…"
                rows={2}
                className="field"
                style={{resize:"none"}}
              />
              <button onClick={sendMessage} disabled={busy} className="btn btnPrimary">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}