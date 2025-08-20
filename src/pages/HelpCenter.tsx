import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { SearchIcon, BookOpenIcon, MessageCircleIcon, FileTextIcon, HeadphonesIcon } from 'lucide-react';
import { FAQSection } from '../components/help/FAQSection';
import { PopularArticles } from '../components/help/PopularArticles';
import { ContactOptions } from '../components/help/ContactOptions';

export const HelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockFAQs = [
    {
      id: '1',
      question: 'How do I create a professional profile on LancerScape?',
      answer: 'To create a professional profile, go to your dashboard and fill out all sections including your skills, experience, portfolio, and certifications. Make sure to add a professional photo and write a compelling bio.',
      category: 'Getting Started',
      tags: ['profile', 'setup'],
      helpful_count: 45,
      not_helpful_count: 2,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: '2',
      question: 'What are the payment methods available for Indian freelancers?',
      answer: 'LancerScape supports UPI, bank transfers, digital wallets like Paytm and PhonePe, and international payments through PayPal and Wise for global clients.',
      category: 'Payments',
      tags: ['payment', 'india', 'upi'],
      helpful_count: 38,
      not_helpful_count: 1,
      created_at: '2024-01-02',
      updated_at: '2024-01-02'
    }
  ];

  const mockArticles = [
    {
      id: '1',
      title: 'Complete Guide to Freelancing Success in India',
      content: 'This comprehensive guide covers everything you need to know about building a successful freelancing career in India...',
      category: 'Getting Started',
      tags: ['freelancing', 'success', 'india'],
      author: 'Priya Sharma',
      views: 1250,
      helpful_count: 89,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: '2',
      title: 'Tax Guidelines for Indian Freelancers',
      content: 'Understanding tax obligations and benefits for freelancers in India...',
      category: 'Legal & Tax',
      tags: ['tax', 'legal', 'compliance'],
      author: 'CA Rahul Gupta',
      views: 980,
      helpful_count: 67,
      created_at: '2024-01-05',
      updated_at: '2024-01-05'
    }
  ];

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;
    console.log('Searching for:', term);
    // In a real app, this would call the API
  };

  const quickAccessCards = [
    {
      icon: BookOpenIcon,
      title: 'Knowledge Base',
      description: 'Browse detailed guides and tutorials for Indian freelancers',
      href: '/help/articles',
      color: 'bg-blue-100 text-blue-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      icon: MessageCircleIcon,
      title: 'Contact Support',
      description: 'Get help from our India-based support team',
      href: '/help/contact',
      color: 'bg-green-100 text-green-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: FileTextIcon,
      title: 'FAQs',
      description: 'Find answers to common questions about LancerScape',
      href: '/help/faq',
      color: 'bg-purple-100 text-purple-600',
      bgGradient: 'from-purple-50 to-pink-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <HeadphonesIcon className="w-12 h-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold">LancerScape Help Center</h1>
          </div>
          <p className="text-xl mb-8 opacity-90">
            Everything you need to succeed as a freelancer in India
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for help articles, guides, and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
              className="w-full px-6 py-4 pr-12 rounded-lg text-gray-900 text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
            />
            <button
              onClick={() => handleSearch(searchTerm)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <SearchIcon className="w-6 h-6" />
            </button>
          </div>

          <p className="text-sm mt-4 opacity-75">
            🇮🇳 Designed specifically for Indian freelancers
          </p>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickAccessCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{card.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {card.description}
                </p>
                <a
                  href={card.href}
                  className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                >
                  Explore →
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FAQSection faqs={mockFAQs} />
          <PopularArticles articles={mockArticles} />
        </div>
        
        <ContactOptions />
      </div>

      {/* Trust Indicators */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Freelancers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">₹500Cr+</div>
              <div className="text-gray-600">Payments Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Support Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};