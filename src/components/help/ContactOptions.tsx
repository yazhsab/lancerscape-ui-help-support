import React from 'react';
import { PhoneIcon, MailIcon, MessageCircleIcon, ClockIcon } from 'lucide-react';

export const ContactOptions: React.FC = () => {
  const contactMethods = [
    {
      icon: MessageCircleIcon,
      title: 'Support Tickets',
      description: 'Create a ticket for detailed assistance',
      availability: '24/7 Response',
      action: 'Create Ticket',
      href: '/help/contact',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      availability: 'Mon-Fri, 9 AM - 6 PM IST',
      action: '+91-8000-123-456',
      href: 'tel:+918000123456',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MailIcon,
      title: 'Email Support',
      description: 'Send us your questions via email',
      availability: '24-48 hour response',
      action: 'support@lancerscape.com',
      href: 'mailto:support@lancerscape.com',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Our Support Team</h2>
        <p className="text-gray-600">
          Choose the best way to get in touch with us. We're here to help Indian freelancers succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method) => {
          const IconComponent = method.icon;
          return (
            <div key={method.title} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <IconComponent className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-3">{method.description}</p>
              <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                <ClockIcon className="w-4 h-4 mr-1" />
                {method.availability}
              </div>
              <a
                href={method.href}
                className="inline-block bg-yellow-500 text-black px-6 py-2 rounded-md hover:bg-yellow-600 font-medium transition-colors"
              >
                {method.action}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};