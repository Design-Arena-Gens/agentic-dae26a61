'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Send, Bot, User, LogOut } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Namaste! I am your Ayurvedic wellness assistant. How can I help you today? You can ask me about foods, remedies, doshas, or general health advice.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes('vata')) {
      return 'Vata dosha is associated with air and space elements. People with Vata dominance benefit from warm, grounding foods like cooked vegetables, whole grains, and warming spices like ginger and cinnamon. Avoid cold, raw, and dry foods.';
    } else if (lowerMsg.includes('pitta')) {
      return 'Pitta dosha is linked to fire and water elements. Pitta types should favor cooling foods like cucumber, coconut, sweet fruits, and mint. Avoid spicy, acidic, and fried foods that can aggravate Pitta.';
    } else if (lowerMsg.includes('kapha')) {
      return 'Kapha dosha combines earth and water elements. Kapha individuals thrive on light, dry, and warming foods like legumes, leafy greens, and spices like turmeric and black pepper. Minimize heavy, oily, and sweet foods.';
    } else if (lowerMsg.includes('turmeric') || lowerMsg.includes('haldi')) {
      return 'Turmeric (Haldi) is a powerful anti-inflammatory spice. It supports joint health, boosts immunity, and aids digestion. Try Golden Milk: 1 tsp turmeric in warm milk with honey and a pinch of black pepper for better absorption.';
    } else if (lowerMsg.includes('ginger') || lowerMsg.includes('adrak')) {
      return 'Ginger is excellent for digestion, nausea, and inflammation. It kindles digestive fire (Agni) and helps with respiratory issues. Consume fresh ginger tea or add it to meals daily.';
    } else if (lowerMsg.includes('diabetes')) {
      return 'For diabetes management, Ayurveda recommends bitter gourd juice, fenugreek seeds, and cinnamon. These help regulate blood sugar naturally. Always consult your healthcare provider before making dietary changes.';
    } else if (lowerMsg.includes('weight loss') || lowerMsg.includes('obesity')) {
      return 'For healthy weight management, try Triphala before bed, drink warm lemon water in the morning, include plenty of fiber-rich foods, and practice mindful eating. Regular yoga and walking are also beneficial.';
    } else if (lowerMsg.includes('sleep') || lowerMsg.includes('insomnia')) {
      return 'For better sleep, drink warm milk with a pinch of nutmeg before bed, practice oil massage (Abhyanga), avoid screens 1 hour before sleep, and try Ashwagandha or Jatamansi herbs.';
    } else if (lowerMsg.includes('stress') || lowerMsg.includes('anxiety')) {
      return 'To manage stress naturally, consider Ashwagandha (adaptogen), Brahmi for mental clarity, and regular meditation. Practice deep breathing (Pranayama) and maintain a consistent daily routine.';
    } else if (lowerMsg.includes('digestion') || lowerMsg.includes('gut')) {
      return 'For digestive health, drink warm water throughout the day, include digestive spices like cumin, coriander, and fennel in meals. Triphala is excellent for overall gut health. Eat mindfully without distractions.';
    } else if (lowerMsg.includes('immunity') || lowerMsg.includes('immune')) {
      return 'Boost immunity with Chyawanprash (herbal jam), turmeric milk, Tulsi (holy basil) tea, and Amla (Indian gooseberry). Get adequate sleep, manage stress, and include garlic and ginger in your diet.';
    } else if (lowerMsg.includes('dosha')) {
      return 'There are three doshas in Ayurveda: Vata (air/space), Pitta (fire/water), and Kapha (earth/water). Each person has a unique combination. Understanding your dosha helps personalize your diet and lifestyle for optimal health.';
    } else if (lowerMsg.includes('thank')) {
      return 'You\'re most welcome! May you enjoy good health and wellness. Feel free to ask me anything else about Ayurveda. 🙏';
    } else {
      return 'Thank you for your question! For personalized Ayurvedic guidance, I recommend: 1) Understanding your dosha constitution, 2) Following seasonal eating practices (Ritucharya), 3) Maintaining regular meal times, and 4) Including the six tastes (sweet, sour, salty, pungent, bitter, astringent) in your meals. What specific aspect of Ayurveda interests you?';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: getAIResponse(input),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-ayurveda-cream flex flex-col">
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
              <Link href="/chatbot" className="text-ayurveda-sand font-semibold">Chatbot</Link>
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

      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl flex flex-col">
        <div className="bg-white rounded-t-2xl shadow-lg p-6 mb-0">
          <div className="flex items-center space-x-3">
            <Bot className="w-10 h-10 text-ayurveda-olive" />
            <div>
              <h1 className="text-2xl font-bold text-ayurveda-olive">Ayurvedic Wellness Assistant</h1>
              <p className="text-sm text-gray-600">Ask me about foods, remedies, and wellness tips</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-white shadow-lg p-6 overflow-y-auto" style={{ maxHeight: '500px' }}>
          <div className="space-y-6">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%]`}>
                  {message.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-ayurveda-sage flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-ayurveda-olive text-white'
                        : 'bg-ayurveda-cream text-gray-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-ayurveda-terracotta flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-ayurveda-sage flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-ayurveda-cream">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-ayurveda-olive rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-ayurveda-olive rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-ayurveda-olive rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about foods, remedies, doshas..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayurveda-sage focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-ayurveda-olive text-white rounded-lg font-semibold hover:bg-ayurveda-sage transition disabled:opacity-50 flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setInput('Tell me about Vata dosha')}
              className="px-4 py-2 bg-ayurveda-cream text-ayurveda-olive rounded-lg text-sm hover:bg-ayurveda-sage hover:text-white transition"
            >
              Vata Dosha
            </button>
            <button
              onClick={() => setInput('What are benefits of turmeric?')}
              className="px-4 py-2 bg-ayurveda-cream text-ayurveda-olive rounded-lg text-sm hover:bg-ayurveda-sage hover:text-white transition"
            >
              Turmeric Benefits
            </button>
            <button
              onClick={() => setInput('How to improve digestion?')}
              className="px-4 py-2 bg-ayurveda-cream text-ayurveda-olive rounded-lg text-sm hover:bg-ayurveda-sage hover:text-white transition"
            >
              Digestion Tips
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
