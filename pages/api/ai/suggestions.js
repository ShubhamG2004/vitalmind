import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { sleepHours, waterIntake, meals, mood, notes } = req.body;

    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a prompt for health suggestions
    const prompt = `
      Act as a professional health advisor. Based on the following daily health metrics, 
      provide 3 practical, actionable suggestions to improve the user's health and wellbeing.
      Keep the suggestions concise (in the only 3 lines).

      Today's Health Metrics:
      - Sleep: ${sleepHours || 'Not recorded'} hours
      - Water Intake: ${waterIntake || 'Not recorded'} liters
      - Meals: ${meals || 'Not recorded'}
      - Mood: ${mood || 'Not recorded'}
      - Notes: ${notes || 'None'}

      Provide exactly 3 suggestions in this format:
      1. [Suggestion about sleep if relevant]
      2. [Suggestion about hydration if relevant]
      3. [Suggestion about mood/stress or general wellness if relevant]

      Make the tone encouraging and positive. If any metrics are missing, provide general health tips.
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Format the response to only include the first 3 suggestions
    const suggestions = text
      .split('\n')
      .filter(line => line.trim().length > 0)
      .slice(0, 3)  // Take only the first 3 suggestions
      .join('\n');

    res.status(200).json({ suggestion: suggestions });
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Fallback suggestions if Gemini fails
    const fallbackSuggestions = [
      "1. Aim for 7-9 hours of sleep each night for optimal recovery",
      "2. Drink at least 2 liters of water daily to stay hydrated",
      "3. Practice mindfulness or deep breathing when feeling stressed"
    ].join('\n');
    
    res.status(200).json({ 
      suggestion: fallbackSuggestions,
      note: "Default suggestions provided due to AI service issue"
    });
  }
}
