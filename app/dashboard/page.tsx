'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Leaf, Heart, Droplets, Flame, Moon, Plus,
  TrendingUp, Activity, LogOut, Menu, X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [healthLogs, setHealthLogs] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    waterIntake: '',
    calories: '',
    sleep: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchHealthLogs(token);
  }, [router]);

  const fetchHealthLogs = async (token: string) => {
    try {
      const res = await fetch('/api/health/log', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setHealthLogs(data.logs);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/health/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: newLog.date,
          weight: parseFloat(newLog.weight),
          waterIntake: parseFloat(newLog.waterIntake),
          calories: parseFloat(newLog.calories),
          sleep: parseFloat(newLog.sleep),
        }),
      });

      if (res.ok) {
        setShowModal(false);
        setNewLog({
          date: new Date().toISOString().split('T')[0],
          weight: '',
          waterIntake: '',
          calories: '',
          sleep: '',
        });
        fetchHealthLogs(token!);
      }
    } catch (error) {
      console.error('Error adding log:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return null;

  const latestLog = healthLogs[0] || {
    weight: user.weight || 70,
    waterIntake: 2,
    calories: 2000,
    sleep: 7,
  };

  const healthScore = Math.min(100, Math.round(
    (latestLog.waterIntake / 3 * 30) +
    (latestLog.sleep / 8 * 30) +
    (latestLog.calories > 1500 && latestLog.calories < 2500 ? 40 : 20)
  ));

  const chartData = healthLogs.slice(0, 7).reverse().map((log, idx) => ({
    day: `Day ${idx + 1}`,
    weight: log.weight,
    calories: log.calories,
  }));

  return (
    <div className="min-h-screen bg-ayurveda-cream">
      {/* Navbar */}
      <nav className="bg-ayurveda-olive text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8" />
              <span className="text-2xl font-bold">AnnapurnaAI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-ayurveda-sand transition">Home</Link>
              <Link href="/dashboard" className="text-ayurveda-sand font-semibold">Dashboard</Link>
              <Link href="/remedies" className="hover:text-ayurveda-sand transition">Remedies</Link>
              <Link href="/chatbot" className="hover:text-ayurveda-sand transition">Chatbot</Link>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-ayurveda-terracotta px-4 py-2 rounded-lg hover:bg-ayurveda-earth transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block bg-white w-64 min-h-screen shadow-lg`}>
          <div className="p-6">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-ayurveda-sage rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name[0].toUpperCase()}
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-ayurveda-olive">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-4">
              <Link href="/dashboard" className="flex items-center space-x-3 text-ayurveda-olive font-semibold bg-ayurveda-cream px-4 py-3 rounded-lg">
                <Activity className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="/remedies" className="flex items-center space-x-3 text-gray-700 hover:bg-ayurveda-cream px-4 py-3 rounded-lg transition">
                <Heart className="w-5 h-5" />
                <span>Remedies</span>
              </Link>
              <Link href="/chatbot" className="flex items-center space-x-3 text-gray-700 hover:bg-ayurveda-cream px-4 py-3 rounded-lg transition">
                <Leaf className="w-5 h-5" />
                <span>AI Chatbot</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-ayurveda-olive">
                Welcome back, {user.name.split(' ')[0]}!
              </h1>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 bg-ayurveda-olive text-white px-6 py-3 rounded-lg hover:bg-ayurveda-sage transition"
              >
                <Plus className="w-5 h-5" />
                <span>Add Today's Stats</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Heart className="w-10 h-10 text-ayurveda-terracotta" />
                  <span className="text-3xl font-bold text-ayurveda-olive">{healthScore}</span>
                </div>
                <h3 className="text-gray-600 font-medium">Health Score</h3>
                <p className="text-sm text-gray-500 mt-2">Overall wellness rating</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Droplets className="w-10 h-10 text-blue-500" />
                  <span className="text-3xl font-bold text-ayurveda-olive">{latestLog.waterIntake}L</span>
                </div>
                <h3 className="text-gray-600 font-medium">Water Intake</h3>
                <p className="text-sm text-gray-500 mt-2">Daily hydration</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Flame className="w-10 h-10 text-orange-500" />
                  <span className="text-3xl font-bold text-ayurveda-olive">{latestLog.calories}</span>
                </div>
                <h3 className="text-gray-600 font-medium">Calories</h3>
                <p className="text-sm text-gray-500 mt-2">Energy intake</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Moon className="w-10 h-10 text-indigo-500" />
                  <span className="text-3xl font-bold text-ayurveda-olive">{latestLog.sleep}h</span>
                </div>
                <h3 className="text-gray-600 font-medium">Sleep</h3>
                <p className="text-sm text-gray-500 mt-2">Rest duration</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-ayurveda-olive mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Weight Trend
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#8B9D83" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-ayurveda-olive mb-4 flex items-center">
                  <Flame className="w-5 h-5 mr-2" />
                  Calorie Trend
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calories" stroke="#C96D4A" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Stats Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-ayurveda-olive">Add Today's Stats</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  required
                  value={newLog.date}
                  onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-sage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newLog.weight}
                  onChange={(e) => setNewLog({ ...newLog, weight: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-sage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Water Intake (L)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newLog.waterIntake}
                  onChange={(e) => setNewLog({ ...newLog, waterIntake: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-sage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                <input
                  type="number"
                  required
                  value={newLog.calories}
                  onChange={(e) => setNewLog({ ...newLog, calories: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-sage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sleep (hours)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newLog.sleep}
                  onChange={(e) => setNewLog({ ...newLog, sleep: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-sage"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-ayurveda-olive text-white py-3 rounded-lg font-semibold hover:bg-ayurveda-sage transition"
              >
                Add Stats
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
