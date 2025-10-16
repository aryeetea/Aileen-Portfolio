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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="h-14 w-14 rounded-full bg-[#9f0a0a] text-white shadow-lg hover:brightness-110"
          aria-label="Open chat"
        >
          💬
        </button>
      ) : (
        <div className="w-[22rem] md:w-[24rem] h-[28rem] rounded-2xl bg-[var(--panel)] border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,.15)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-white/70 border-b border-black/10">
            <div className="font-semibold text-ink">Ask Aileen’s AI</div>
            <button onClick={() => setOpen(false)} className="text-ink2 hover:text-ink">✕</button>
          </div>

          <div ref={listRef} className="h-[19rem] overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 ${
                  m.role === "user"
                    ? "ml-auto bg-[#9f0a0a] text-white"
                    : "bg-white/90 border border-black/10 text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="max-w-[85%] rounded-xl px-3 py-2 bg-white/90 border border-black/10 text-ink">
                Typing…
              </div>
            )}
          </div>

          <div className="p-2 border-t border-black/10 bg-white/60 space-y-2">
            {error && (
              <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-2 py-1">
                {error}
              </div>
            )}
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about Aileen’s projects or study abroad…"
                rows={2}
                className="flex-1 resize-none rounded-lg border border-black/10 bg-white/90 px-3 py-2"
              />
              <button
                onClick={sendMessage}
                disabled={busy}
                className="rounded-lg bg-[#9f0a0a] px-4 text-white font-semibold disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}