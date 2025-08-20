import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { HelpCenter } from './pages/HelpCenter';
import { ContactSupport } from './pages/ContactSupport';
import { FAQ } from './pages/FAQ';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  // Simple routing based on hash
  const getActiveComponent = () => {
    const hash = window.location.hash.substring(1);
    
    switch (hash) {
      case 'contact':
        return <ContactSupport />;
      case 'faq':
        return <FAQ />;
      default:
        return <HelpCenter />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-gray-900">
                    <span className="text-yellow-500">Lancer</span>Scape
                  </div>
                  <span className="ml-3 text-sm text-gray-500 border-l pl-3">Help Center</span>
                </div>
                
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className={`text-sm font-medium transition-colors ${
                      !window.location.hash || window.location.hash === '#'
                        ? 'text-yellow-600 border-b-2 border-yellow-600 pb-4'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => {
                      window.location.hash = '';
                      window.location.reload();
                    }}
                  >
                    Help Center
                  </a>
                  <a
                    href="#faq"
                    className={`text-sm font-medium transition-colors ${
                      window.location.hash === '#faq'
                        ? 'text-yellow-600 border-b-2 border-yellow-600 pb-4'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => {
                      window.location.hash = 'faq';
                      setTimeout(() => window.location.reload(), 100);
                    }}
                  >
                    FAQs
                  </a>
                  <a
                    href="#contact"
                    className={`text-sm font-medium transition-colors ${
                      window.location.hash === '#contact'
                        ? 'text-yellow-600 border-b-2 border-yellow-600 pb-4'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => {
                      window.location.hash = 'contact';
                      setTimeout(() => window.location.reload(), 100);
                    }}
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main>
            {getActiveComponent()}
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-2xl font-bold mb-4">
                    <span className="text-yellow-500">Lancer</span>Scape
                  </div>
                  <p className="text-gray-400 text-sm">
                    Empowering Indian freelancers to succeed in the global marketplace.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Support</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-white">Help Center</a></li>
                    <li><a href="#faq" className="hover:text-white">FAQs</a></li>
                    <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
                    <li><a href="#" className="hover:text-white">Community Forum</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Legal</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white">GST Compliance</a></li>
                    <li><a href="#" className="hover:text-white">FEMA Guidelines</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Connect</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>📧 support@lancerscape.com</li>
                    <li>📞 +91-8000-123-456</li>
                    <li>🏢 Bangalore, Karnataka</li>
                    <li>🇮🇳 Made in India</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2024 LancerScape. All rights reserved. | Designed for Indian Freelancers</p>
              </div>
            </div>
          </footer>
        </div>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#FDB813',
                secondary: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;