// pages/api/suggestion.js

export default async function handler(req, res) {
    if (req.method !== "POST")
      return res.status(405).json({ message: "Only POST allowed" });
  
    const { sleepHours, waterIntake, meals, mood, notes } = req.body;
  
    try {
      const prompt = `
  Based on the following health log, give personalized, practical suggestions for improving overall health.
  
  Sleep Hours: ${sleepHours}
  Water Intake (L): ${waterIntake}
  Meals: ${meals}
  Mood: ${mood}
  Notes: ${notes || "None"}
  
  Suggestions (in 2-3 sentences):
      `;
  
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
          process.env.GEMINI_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
  
      const result = await response.json();
      const reply =
        result.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No suggestions available.";
  
      res.status(200).json({ suggestion: reply });
    } catch (error) {
      console.error("Gemini API error:", error);
      res.status(500).json({ message: "Failed to get suggestion." });
    }
  }
  