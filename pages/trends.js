import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Trends() {
  const { data: session, status } = useSession();
  const [logs, setLogs] = useState([]);
  const [timeRange, setTimeRange] = useState("week"); // 'week', 'month', or 'all'

  useEffect(() => {
    if (status === "authenticated") {
      fetchLogs();
    }
  }, [status, timeRange]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("/api/healthlog");
      let filteredLogs = [...res.data].sort((a, b) => new Date(a.date) - new Date(b.date));

      const now = new Date();
      if (timeRange === "week") {
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        filteredLogs = filteredLogs.filter(log => new Date(log.date) >= oneWeekAgo);
      } else if (timeRange === "month") {
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        filteredLogs = filteredLogs.filter(log => new Date(log.date) >= oneMonthAgo);
      }

      setLogs(filteredLogs);
    } catch (err) {
      console.error("Error fetching logs", err);
    }
  };

  if (status === "loading")
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (logs.length === 0)
    return <div className="min-h-screen flex items-center justify-center">No data available for the selected time range.</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (timeRange === "week") {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getMoodScore = (mood) => {
    if (!mood) return 3;
    if (typeof mood === 'string') {
      if (mood.includes('Happy') || mood.includes('Excited')) return 5;
      if (mood.includes('Good')) return 4;
      if (mood.includes('Neutral')) return 3;
      if (mood.includes('Anxious') || mood.includes('Tired')) return 2;
      if (mood.includes('Bad') || mood.includes('Angry')) return 1;
    }
    return 3;
  };

  const chartData = {
    labels: logs.map(log => formatDate(log.date)),
    datasets: [
      {
        label: "Sleep Hours",
        data: logs.map(log => parseFloat(log.sleepHours) || 0),
        backgroundColor: "#6366F1",
      },
      {
        label: "Water Intake (L)",
        data: logs.map(log => parseFloat(log.waterIntake) || 0),
        backgroundColor: "#10B981",
      },
      {
        label: "Mood Score",
        data: logs.map(log => getMoodScore(log.mood)),
        backgroundColor: "#F59E0B",
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            if (label === 'Mood Score') {
              const score = context.raw;
              let moodText = '';
              if (score >= 4.5) moodText = ' (Excellent)';
              else if (score >= 3.5) moodText = ' (Good)';
              else if (score >= 2.5) moodText = ' (Neutral)';
              else if (score >= 1.5) moodText = ' (Low)';
              else moodText = ' (Poor)';
              return label + ': ' + score + moodText;
            }
            return label + ': ' + context.raw;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
        }
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Health Trends Overview</h1>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setTimeRange("week")}
            className={`px-3 py-1 text-sm rounded-full ${timeRange === "week" ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
          >
            Last Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1 text-sm rounded-full ${timeRange === "month" ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
          >
            Last Month
          </button>
          <button
            onClick={() => setTimeRange("all")}
            className={`px-3 py-1 text-sm rounded-full ${timeRange === "all" ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="h-[500px]">
          <Bar data={chartData} options={options} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Sleep Summary</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {(logs.reduce((sum, log) => sum + (parseFloat(log.sleepHours) || 0), 0) / logs.length || 0).toFixed(1)} hrs avg
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Hydration Summary</h3>
          <p className="text-2xl font-bold text-emerald-600">
            {(logs.reduce((sum, log) => sum + (parseFloat(log.waterIntake) || 0), 0) / logs.length || 0).toFixed(1)} L avg
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Mood Summary</h3>
          <p className="text-2xl font-bold text-amber-600">
            {(logs.reduce((sum, log) => sum + getMoodScore(log.mood), 0) / logs.length || 0).toFixed(1)} avg
          </p>
        </div>
      </div>
    </div>
  );
}
