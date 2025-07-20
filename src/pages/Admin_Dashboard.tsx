import React, { useState } from 'react';
import { Shield, Eye, Clock, Users, Settings, Search, Filter, AlertTriangle, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { AccessHistory } from '../components/admin/AccessHistory';
import { ActiveConsents } from '../components/admin/ActiveConsents';
import { ConsentTemplates } from '../components/admin/ConsentTemplates';
import { SharingLimits } from '../components/admin/SharingLimits';

const Admin_Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('consents');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const stats = [
    {
      title: 'Active Consents',
      value: '12',
      change: '+2 this week',
      trend: 'up',
      icon: Shield,
      color: 'text-blue-600'
    },
    {
      title: 'Data Accesses',
      value: '247',
      change: '+18 today',
      trend: 'up',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Partners',
      value: '8',
      change: 'No change',
      trend: 'neutral',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Avg. Duration',
      value: '45d',
      change: '-5d vs last month',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const tabs = [
    { id: 'consents', label: 'Active Consents', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-8 mt-14">


        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'consents' && (
              <div className="space-y-6">
                
              </div>
            )}
            
            {activeTab === 'consents' && <ActiveConsents />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Dashboard;