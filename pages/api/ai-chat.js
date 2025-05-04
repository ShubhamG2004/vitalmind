// pages/api/ai-chat.js
export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
  
    const { messages } = req.body;
  
    const prompt = messages
      .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
      .join("\n") + "\nAI:";
  
    try {
      const geminiRes = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );
  
      const data = await geminiRes.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
      res.status(200).json({ reply });
    } catch (error) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "Gemini API failed" });
    }
  }
  