import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../contexts/AuthContext';
import { FileDropzone } from '../components/ui/FileDropzone';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, AlertCircleIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const contactSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string().min(1, 'Please select a category')
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactSupport: React.FC = () => {
  const { user } = useAuth();
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      priority: 'medium'
    }
  });

  const priorityOptions = [
    { 
      value: 'low', 
      label: 'Low Priority', 
      color: 'border-green-200 bg-green-50', 
      time: '48-72 hours',
      description: 'General questions, feature requests'
    },
    { 
      value: 'medium', 
      label: 'Medium Priority', 
      color: 'border-yellow-200 bg-yellow-50', 
      time: '24-48 hours',
      description: 'Account issues, billing questions'
    },
    { 
      value: 'high', 
      label: 'High Priority', 
      color: 'border-red-200 bg-red-50', 
      time: '12-24 hours',
      description: 'Technical problems, urgent issues'
    }
  ];

  const categoryOptions = [
    { value: 'account', label: 'Account Issues', icon: '👤' },
    { value: 'payment', label: 'Payment & Billing', icon: '💳' },
    { value: 'technical', label: 'Technical Issues', icon: '🔧' },
    { value: 'verification', label: 'Profile Verification', icon: '✅' },
    { value: 'project', label: 'Project Management', icon: '📋' },
    { value: 'dispute', label: 'Dispute Resolution', icon: '⚖️' },
    { value: 'tax', label: 'Tax & Legal (India)', icon: '📄' },
    { value: 'feature', label: 'Feature Request', icon: '💡' },
    { value: 'other', label: 'Other', icon: '❓' }
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Support ticket created successfully! We\'ll respond within ' + 
        priorityOptions.find(p => p.value === data.priority)?.time);
      
      reset();
      setAttachments([]);
    } catch (error) {
      toast.error('Failed to create support ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    try {
      // Mock file upload
      const fileNames = files.map(file => file.name);
      setAttachments(prev => [...prev, ...fileNames]);
      toast.success(`${files.length} file(s) uploaded successfully`);
    } catch (error) {
      toast.error('Failed to upload files');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact LancerScape Support</h1>
        <p className="text-gray-600 text-lg">
          Our India-based support team is here to help you succeed
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-6">
              <h2 className="text-2xl font-bold mb-2">Create Support Ticket</h2>
              <p className="opacity-90">
                Describe your issue in detail for faster resolution
              </p>
            </div>

            <div className="p-6">
              {/* User Info Display */}
              {user && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name: </span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email: </span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Category *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {categoryOptions.map(category => (
                      <label
                        key={category.value}
                        className="relative flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          {...register('category')}
                          type="radio"
                          value={category.value}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{category.icon}</span>
                          <span className="text-sm font-medium">{category.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircleIcon className="w-4 h-4 mr-1" />
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    placeholder="Brief description of your issue"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircleIcon className="w-4 h-4 mr-1" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register('description')}
                    rows={6}
                    placeholder="Please provide detailed information about your issue. Include steps to reproduce if it's a technical problem, or relevant dates for billing issues."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircleIcon className="w-4 h-4 mr-1" />
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Priority Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Priority Level *
                  </label>
                  <div className="space-y-3">
                    {priorityOptions.map(priority => (
                      <label
                        key={priority.value}
                        className={`relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${priority.color}`}
                      >
                        <input
                          {...register('priority')}
                          type="radio"
                          value={priority.value}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium text-gray-900">{priority.label}</div>
                            <div className="text-sm text-gray-600">{priority.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              Response time
                            </div>
                            <div className="text-sm text-gray-600">{priority.time}</div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.priority && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircleIcon className="w-4 h-4 mr-1" />
                      {errors.priority.message}
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments (Optional)
                  </label>
                  <FileDropzone
                    onFilesAdded={handleFileUpload}
                    maxFiles={5}
                    maxSize={10 * 1024 * 1024}
                    accept={['.png', '.jpg', '.jpeg', '.pdf', '.doc', '.docx']}
                    uploadedFiles={attachments}
                    onFileRemove={(index) => {
                      setAttachments(prev => prev.filter((_, i) => i !== index));
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-yellow-500 text-black px-8 py-3 rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Support Request'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information Sidebar */}
        <div className="space-y-6">
          {/* Quick Support Options */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Support</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <PhoneIcon className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <div className="font-medium text-gray-900">Phone Support</div>
                  <div className="text-sm text-gray-600">+91-8000-123-456</div>
                  <div className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM IST</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MailIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-medium text-gray-900">Email Support</div>
                  <div className="text-sm text-gray-600">support@lancerscape.com</div>
                  <div className="text-xs text-gray-500">24-48 hour response</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <div className="font-medium text-gray-900">Office Location</div>
                  <div className="text-sm text-gray-600">
                    Bangalore, Karnataka<br />
                    India
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
            <div className="flex items-center mb-3">
              <ClockIcon className="w-5 h-5 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Support Hours</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">9:00 AM - 6:00 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">10:00 AM - 2:00 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
              Emergency support available 24/7 for critical issues
            </div>
          </div>

          {/* FAQ Link */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Before You Contact Us</h3>
            <p className="text-sm text-gray-600 mb-4">
              Check our FAQ section for quick answers to common questions.
            </p>
            <a
              href="/help/faq"
              className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 font-medium text-sm transition-colors"
            >
              Browse FAQs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};