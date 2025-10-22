// src/app/api/chat/route.js
const PROFILE = {
  name: "Aileen Aryeetey",
  email: "naaayele04@gmail.com",
  location: "New Jersey, USA",
  resumeUrl: "/Aileen_Resume.pdf",
  projects: [
    { title: "MoodMuse PWA", status: "In Progress", short: "Mood tracking PWA with friendly avatars." },
    { title: "RetroIM", status: "In Progress", short: "Nostalgic messenger with themed UI." },
  ],
  abroad: "I studied design and culture in China (Wenzhou-Kean University, 2025).",
};

function mockReply(userText = "") {
  const q = userText.toLowerCase();

  // Simple intents
  if (/hello|hi|hey|yo\b/.test(q)) return "Hi! I’m Aileen’s assistant. Ask me about her projects, study abroad, or how to get in touch.";
  if (/email|contact|reach/.test(q)) return `You can email Aileen at ${PROFILE.email}.`;
  if (/resume|cv/.test(q)) return `You can view or download the résumé here: ${PROFILE.resumeUrl}`;
  if (/location|based|where.*(live|located)/.test(q)) return `${PROFILE.name} is based in ${PROFILE.location}.`;
  if (/project|portfolio|work/.test(q)) {
    const list = PROFILE.projects.map(p => `• ${p.title} — ${p.status}: ${p.short}`).join("\n");
    return `Here are Aileen’s current projects:\n${list}\n\nWant details on any of them?`;
  }
  if (/moodmuse|mood muse/.test(q)) return "MoodMuse is a mood tracking PWA with friendly avatars and a clean dashboard. Status: In Progress.";
  if (/retroim|retro im/.test(q)) return "RetroIM is a nostalgic messenger with themed UI (Anime, Gaming, Sports, Movie). Status: In Progress.";
  if (/abroad|china|wenzhou|wku/.test(q)) return PROFILE.abroad + " There’s also a photo gallery in the Study Abroad section.";

  // Polite default
  return "Got it! I can help with her projects, study abroad, contact info, or résumé. What would you like to know?";
}

export async function POST(req) {
  try {
    const { messages = [] } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    const forceMock = process.env.FORCE_MOCK === "1";
    const lastUser = messages.filter(m => m.role === "user").pop()?.content ?? "";

    // Offline / fallback mode
    if (!apiKey || forceMock) {
      return Response.json({ reply: mockReply(lastUser), mock: true });
    }

    // Online mode (OpenAI)
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.6,
        messages: [
          { role: "system", content: "You are Aileen’s portfolio assistant. Be concise, friendly, and helpful." },
          ...messages,
        ],
      }),
    });

    if (!r.ok) {
      // graceful fallback if OpenAI fails
      return Response.json({ reply: mockReply(lastUser), mock: true });
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? mockReply(lastUser);
    return Response.json({ reply, mock: false });
  } catch (e) {
    // last-resort fallback
    return Response.json({ reply: mockReply(), mock: true });
  }
}
export function OPTIONS() {
  return new Response(null, { status: 204 });
}