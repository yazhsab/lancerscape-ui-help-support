import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import { FAQItem } from '../../types/help.types';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const popularFAQs = faqs.slice(0, 5);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular FAQs</h2>
      <div className="space-y-4">
        {popularFAQs.map((faq) => (
          <Disclosure key={faq.id} as="div" className="bg-white rounded-lg shadow-md">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-inset">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDownIcon
                    className={`${open ? 'rotate-180' : ''} w-5 h-5 text-gray-500 transform transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 pb-6">
                  <div className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
      <div className="mt-6">
        <a
          href="/help/faq"
          className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-md hover:bg-yellow-600 font-medium transition-colors"
        >
          View All FAQs
        </a>
      </div>
    </div>
  );
};