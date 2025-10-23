// src/app/api/chat/route.js
import OpenAI from "openai";

export const dynamic = "force-dynamic"; // avoid caching in dev

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return Response.json({ error: "Missing prompt" }, { status: 400 });

    const resp = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // or "llama-3.1-8b-instant"
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = resp.choices?.[0]?.message?.content ?? "";
    return Response.json({ reply: text });
  } catch (err) {
    console.error("Groq API error:", err);
    return Response.json({ error: "Groq request failed" }, { status: 500 });
  }
}