import React, { useState, useMemo } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ThumbsUpIcon, ThumbsDownIcon, SearchIcon, FilterIcon } from 'lucide-react';
import Fuse from 'fuse.js';
import { FAQItem } from '../types/help.types';
import toast from 'react-hot-toast';

export const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [votes, setVotes] = useState<Record<string, { helpful: number; notHelpful: number }>>({});

  // Mock FAQ data with Indian freelancer context
  const mockFAQs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create a professional profile that attracts Indian clients?',
      answer: 'To create an attractive profile for Indian clients: 1) Use a professional photo 2) Write in both English and Hindi if targeting local clients 3) Highlight relevant Indian market experience 4) Include certifications from recognized Indian institutions 5) Showcase work for Indian companies or similar cultural context 6) Set competitive rates in INR.',
      category: 'Getting Started',
      tags: ['profile', 'clients', 'india'],
      helpful_count: 89,
      not_helpful_count: 3,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: '2',
      question: 'What payment methods work best for Indian freelancers?',
      answer: 'LancerScape supports multiple payment methods suitable for Indian freelancers: UPI (instant transfers), NEFT/RTGS bank transfers, digital wallets (Paytm, PhonePe, GPay), and international payments through PayPal and Wise for global clients. All payments comply with RBI guidelines and FEMA regulations.',
      category: 'Payments',
      tags: ['payment', 'upi', 'bank', 'rbi'],
      helpful_count: 156,
      not_helpful_count: 8,
      created_at: '2024-01-02',
      updated_at: '2024-01-02'
    },
    {
      id: '3',
      question: 'How do I handle GST and tax compliance as a freelancer?',
      answer: 'For GST compliance: Register for GST if annual turnover exceeds ₹20 lakhs (₹10 lakhs for special category states). Maintain proper invoices, file monthly/quarterly returns, and claim input tax credit. For income tax: File ITR-3 or ITR-4, maintain books of accounts, and consider advance tax payments. Consult a CA for personalized advice.',
      category: 'Tax & Legal',
      tags: ['gst', 'tax', 'compliance', 'itr'],
      helpful_count: 234,
      not_helpful_count: 12,
      created_at: '2024-01-03',
      updated_at: '2024-01-03'
    },
    {
      id: '4',
      question: 'How can I verify my identity and skills on LancerScape?',
      answer: 'Complete verification by uploading: 1) Aadhaar card or PAN card for identity 2) Educational certificates or skill certifications 3) Portfolio samples and previous work 4) Bank account verification for payments. Skill tests are available for programming, design, writing, and digital marketing.',
      category: 'Verification',
      tags: ['verification', 'aadhaar', 'skills', 'portfolio'],
      helpful_count: 67,
      not_helpful_count: 5,
      created_at: '2024-01-04',
      updated_at: '2024-01-04'
    },
    {
      id: '5',
      question: 'What are the best practices for pricing in the Indian market?',
      answer: 'Research market rates in India, consider your experience level, factor in taxes and platform fees, offer competitive rates for local clients, premium rates for international projects. Start with lower rates to build reviews, then gradually increase. Consider project complexity and timeline when quoting.',
      category: 'Pricing',
      tags: ['pricing', 'rates', 'market', 'strategy'],
      helpful_count: 145,
      not_helpful_count: 18,
      created_at: '2024-01-05',
      updated_at: '2024-01-05'
    },
    {
      id: '6',
      question: 'How do I handle disputes with clients professionally?',
      answer: 'For dispute resolution: 1) Communicate professionally and document everything 2) Use LancerScape\'s built-in mediation service 3) Provide evidence like work samples, communications, and agreements 4) Be open to compromise and find win-win solutions 5) If needed, escalate to our support team for assistance.',
      category: 'Disputes',
      tags: ['disputes', 'clients', 'resolution', 'mediation'],
      helpful_count: 78,
      not_helpful_count: 9,
      created_at: '2024-01-06',
      updated_at: '2024-01-06'
    }
  ];

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(mockFAQs, {
      keys: ['question', 'answer', 'tags'],
      threshold: 0.3
    });
  }, []);

  // Filter and search FAQs
  const filteredFAQs = useMemo(() => {
    let faqs = mockFAQs;

    // Filter by category
    if (selectedCategory !== 'all') {
      faqs = faqs.filter((faq) => faq.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm && fuse) {
      const searchResults = fuse.search(searchTerm);
      faqs = searchResults.map(result => result.item);
    }

    return faqs;
  }, [selectedCategory, searchTerm, fuse]);

  const categories = [
    'all',
    ...Array.from(new Set(mockFAQs.map((faq) => faq.category)))
  ];

  const handleVote = (faqId: string, helpful: boolean) => {
    setVotes(prev => ({
      ...prev,
      [faqId]: {
        helpful: (prev[faqId]?.helpful || 0) + (helpful ? 1 : 0),
        notHelpful: (prev[faqId]?.notHelpful || 0) + (helpful ? 0 : 1)
      }
    }));
    
    toast.success(helpful ? 'Thanks for your feedback!' : 'Thanks, we\'ll improve this answer');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-lg">
          Find answers to common questions about freelancing in India
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{filteredFAQs.length} questions found</span>
          <span>•</span>
          <span>Updated for Indian freelancers</span>
          <span>•</span>
          <span>Covers tax, payments, and local regulations</span>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <Disclosure key={faq.id} as="div" className="bg-white rounded-lg shadow-md">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-inset hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                        {faq.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {faq.helpful_count + (votes[faq.id]?.helpful || 0)} found helpful
                      </span>
                    </div>
                  </div>
                  <ChevronDownIcon
                    className={`${open ? 'rotate-180' : ''} w-5 h-5 text-gray-500 transform transition-transform ml-4`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 pb-6">
                  <div className="text-gray-700 leading-relaxed mb-6 text-base">
                    {faq.answer}
                  </div>

                  {/* Tags */}
                  {faq.tags && faq.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {faq.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Voting */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Was this helpful?</span>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleVote(faq.id, true)}
                        className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                      >
                        <ThumbsUpIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {faq.helpful_count + (votes[faq.id]?.helpful || 0)}
                        </span>
                      </button>
                      <button
                        onClick={() => handleVote(faq.id, false)}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                      >
                        <ThumbsDownIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {faq.not_helpful_count + (votes[faq.id]?.notHelpful || 0)}
                        </span>
                      </button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>

      {/* No Results */}
      {filteredFAQs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No FAQs found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or browse all categories
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="bg-yellow-500 text-black px-6 py-2 rounded-md hover:bg-yellow-600 font-medium transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Contact Support CTA */}
      <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-8 text-center border border-yellow-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Still need help?
        </h3>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Our India-based support team is ready to assist you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/help/contact"
            className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-md hover:bg-yellow-600 font-medium transition-colors"
          >
            Contact Support
          </a>
          <a
            href="/help/articles"
            className="inline-block bg-white text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 font-medium border border-gray-300 transition-colors"
          >
            Browse Articles
          </a>
        </div>
      </div>
    </div>
  );
};