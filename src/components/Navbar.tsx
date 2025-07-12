import { LogOut, Menu, Shield, User, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and set the user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600';
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
           {/* <a href="/user-dashboard" className="block text-slate-600 hover:text-slate-900 font-medium">User Dashboard</a> */}
           {/* <a href="/admin-dashboard" className="block text-slate-600 hover:text-slate-900 font-medium">Admin Dashboard</a> */}
           {/* <a href="/dev-dashboard" className="block text-slate-600 hover:text-slate-900 font-medium">Dev Dashboard</a> */}
            {/* <a href="#features" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Features</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Pricing</a>
            <a href="#testimonials" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Testimonials</a>
            <a href="#contact" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Contact</a> */}
            {/* <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
              Get Started
            </button> */}
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : user ? (
              <HeadlessMenu as="div" className="relative">
                {({ open }) => (
                  <>
                    <HeadlessMenu.Button 
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {user.email?.charAt(0).toUpperCase() || <User size={20} />}
                    </HeadlessMenu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">{user.email}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {user.user_metadata?.role === 'admin' ? 'Administrator' : 'User'}
                          </p>
                        </div>
                        <div className="py-1">
                          <HeadlessMenu.Item>
                            {({ active }) => (
                              <Link
                                to={user.user_metadata?.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } group flex w-full items-center px-4 py-2 text-sm`}
                              >
                                Dashboard
                              </Link>
                            )}
                          </HeadlessMenu.Item>
                        </div>
                        <div className="py-1">
                          <HeadlessMenu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={`${
                                  active ? 'bg-red-50 text-red-700' : 'text-red-600'
                                } group flex w-full items-center px-4 py-2 text-sm`}
                              >
                                <LogOut className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" />
                                Sign out
                              </button>
                            )}
                          </HeadlessMenu.Item>
                        </div>
                      </HeadlessMenu.Items>
                    </Transition>
                  </>
                )}
              </HeadlessMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
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
           {/* <a href="/user-dashboard" className="block text-slate-600 hover:text-slate-900 font-medium ml-4">User Dashboard</a> */}
            {/* <a href="#features" className="block text-slate-600 hover:text-slate-900 font-medium">Features</a>
            <a href="#pricing" className="block text-slate-600 hover:text-slate-900 font-medium">Pricing</a>
            <a href="#testimonials" className="block text-slate-600 hover:text-slate-900 font-medium">Testimonials</a>
            <a href="#contact" className="block text-slate-600 hover:text-slate-900 font-medium">Contact</a> */}
            {loading ? (
              <div className="space-y-2">
                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : user ? (
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div className="px-4 py-2">
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">Role: {user.user_metadata?.role || 'user'}</p>
                </div>
                <Link 
                  to={user.user_metadata?.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}
                  className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100 rounded"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <Link
                  to="/signin"
                  className="block w-full text-left px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
