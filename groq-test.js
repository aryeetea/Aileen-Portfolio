import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function run() {
  const r = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile", // or "llama-3.1-8b-instant"
    messages: [{ role: "user", content: "Say hello from Groq!" }],
  });
  console.log(r.choices[0].message.content);
}
run().catch(console.error);
