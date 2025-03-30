// app/not-found.js
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';

export default function NotFound() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center max-w-md">
        {/* Error Code */}
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        
        {/* Error Title */}
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">Page Not Found</h2>
        
        {/* Error Description */}
        <p className="mt-6 text-base text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Navigation Options */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
        
        {/* Auto-redirect message */}
        <p className="mt-8 text-sm text-gray-500">
          Redirecting to homepage in {countdown} seconds...
          {countdown === 0 && typeof window !== 'undefined' && window.location.replace('/')}
        </p>
      </div>
    </div>
  );
}