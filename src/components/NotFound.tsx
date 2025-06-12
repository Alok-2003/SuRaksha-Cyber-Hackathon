import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
