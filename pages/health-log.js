import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function HealthLog() {
  const { data: session, status } = useSession();
  const [logs, setLogs] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    sleepHours: "",
    waterIntake: "",
    meals: "",
    mood: "",
    notes: "",
  });

  const fetchLogs = async () => {
    try {
      const res = await axios.get("/api/healthlog");
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching logs:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchLogs();
    }
  }, [status]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/healthlog", form);
      setForm({
        date: new Date().toISOString().slice(0, 10),
        sleepHours: "",
        waterIntake: "",
        meals: "",
        mood: "",
        notes: "",
      });
      fetchLogs();
    } catch (err) {
      console.error("Error submitting log:", err.response?.data || err.message);
    }
  };

  const getSuggestion = async () => {
    setLoading(true);
    setSuggestion("");
    try {
      const res = await axios.post("/api/suggestion", {
        sleepHours: form.sleepHours,
        waterIntake: form.waterIntake,
        meals: form.meals,
        mood: form.mood,
        notes: form.notes,
      });
      setSuggestion(res.data.suggestion);
    } catch (err) {
      console.error("AI Error:", err.response?.data || err.message);
      setSuggestion("Failed to get suggestion.");
    }
    setLoading(false);
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please sign in to access your health log.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Health Log</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6 border p-4 rounded shadow">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-2 border"
          />
          <input
            type="number"
            name="sleepHours"
            placeholder="Sleep Hours"
            value={form.sleepHours}
            onChange={handleChange}
            className="p-2 border"
            min="0"
          />
          <input
            type="number"
            name="waterIntake"
            placeholder="Water Intake (L)"
            value={form.waterIntake}
            onChange={handleChange}
            className="p-2 border"
            min="0"
          />
          <input
            type="text"
            name="meals"
            placeholder="Meals"
            value={form.meals}
            onChange={handleChange}
            className="p-2 border"
          />
          <input
            type="text"
            name="mood"
            placeholder="Mood"
            value={form.mood}
            onChange={handleChange}
            className="p-2 border"
          />
        </div>
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={handleChange}
          className="w-full p-2 border"
          rows={3}
        />
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Log
          </button>
          <button
            type="button"
            onClick={getSuggestion}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Get AI Suggestion
          </button>
        </div>
      </form>

      {loading && <p className="text-blue-600">Generating suggestion...</p>}
      {suggestion && (
        <div className="p-4 mt-4 bg-green-50 border rounded shadow text-sm">
          <strong>AI Suggestion:</strong>
          <p>{suggestion}</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">📅 Previous Logs</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {logs.length === 0 ? (
          <p>No logs yet. Start logging your day!</p>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="border p-3 rounded bg-gray-50 shadow-sm">
              <p><strong>Date:</strong> {log.date}</p>
              <p><strong>Sleep:</strong> {log.sleepHours} hrs</p>
              <p><strong>Water:</strong> {log.waterIntake} L</p>
              <p><strong>Meals:</strong> {log.meals}</p>
              <p><strong>Mood:</strong> {log.mood}</p>
              {log.notes && <p><strong>Notes:</strong> {log.notes}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
