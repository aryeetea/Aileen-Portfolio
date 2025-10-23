// src/components/ai/ChatWidget.jsx
"use client";
import { useState } from "react";

export default function ChatWidget() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");

  async function ask(e) {
    e.preventDefault();
    setReply("Thinking...");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),   // <-- must be { prompt }
    });
    const data = await res.json();
    setReply(data.reply || data.error || "(no reply)");
  }

  return (
    <div className="card" style={{ padding: 16, marginTop: 24 }}>
      <form onSubmit={ask} style={{ display: "grid", gap: 12 }}>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything…"
          className="field"
        />
        <button className="btn btnPrimary">Ask</button>
      </form>
      <div style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{reply}</div>
    </div>
  );
}