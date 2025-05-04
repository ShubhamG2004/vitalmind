import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function History() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchLogs();
  }, [status]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("/api/healthlog");
      setLogs(res.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  if (status === "loading") return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Previous Health Logs</h1>

      {logs.length === 0 ? (
        <p className="text-gray-600 text-center">No health logs available yet.</p>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log._id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
            >
              <p><strong>Date:</strong> {log.date}</p>
              <p><strong>Sleep Hours:</strong> {log.sleepHours} hrs</p>
              <p><strong>Water Intake:</strong> {log.waterIntake} L</p>
              <p><strong>Meals:</strong> {log.meals}</p>
              <p><strong>Mood:</strong> {log.mood}</p>
              <p><strong>Notes:</strong> {log.notes}</p>
              {log.aiSuggestion && (
                <p className="text-green-700 mt-3">
                  <strong>AI Suggestion:</strong> {log.aiSuggestion}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
