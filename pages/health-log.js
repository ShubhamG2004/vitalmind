import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FiPlus, FiClock, FiDroplet, FiCoffee, FiSmile, FiEdit2 } from "react-icons/fi";

export default function HealthLog() {
  const { data: session, status } = useSession();
  const [logs, setLogs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) return <div className="min-h-screen flex items-center justify-center">Please sign in to access your health log.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Health Journal</h1>
        <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FiPlus className="inline" /> New Entry
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FiClock /> Sleep Hours
              </label>
              <input
                type="number"
                name="sleepHours"
                placeholder="e.g. 7.5"
                value={form.sleepHours}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="0.5"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FiDroplet /> Water Intake (L)
              </label>
              <input
                type="number"
                name="waterIntake"
                placeholder="e.g. 2.5"
                value={form.waterIntake}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="0.25"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FiCoffee /> Meals
              </label>
              <input
                type="text"
                name="meals"
                placeholder="e.g. Oatmeal, Salad, Chicken"
                value={form.meals}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FiSmile /> Mood
              </label>
              <select
                name="mood"
                value={form.mood}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your mood</option>
                <option value="😊 Happy">😊 Happy</option>
                <option value="😐 Neutral">😐 Neutral</option>
                <option value="😟 Anxious">😟 Anxious</option>
                <option value="😡 Angry">😡 Angry</option>
                <option value="😴 Tired">😴 Tired</option>
                <option value="🤩 Excited">🤩 Excited</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FiEdit2 /> Notes
            </label>
            <textarea
              name="notes"
              placeholder="Any additional notes about your day..."
              value={form.notes}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all ${
              isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Daily Log'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 text-white">
          <h2 className="text-xl font-semibold">Your Health History</h2>
        </div>
        
        <div className="p-4">
          {logs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2">No entries yet</p>
              <p className="text-sm">Start by adding your first health log above</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {logs.map((log) => (
                <div key={log._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg text-gray-800">
                      {new Date(log.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <span className="text-2xl">{log.mood || '📝'}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-blue-50 p-2 rounded">
                      <div className="text-blue-600 font-medium flex items-center gap-1">
                        <FiClock size={14} /> Sleep
                      </div>
                      <div>{log.sleepHours || '--'} hrs</div>
                    </div>
                    
                    <div className="bg-blue-50 p-2 rounded">
                      <div className="text-blue-600 font-medium flex items-center gap-1">
                        <FiDroplet size={14} /> Water
                      </div>
                      <div>{log.waterIntake || '--'} L</div>
                    </div>
                    
                    <div className="bg-blue-50 p-2 rounded">
                      <div className="text-blue-600 font-medium flex items-center gap-1">
                        <FiCoffee size={14} /> Meals
                      </div>
                      <div className="truncate">{log.meals || '--'}</div>
                    </div>
                  </div>
                  
                  {log.notes && (
                    <div className="mt-3 bg-gray-50 p-3 rounded text-sm">
                      <p className="text-gray-600">{log.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}