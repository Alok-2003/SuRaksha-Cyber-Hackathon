import React from 'react';
import { Key, FileText, Webhook, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const Dev_Dashboard: React.FC = () => {
  const stats = [
    { title: 'Active API Keys', value: '3', icon: Key, color: 'blue' },
    { title: 'Token Requests', value: '24', icon: FileText, color: 'green' },
    { title: 'Webhooks Configured', value: '2', icon: Webhook, color: 'purple' },
    { title: 'Monthly Usage', value: '87%', icon: TrendingUp, color: 'orange' },
  ];

  const recentActivity = [
    { action: 'Token requested for Income Verification', time: '2 minutes ago', status: 'success' },
    { action: 'API Key "prod-key-01" generated', time: '1 hour ago', status: 'success' },
    { action: 'Webhook endpoint updated', time: '3 hours ago', status: 'success' },
    { action: 'KYC token request failed - insufficient scope', time: '5 hours ago', status: 'error' },
  ];

  return (
    <div className="space-y-8 flex items-center justify-center">
      <div className='mt-20' >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your API usage and manage tokenized data access.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {activity.status === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-gray-900">{activity.action}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 my-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Key className="h-4 w-4 mr-2" />
            Generate API Key
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <FileText className="h-4 w-4 mr-2" />
            Request Token
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Webhook className="h-4 w-4 mr-2" />
            Configure Webhook
          </button>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Dev_Dashboard;