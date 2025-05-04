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
  FiSearch,
  FiDownload,
} from "react-icons/fi";
import Papa from "papaparse";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function History() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
    const filtered = logs.filter(
      (log) =>
        log.mood?.toLowerCase().includes(query) ||
        log.notes?.toLowerCase().includes(query)
    );
    setFilteredLogs(filtered);
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(
      filteredLogs.map(({ date, mood, sleepHours, waterIntake, meals, notes, aiSuggestion }) => ({
        Date: new Date(date).toLocaleDateString(),
        Mood: mood,
        "Sleep Hours": sleepHours,
        "Water Intake (L)": waterIntake,
        Meals: meals,
        Notes: notes || "",
        "AI Suggestion": aiSuggestion || "",
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "health_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const input = document.getElementById("log-container");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("health_logs.pdf");
    });
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
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Health Journal History
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Review your wellness journey over time
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search by mood or notes..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          <div className="flex gap-4">
            <button
              onClick={exportToCSV}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <FiDownload className="mr-2" />
              Export CSV
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <FiDownload className="mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Logs */}
        <div id="log-container">
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
              <h3 className="text-lg font-medium text-gray-900">No entries found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search query or create a new log.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => router.push("/log")}
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
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
                  className="bg-white shadow rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
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
                      <DataBlock icon={<FiClock />} label="Sleep Hours" value={`${log.sleepHours} hours`} />
                      <DataBlock icon={<FiDroplet />} label="Water Intake" value={`${log.waterIntake} liters`} />
                      <DataBlock icon={<FiCoffee />} label="Meals" value={log.meals} />
                      <DataBlock icon={<FiSmile />} label="Mood" value={log.mood} />
                    </div>

                    {log.notes && (
                      <div className="mt-6">
                        <DataBlock icon={<FiFileText />} label="Notes" value={log.notes} />
                      </div>
                    )}

                    {log.aiSuggestion && (
                      <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-100">
                        <h4 className="text-sm font-medium text-green-800 flex items-center">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          AI Wellness Suggestion
                        </h4>
                        <p className="mt-2 text-sm text-green-700">{log.aiSuggestion}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const DataBlock = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
      {icon}
    </div>
    <div className="ml-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-gray-900">{value}</dd>
    </div>
  </div>
);
