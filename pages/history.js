import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  FiClock,
  FiDroplet,
  FiCoffee,
  FiSmile,
  FiFileText,
  FiCalendar,
} from "react-icons/fi";

export default function History() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchLogs();
  }, [status]);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/healthlog");
      setLogs(res.data);
      setFilteredLogs(res.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = logs.filter((log) => {
      const dateString = new Date(log.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return (
        log.mood?.toLowerCase().includes(query) ||
        log.notes?.toLowerCase().includes(query) ||
        dateString.toLowerCase().includes(query)
      );
    });

    setFilteredLogs(filtered);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Health Journal History
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Review your wellness journey over time
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by mood, date, or notes..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No matching entries</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or create a new log.
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push("/log")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create New Log
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredLogs.map((log) => (
              <div
                key={log._id}
                className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-md"
              >
                <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <FiCalendar className="mr-2 text-blue-500" />
                      {new Date(log.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {log.mood}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sleep */}
                    <Item
                      icon={<FiClock size={20} />}
                      title="Sleep Hours"
                      value={`${log.sleepHours} hours`}
                    />
                    {/* Water */}
                    <Item
                      icon={<FiDroplet size={20} />}
                      title="Water Intake"
                      value={`${log.waterIntake} liters`}
                    />
                    {/* Meals */}
                    <Item
                      icon={<FiCoffee size={20} />}
                      title="Meals"
                      value={log.meals}
                    />
                    {/* Mood */}
                    <Item
                      icon={<FiSmile size={20} />}
                      title="Mood"
                      value={log.mood}
                    />
                  </div>

                  {/* Notes */}
                  {log.notes && (
                    <div className="mt-6">
                      <Item
                        icon={<FiFileText size={20} />}
                        title="Notes"
                        value={log.notes}
                      />
                    </div>
                  )}

                  {/* AI Suggestion */}
                  {log.aiSuggestion && (
                    <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-100">
                      <h4 className="text-sm font-medium text-green-800 flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        AI Wellness Suggestion
                      </h4>
                      <p className="mt-2 text-sm text-green-700">
                        {log.aiSuggestion}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 🧩 Reusable Component for Icons + Info
function Item({ icon, title, value }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
        {icon}
      </div>
      <div className="ml-4">
        <dt className="text-sm font-medium text-gray-500">{title}</dt>
        <dd className="mt-1 text-lg font-semibold text-gray-900">{value}</dd>
      </div>
    </div>
  );
}
