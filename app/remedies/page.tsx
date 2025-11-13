'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Heart, Search, LogOut } from 'lucide-react';

export default function Remedies() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [selectedDisease, setSelectedDisease] = useState('');
  const [remedies, setRemedies] = useState<any[]>([]);
  const [allDiseases, setAllDiseases] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchDiseases();
  }, [router]);

  const fetchDiseases = async () => {
    try {
      const res = await fetch('/api/remedies');
      const data = await res.json();
      if (res.ok) {
        setAllDiseases(data.diseases);
      }
    } catch (error) {
      console.error('Error fetching diseases:', error);
    }
  };

  const fetchRemedies = async (disease: string) => {
    try {
      const res = await fetch(`/api/remedies?disease=${disease.toLowerCase()}`);
      const data = await res.json();
      if (res.ok) {
        setRemedies(data.remedies || []);
      }
    } catch (error) {
      console.error('Error fetching remedies:', error);
    }
  };

  const handleSearch = () => {
    if (selectedDisease) {
      fetchRemedies(selectedDisease);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return null;

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
              <Link href="/dashboard" className="hover:text-ayurveda-sand transition">Dashboard</Link>
              <Link href="/remedies" className="text-ayurveda-sand font-semibold">Remedies</Link>
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

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-ayurveda-olive mb-8 text-center">
            Ayurvedic Food Remedies
          </h1>

          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <Search className="w-6 h-6 text-ayurveda-olive mr-3" />
              <h2 className="text-2xl font-semibold text-ayurveda-earth">Find Remedies by Condition</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={selectedDisease}
                onChange={(e) => setSelectedDisease(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-sage focus:border-transparent"
              >
                <option value="">Select a health condition</option>
                {allDiseases.map((disease) => (
                  <option key={disease} value={disease}>
                    {disease.charAt(0).toUpperCase() + disease.slice(1)}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                disabled={!selectedDisease}
                className="px-8 py-3 bg-ayurveda-olive text-white rounded-lg font-semibold hover:bg-ayurveda-sage transition disabled:opacity-50"
              >
                Search
              </button>
            </div>

            {user.diseases && user.diseases.length > 0 && user.diseases[0] !== 'None' && (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3">Quick access to your conditions:</p>
                <div className="flex flex-wrap gap-2">
                  {user.diseases.map((disease: string) => (
                    <button
                      key={disease}
                      onClick={() => {
                        setSelectedDisease(disease.toLowerCase());
                        fetchRemedies(disease);
                      }}
                      className="px-4 py-2 bg-ayurveda-cream text-ayurveda-olive rounded-lg hover:bg-ayurveda-sage hover:text-white transition text-sm font-medium"
                    >
                      {disease}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Remedies Results */}
          {remedies.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ayurveda-olive">
                Remedies for {selectedDisease.charAt(0).toUpperCase() + selectedDisease.slice(1)}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remedies.map((remedy, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <div className="bg-ayurveda-sage w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-ayurveda-olive mb-3 text-center">
                      {remedy.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-ayurveda-cream p-3 rounded-lg">
                        <p className="text-sm font-semibold text-ayurveda-earth mb-1">Benefits:</p>
                        <p className="text-sm text-gray-700">{remedy.benefits}</p>
                      </div>
                      <div className="bg-ayurveda-cream p-3 rounded-lg">
                        <p className="text-sm font-semibold text-ayurveda-earth mb-1">Usage:</p>
                        <p className="text-sm text-gray-700">{remedy.usage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-gradient-to-br from-ayurveda-sage to-ayurveda-olive text-white rounded-xl p-6">
              <Leaf className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Natural Healing</h3>
              <p className="text-ayurveda-sand">
                Ayurvedic remedies use natural ingredients that have been trusted for thousands of years
                to promote holistic wellness.
              </p>
            </div>

            <div className="bg-gradient-to-br from-ayurveda-earth to-ayurveda-terracotta text-white rounded-xl p-6">
              <Heart className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Personalized Care</h3>
              <p className="text-ayurveda-sand">
                Each remedy is tailored to balance your unique constitution and address specific health concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
