import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FiClock, FiDroplet, FiCoffee, FiSmile, FiFileText, FiCalendar } from "react-icons/fi";

export default function History() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState([]);
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
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setIsLoading(false);
    }
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

        {logs.length === 0 ? (
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
            <h3 className="text-lg font-medium text-gray-900">No entries yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start tracking your health to see your history here.
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
            {logs.map((log) => (
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
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <FiClock size={20} />
                      </div>
                      <div className="ml-4">
                        <dt className="text-sm font-medium text-gray-500">
                          Sleep Hours
                        </dt>
                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                          {log.sleepHours} hours
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <FiDroplet size={20} />
                      </div>
                      <div className="ml-4">
                        <dt className="text-sm font-medium text-gray-500">
                          Water Intake
                        </dt>
                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                          {log.waterIntake} liters
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <FiCoffee size={20} />
                      </div>
                      <div className="ml-4">
                        <dt className="text-sm font-medium text-gray-500">
                          Meals
                        </dt>
                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                          {log.meals}
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <FiSmile size={20} />
                      </div>
                      <div className="ml-4">
                        <dt className="text-sm font-medium text-gray-500">
                          Mood
                        </dt>
                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                          {log.mood}
                        </dd>
                      </div>
                    </div>
                  </div>

                  {log.notes && (
                    <div className="mt-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                          <FiFileText size={20} />
                        </div>
                        <div className="ml-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Notes
                          </dt>
                          <dd className="mt-1 text-gray-700">
                            {log.notes}
                          </dd>
                        </div>
                      </div>
                    </div>
                  )}

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