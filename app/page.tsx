'use client';

import Link from 'next/link';
import { Leaf, Heart, Book, Sparkles } from 'lucide-react';

export default function Home() {
  const featuredFoods = [
    { name: 'Turmeric', benefit: 'Anti-inflammatory', dosha: 'Balances all doshas' },
    { name: 'Ashwagandha', benefit: 'Stress relief', dosha: 'Vata & Kapha' },
    { name: 'Triphala', benefit: 'Digestive health', dosha: 'All doshas' },
    { name: 'Ginger', benefit: 'Immunity boost', dosha: 'Kapha & Vata' },
  ];

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
              <Link href="/remedies" className="hover:text-ayurveda-sand transition">Remedies</Link>
              <Link href="/chatbot" className="hover:text-ayurveda-sand transition">Chatbot</Link>
            </div>
            <div className="space-x-4">
              <Link href="/login" className="bg-ayurveda-terracotta px-6 py-2 rounded-lg hover:bg-ayurveda-earth transition">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ayurveda-sage to-ayurveda-olive text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Ancient Foods for Modern Health
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Harness 5000 years of Ayurvedic wisdom to personalize your wellness journey
          </p>
          <Link href="/signup" className="bg-ayurveda-terracotta text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-ayurveda-earth transition inline-block">
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-ayurveda-olive mb-12 text-center">Featured Ayurvedic Foods</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredFoods.map((food, idx) => (
              <div key={idx} className="bg-ayurveda-cream rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="bg-ayurveda-sage w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-ayurveda-olive mb-2 text-center">{food.name}</h3>
                <p className="text-ayurveda-earth mb-2 text-center">{food.benefit}</p>
                <p className="text-sm text-gray-600 text-center italic">{food.dosha}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remedy of the Day */}
      <section className="py-16 bg-ayurveda-sand">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center mb-6">
              <Sparkles className="w-8 h-8 text-ayurveda-terracotta mr-3" />
              <h2 className="text-3xl font-bold text-ayurveda-olive">Remedy of the Day</h2>
            </div>
            <h3 className="text-2xl font-semibold text-ayurveda-earth mb-4">Golden Milk (Haldi Doodh)</h3>
            <p className="text-gray-700 mb-4">
              A soothing ancient beverage combining turmeric, milk, and warming spices. Perfect for inflammation, immunity, and restful sleep.
            </p>
            <div className="bg-ayurveda-cream p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Ingredients:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>1 cup milk (dairy or plant-based)</li>
                <li>1 tsp turmeric powder</li>
                <li>1/2 tsp cinnamon</li>
                <li>Pinch of black pepper</li>
                <li>Honey to taste</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Ayurveda */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Book className="w-16 h-16 text-ayurveda-olive mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-ayurveda-olive mb-6">About Ayurveda</h2>
            <p className="text-lg text-gray-700 mb-6">
              Ayurveda, the "Science of Life," is a 5,000-year-old holistic healing system from India.
              It emphasizes balance between body, mind, and spirit through personalized nutrition, herbs,
              and lifestyle practices based on your unique constitution (dosha).
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-ayurveda-cream rounded-lg p-6">
                <Heart className="w-12 h-12 text-ayurveda-terracotta mx-auto mb-4" />
                <h3 className="text-xl font-bold text-ayurveda-olive mb-2">Vata</h3>
                <p className="text-gray-600">Air & Space • Creative & Energetic</p>
              </div>
              <div className="bg-ayurveda-cream rounded-lg p-6">
                <Heart className="w-12 h-12 text-ayurveda-terracotta mx-auto mb-4" />
                <h3 className="text-xl font-bold text-ayurveda-olive mb-2">Pitta</h3>
                <p className="text-gray-600">Fire & Water • Ambitious & Sharp</p>
              </div>
              <div className="bg-ayurveda-cream rounded-lg p-6">
                <Heart className="w-12 h-12 text-ayurveda-terracotta mx-auto mb-4" />
                <h3 className="text-xl font-bold text-ayurveda-olive mb-2">Kapha</h3>
                <p className="text-gray-600">Earth & Water • Calm & Grounded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ayurveda-olive text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-6 h-6" />
                <span className="text-xl font-bold">AnnapurnaAI</span>
              </div>
              <p className="text-ayurveda-sand">Ancient wisdom for modern wellness</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-ayurveda-sand hover:text-white">About Us</Link></li>
                <li><Link href="/remedies" className="text-ayurveda-sand hover:text-white">Remedies</Link></li>
                <li><Link href="/blog" className="text-ayurveda-sand hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-ayurveda-sand">support@annapurnaai.com</p>
              <p className="text-ayurveda-sand">© 2024 AnnapurnaAI</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
