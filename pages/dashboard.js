import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { 
  FiDroplet, 
  FiClock, 
  FiActivity, 
  FiTrendingUp, 
  FiHeart,
  FiSun,
  FiCoffee
} from 'react-icons/fi';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [logs, setLogs] = useState([]);
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    avgSleep: 0,
    avgWater: 0,
    goodDays: 0,
    streak: 0
  });

  // Fetch logs and calculate stats
  const fetchData = async () => {
    try {
      const res = await axios.get('/api/healthlog');
      setLogs(res.data);
      
      if (res.data.length > 0) {
        // Calculate averages
        const sleepSum = res.data.reduce((sum, log) => sum + (parseFloat(log.sleepHours) || 0), 0);
        const waterSum = res.data.reduce((sum, log) => sum + (parseFloat(log.waterIntake) || 0), 0);

        
        // Calculate good days (sleep >=7 and water >=2)
        const goodDaysCount = res.data.filter(log => 
          (parseFloat(log.sleepHours) >= 7) && 
          (parseFloat(log.waterIntake) >= 2)
        ).length;
        
        // Calculate current streak
        let streak = 0;
        const sortedLogs = [...res.data].sort((a, b) => new Date(b.date) - new Date(a.date));
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);
        
        if (sortedLogs[0].date === today || sortedLogs[0].date === yesterday) {
          streak = 1;
          for (let i = 1; i < sortedLogs.length; i++) {
            const prevDate = new Date(sortedLogs[i-1].date);
            const currDate = new Date(sortedLogs[i].date);
            if ((prevDate - currDate) === (24 * 60 * 60 * 1000)) {
              streak++;
            } else {
              break;
            }
          }
        }
        
        setStats({
          avgSleep: (sleepSum / res.data.length).toFixed(1),
          avgWater: (waterSum / res.data.length).toFixed(1),
          goodDays: goodDaysCount,
          streak: streak
        });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };


//   Suggestion Part
  const getSuggestion = async () => {
    setLoading(true);
    setSuggestion(""); 
    try {
      
      const today = new Date().toISOString().slice(0, 10);
      let targetLog = logs.find(log => log.date === today);
      
      if (!targetLog && logs.length > 0) {
       
        const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));
        targetLog = sortedLogs[0];
      }
      
      if (targetLog) {
        const res = await axios.post('/api/ai/suggestions', {
          sleepHours: targetLog.sleepHours,
          waterIntake: targetLog.waterIntake,
          meals: targetLog.meals,
          mood: targetLog.mood,
          notes: targetLog.notes,
        });
        setSuggestion(res.data.suggestion || "No specific suggestions today. Keep maintaining your health!");
      } else {
        setSuggestion("No health data available. Add your first log to get personalized suggestions!");
      }
    } catch (err) {
      console.error('AI Error:', err);
      setSuggestion("Couldn't connect to AI service. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);

  useEffect(() => {
    if (logs.length > 0) {
      getSuggestion();
    }
  }, [logs]);

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) return <div className="min-h-screen flex items-center justify-center">Please sign in to access dashboard.</div>;

  // Prepare chart data
  const last7Logs = [...logs]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7);

  const waterData = {
    labels: last7Logs.map(log => 
      new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'Water Intake (L)',
        data: last7Logs.map(log => parseFloat(log.waterIntake) || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const sleepData = {
    labels: last7Logs.map(log => 
      new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'Sleep Hours',
        data: last7Logs.map(log => parseFloat(log.sleepHours) || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const moodData = {
    labels: last7Logs.map(log => 
      new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'Mood Score',
        data: last7Logs.map(log => {
          if (!log.mood) return 5;
          if (log.mood.includes('Happy') || log.mood.includes('Excited')) return 9;
          if (log.mood.includes('Neutral')) return 6;
          if (log.mood.includes('Anxious') || log.mood.includes('Tired')) return 4;
          if (log.mood.includes('Angry')) return 2;
          return 5;
        }),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* AI Suggestion Card */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-md p-6 mb-8 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FiActivity className="text-blue-600" /> 
            Health Assistant Recommendation
          </h2>
          <button 
            onClick={getSuggestion}
            disabled={loading}
            className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full transition-colors"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">{suggestion || "Loading health suggestions..."}</p>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium">Avg. Sleep</h3>
            <FiClock className="text-blue-500 text-xl" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-800">{stats.avgSleep} <span className="text-sm text-gray-500">hours</span></p>
          <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium">Avg. Water</h3>
            <FiDroplet className="text-blue-500 text-xl" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-800">{stats.avgWater} <span className="text-sm text-gray-500">liters</span></p>
          <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium">Good Days</h3>
            <FiSun className="text-yellow-500 text-xl" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-800">{stats.goodDays} <span className="text-sm text-gray-500">days</span></p>
          <p className="text-sm text-gray-500 mt-1">Sleep ≥7h & Water ≥2L</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 font-medium">Current Streak</h3>
            <FiTrendingUp className="text-green-500 text-xl" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-800">{stats.streak} <span className="text-sm text-gray-500">days</span></p>
          <p className="text-sm text-gray-500 mt-1">Consecutive logging</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FiDroplet className="text-blue-500" /> Water Intake Trend
          </h3>
          <div className="h-64">
            <Bar 
              data={waterData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                      display: true,
                      text: 'Liters'
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FiClock className="text-purple-500" /> Sleep Hours Trend
          </h3>
          <div className="h-64">
            <Line 
              data={sleepData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 12,
                    title: {
                      display: true,
                      text: 'Hours'
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Mood Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <FiHeart className="text-orange-500" /> Mood Trend (Last 7 Days)
        </h3>
        <div className="h-64">
          <Line 
            data={moodData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                y: {
                  min: 0,
                  max: 10,
                  ticks: {
                    callback: function(value) {
                      if (value === 10) return '😊 Great';
                      if (value === 7.5) return '🙂 Good';
                      if (value === 5) return '😐 Neutral';
                      if (value === 2.5) return '😟 Low';
                      if (value === 0) return '😡 Poor';
                      return '';
                    }
                  }
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Recent Meals */}
      {logs.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FiCoffee className="text-amber-500" /> Recent Meals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...logs]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 3)
              .map(log => (
                <div key={log._id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    {new Date(log.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </h4>
                  <p className="text-gray-600">
                    {log.meals || 'No meals recorded'}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}