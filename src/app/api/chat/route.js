import OpenAI from "openai";
import { siteContextString, FEWSHOTS } from "@/content/site";
export const dynamic = "force-dynamic";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return Response.json({ error: "Missing prompt" }, { status: 400 });

    const msgs = [
      { role: "system", content: siteContextString() },
      // few-shot examples keep tone on track
      ...FEWSHOTS.flatMap(s => ([
        { role: "user", content: s.user },
        { role: "assistant", content: s.assistant },
      ])),
      { role: "user", content: prompt },
    ];

    const resp = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: msgs,
      temperature: 0.8,          // warmer voice
      top_p: 0.9,
      max_tokens: 300,           // concise by default
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