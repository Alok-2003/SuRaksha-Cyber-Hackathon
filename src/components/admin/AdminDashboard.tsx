import React, { useState } from 'react';
import { Shield, Users, AlertTriangle, TrendingUp, Download, Filter, Search, Bell, Settings, Eye, FileText, Activity, Zap } from 'lucide-react';
import { PartnerMonitoring } from './PartnerMonitoring';
import { ComplianceReports } from './ComplianceReports';
import { AccessLogs } from './AccessLogs';
import { AnomalyAlerts } from './AnomalyAlerts';
import { RiskAssessment } from './RiskAssessment';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Total Partners',
      value: '47',
      change: '+3 this month',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      title: 'High Risk Partners',
      value: '4',
      change: '-1 this week',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100'
    },
    {
      title: 'Data Accesses Today',
      value: '1,247',
      change: '+18% vs yesterday',
      trend: 'up',
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      title: 'Compliance Score',
      value: '94%',
      change: '+2% this month',
      trend: 'up',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'partners', label: 'Partner Monitoring', icon: Users },
    { id: 'logs', label: 'Access Logs', icon: Eye },
    { id: 'reports', label: 'Compliance Reports', icon: FileText },
    { id: 'alerts', label: 'Anomaly Alerts', icon: Zap },
    { id: 'risk', label: 'Risk Assessment', icon: AlertTriangle }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'high',
      title: 'Unusual Access Pattern Detected',
      partner: 'CreditScope Analytics',
      description: 'Partner accessed 300% more records than usual in the last hour',
      timestamp: '2024-01-15T14:30:00Z',
      status: 'active'
    },
    {
      id: 2,
      type: 'medium',
      title: 'Compliance Deadline Approaching',
      partner: 'FinanceFlow Bank',
      description: 'GDPR audit documentation due in 3 days',
      timestamp: '2024-01-15T12:15:00Z',
      status: 'pending'
    },
    {
      id: 3,
      type: 'low',
      title: 'New Partner Onboarded',
      partner: 'SecurePayments Ltd',
      description: 'Partner completed security assessment with 92% score',
      timestamp: '2024-01-15T09:45:00Z',
      status: 'resolved'
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'high':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'medium':
        return 'border-orange-200 bg-orange-50 text-orange-800';
      case 'low':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">DataGuard Admin</h1>
                <p className="text-xs text-slate-500">Partner Compliance & Monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search partners, logs, alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                />
              </div>
              
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="1d">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.bgColor} flex items-center justify-center shadow-sm`}>
                  <stat.icon className={`w-7 h-7 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 mb-8 shadow-sm">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
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
              <div className="space-y-8">
                {/* Recent Alerts */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">Recent Alerts</h2>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className={`border rounded-xl p-4 ${getAlertColor(alert.type)}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">{alert.title}</h3>
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                                {alert.partner}
                              </span>
                            </div>
                            <p className="text-sm opacity-80 mb-2">{alert.description}</p>
                            <p className="text-xs opacity-60">{formatTimestamp(alert.timestamp)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${
                              alert.status === 'active' ? 'bg-red-500' :
                              alert.status === 'pending' ? 'bg-orange-500' : 'bg-green-500'
                            }`} />
                            <button className="text-xs font-medium hover:underline">
                              {alert.status === 'active' ? 'Investigate' : 'View'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-lg transition-all text-left group">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Download className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Export Compliance Report</h3>
                      </div>
                      <p className="text-sm text-slate-600">Generate comprehensive compliance documentation</p>
                    </button>

                    <button className="p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-lg transition-all text-left group">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Partner Risk Review</h3>
                      </div>
                      <p className="text-sm text-slate-600">Assess and update partner risk scores</p>
                    </button>

                    <button className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:shadow-lg transition-all text-left group">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Configure Alerts</h3>
                      </div>
                      <p className="text-sm text-slate-600">Set up anomaly detection rules</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'partners' && <PartnerMonitoring searchQuery={searchQuery} timeRange={timeRange} />}
            {activeTab === 'logs' && <AccessLogs searchQuery={searchQuery} timeRange={timeRange} />}
            {activeTab === 'reports' && <ComplianceReports />}
            {activeTab === 'alerts' && <AnomalyAlerts />}
            {activeTab === 'risk' && <RiskAssessment />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;