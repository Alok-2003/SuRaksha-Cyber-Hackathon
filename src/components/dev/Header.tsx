import React from 'react';
import { Shield, Key, FileText, Webhook, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'token-request', label: 'Token Request', icon: FileText },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'status', label: 'Status', icon: Activity },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">FinTech API Portal</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Environment:</span>
              <span className="ml-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Sandbox
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;