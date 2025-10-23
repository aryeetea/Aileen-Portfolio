import OpenAI from "openai";
import { siteContextString, FEWSHOTS } from "@/content/site";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("Missing GROQ_API_KEY env var on the server");
      return Response.json({ error: "Server misconfigured (missing GROQ_API_KEY)" }, { status: 500 });
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const { prompt } = await req.json();
    if (!prompt) return Response.json({ error: "Missing prompt" }, { status: 400 });

    const msgs = [
      { role: "system", content: siteContextString() },
      ...FEWSHOTS.flatMap(s => ([
        { role: "user", content: s.user },
        { role: "assistant", content: s.assistant },
      ])),
      { role: "user", content: prompt },
    ];

    const resp = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: msgs,
      temperature: 0.8,
      top_p: 0.9,
      max_tokens: 300,
      presence_penalty: 0.2,
      frequency_penalty: 0.2,
    });

    const text = resp.choices?.[0]?.message?.content ?? "";
    return Response.json({ reply: text });
  } catch (e) {
    console.error("Groq API error:", e);
    return Response.json({ error: "Groq request failed" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ ok: true, route: "/api/chat" });
}