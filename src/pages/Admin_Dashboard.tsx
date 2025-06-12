import React, { useState } from 'react';
import { Shield, Eye, Clock, Users, Settings, Search, Filter, AlertTriangle, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { AccessHistory } from '../components/admin/AccessHistory';
import { ActiveConsents } from '../components/admin/ActiveConsents';
import { ConsentTemplates } from '../components/admin/ConsentTemplates';
import { SharingLimits } from '../components/admin/SharingLimits';

const Admin_Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
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
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'history', label: 'Access History', icon: Eye },
    { id: 'consents', label: 'Active Consents', icon: CheckCircle },
    { id: 'templates', label: 'Templates', icon: Settings },
    { id: 'limits', label: 'Sharing Limits', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-8 mt-14">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r text-white ${
                  stat.color === 'text-blue-600' ? 'from-blue-600 to-blue-700' :
                  stat.color === 'text-green-600' ? 'from-green-600 to-green-700' :
                  stat.color === 'text-purple-600' ? 'from-purple-600 to-purple-700' :
                  'from-orange-600 to-orange-700'
                } flex items-center justify-center`}>
                 <stat.icon className={`w-6 h-6 text-white`} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-600 mb-2">{stat.title}</p>
                <p className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-600' :
                  stat.trend === 'down' ? 'text-red-600' :
                  'text-slate-500'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          ))}
        </div>

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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {[
                      { partner: 'FinanceFlow Bank', action: 'Accessed transaction history', time: '2 hours ago', status: 'active' },
                      { partner: 'CreditScope Analytics', action: 'Viewed credit profile', time: '1 day ago', status: 'active' },
                      { partner: 'InvestTrack Pro', action: 'Downloaded portfolio data', time: '3 days ago', status: 'revoked' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <div>
                            <p className="font-medium text-slate-900">{activity.partner}</p>
                            <p className="text-sm text-slate-600">{activity.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">{activity.time}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            activity.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'history' && <AccessHistory searchQuery={searchQuery} />}
            {activeTab === 'consents' && <ActiveConsents />}
            {activeTab === 'templates' && <ConsentTemplates />}
            {activeTab === 'limits' && <SharingLimits />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Dashboard;