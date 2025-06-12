import { Menu, Shield, X } from 'lucide-react';
import React, { useState } from 'react';
import {  useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600';
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a className="flex items-center space-x-3" href="/">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">SecureLink</h1>
              <p className="text-xs text-slate-500">Your Data, Your Rules, Our Protection
              </p>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Features</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Pricing</a>
            <a href="#testimonials" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Testimonials</a>
            <a href="#contact" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Contact</a>
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
              Get Started
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-slate-600 hover:text-slate-900 font-medium">Features</a>
            <a href="#pricing" className="block text-slate-600 hover:text-slate-900 font-medium">Pricing</a>
            <a href="#testimonials" className="block text-slate-600 hover:text-slate-900 font-medium">Testimonials</a>
            <a href="#contact" className="block text-slate-600 hover:text-slate-900 font-medium">Contact</a>
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button className="w-full text-left px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                Sign In
              </button>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
