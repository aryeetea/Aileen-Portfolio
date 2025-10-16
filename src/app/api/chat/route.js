export async function POST(req) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const { messages = [] } = await req.json();

    // Fallback "mock" mode so the UI still works if no key is present.
    if (!apiKey) {
      const last = messages[messages.length - 1]?.content ?? "";
      return Response.json({
        reply:
          "📎 Mock reply (no OPENAI_API_KEY found).\n\n" +
          "You said: " + last + "\n\n" +
          "Add your key to .env.local and restart to enable real AI.",
        mock: true,
      });
    }

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.6,
        messages: [
          { role: "system", content: "You are Aileen’s portfolio assistant. Be concise, friendly, and helpful about her work, study abroad, and contact info." },
          ...messages,
        ],
      }),
    });

    if (!r.ok) {
      const err = await r.text().catch(() => "");
      return new Response(JSON.stringify({ error: "Upstream error", detail: err }), { status: 502 });
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I didn’t catch that.";
    return Response.json({ reply });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

// Optional: allow preflight for future deploys
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" },
  });
}