'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';

export default function ProfileSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    activityLevel: '',
    diseases: [] as string[],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const diseaseOptions = [
    'Diabetes', 'Hypertension', 'Arthritis', 'Obesity', 'Asthma',
    'Anxiety', 'Thyroid', 'Heart Disease', 'None'
  ];

  const handleDiseaseToggle = (disease: string) => {
    if (disease === 'None') {
      setFormData({ ...formData, diseases: ['None'] });
    } else {
      const filtered = formData.diseases.filter(d => d !== 'None');
      if (filtered.includes(disease)) {
        setFormData({ ...formData, diseases: filtered.filter(d => d !== disease) });
      } else {
        setFormData({ ...formData, diseases: [...filtered, disease] });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          activityLevel: formData.activityLevel,
          diseases: formData.diseases,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Profile update failed');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ayurveda-cream to-ayurveda-sand flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-center mb-8">
          <Leaf className="w-12 h-12 text-ayurveda-olive mr-3" />
          <h1 className="text-3xl font-bold text-ayurveda-olive">Complete Your Profile</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-sage focus:border-transparent"
                placeholder="170"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-sage focus:border-transparent"
                placeholder="70"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              required
              value={formData.activityLevel}
              onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-sage focus:border-transparent"
            >
              <option value="">Select Activity Level</option>
              <option value="sedentary">Sedentary (little/no exercise)</option>
              <option value="light">Light (1-3 days/week)</option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
              <option value="very-active">Very Active (athlete)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Health Conditions (select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {diseaseOptions.map((disease) => (
                <label
                  key={disease}
                  className={`flex items-center px-4 py-3 rounded-lg border-2 cursor-pointer transition ${
                    formData.diseases.includes(disease)
                      ? 'border-ayurveda-olive bg-ayurveda-sage text-white'
                      : 'border-gray-300 hover:border-ayurveda-sage'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.diseases.includes(disease)}
                    onChange={() => handleDiseaseToggle(disease)}
                    className="hidden"
                  />
                  <span className="text-sm font-medium">{disease}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ayurveda-olive text-white py-3 rounded-lg font-semibold hover:bg-ayurveda-sage transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  );
}
