import { useState } from "react";

export default function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-cyan-600">🧠 AI Health Chatbot</h1>

      <div className="border rounded-lg p-6 h-[500px] overflow-y-auto bg-gray-50 space-y-4 shadow-md">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-md ${
              msg.role === "user"
                ? "bg-blue-100 text-right ml-auto"
                : "bg-gray-200 text-left mr-auto"
            } w-fit max-w-[85%]`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">AI is typing...</div>}
      </div>

      <form onSubmit={sendMessage} className="mt-6 flex">
        <input
          type="text"
          className="flex-1 border px-5 py-3 rounded-l-lg focus:outline-none text-lg"
          placeholder="Ask something about your health..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-r-lg hover:opacity-90 text-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}
