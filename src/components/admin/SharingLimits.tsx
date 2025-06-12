import React, { useState } from 'react';
import { Clock, Target, AlertTriangle, Settings, ToggleLeft, ToggleRight, Calendar, Users } from 'lucide-react';

export const SharingLimits: React.FC = () => {
  const [limits, setLimits] = useState({
    globalEnabled: true,
    maxDuration: 90,
    autoExpiry: true,
    maxPartnersPerPurpose: 3,
    requireReauth: false,
    reauthPeriod: 30,
    dataMinimization: true,
    purposeLimitation: true,
    retentionNotice: 7
  });

  const [customLimits, setCustomLimits] = useState([
    {
      id: 1,
      purpose: 'Credit Assessment',
      maxDuration: 60,
      maxPartners: 2,
      dataTypes: ['Transaction History', 'Account Balance'],
      isActive: true,
      currentUsage: 1
    },
    {
      id: 2,
      purpose: 'Investment Advisory',
      maxDuration: 180,
      maxPartners: 1,
      dataTypes: ['Portfolio Data', 'Investment History'],
      isActive: true,
      currentUsage: 1
    },
    {
      id: 3,
      purpose: 'Insurance Assessment',
      maxDuration: 45,
      maxPartners: 3,
      dataTypes: ['Credit Score', 'Payment History'],
      isActive: false,
      currentUsage: 0
    }
  ]);

  const toggleGlobalLimits = () => {
    setLimits(prev => ({ ...prev, globalEnabled: !prev.globalEnabled }));
  };

  const toggleAutoExpiry = () => {
    setLimits(prev => ({ ...prev, autoExpiry: !prev.autoExpiry }));
  };

  const toggleCustomLimit = (id: number) => {
    setCustomLimits(prev => prev.map(limit => 
      limit.id === id ? { ...limit, isActive: !limit.isActive } : limit
    ));
  };

  const getUsagePercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-8">
      {/* Global Settings */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Global Sharing Limits</h2>
            <p className="text-slate-600 mt-1">Set default restrictions for all data sharing activities</p>
          </div>
          <button
            onClick={toggleGlobalLimits}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {limits.globalEnabled ? (
              <ToggleRight className="w-11 h-6 text-blue-600" />
            ) : (
              <ToggleLeft className="w-11 h-6 text-slate-300" />
            )}
          </button>
        </div>

        {limits.globalEnabled && (
          <div className="space-y-6">
            {/* Duration Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Maximum Duration (days)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="1"
                      max="365"
                      value={limits.maxDuration}
                      onChange={(e) => setLimits(prev => ({ ...prev, maxDuration: parseInt(e.target.value) }))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-900 w-12 text-right">
                      {limits.maxDuration}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Maximum time partners can access your data
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Max Partners per Purpose
                  </label>
                  <select
                    value={limits.maxPartnersPerPurpose}
                    onChange={(e) => setLimits(prev => ({ ...prev, maxPartnersPerPurpose: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={1}>1 partner</option>
                    <option value={2}>2 partners</option>
                    <option value={3}>3 partners</option>
                    <option value={5}>5 partners</option>
                    <option value={-1}>No limit</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">Auto-expiry</h4>
                    <p className="text-sm text-slate-600">Automatically revoke expired consents</p>
                  </div>
                  <button
                    onClick={toggleAutoExpiry}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                  >
                    {limits.autoExpiry ? (
                      <ToggleRight className="w-11 h-6 text-blue-600" />
                    ) : (
                      <ToggleLeft className="w-11 h-6 text-slate-300" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">Data Minimization</h4>
                    <p className="text-sm text-slate-600">Only share necessary data types</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
                    <ToggleRight className="w-11 h-6 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Settings</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Expiry Notice (days before)
                  </label>
                  <select
                    value={limits.retentionNotice}
                    onChange={(e) => setLimits(prev => ({ ...prev, retentionNotice: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={1}>1 day</option>
                    <option value={3}>3 days</option>
                    <option value={7}>7 days</option>
                    <option value={14}>14 days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Purpose-Specific Limits */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Purpose-Specific Limits</h2>
            <p className="text-slate-600 mt-1">Customize limits for different data sharing purposes</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Target className="w-4 h-4" />
            <span>Add Purpose</span>
          </button>
        </div>

        <div className="space-y-4">
          {customLimits.map((limit) => (
            <div key={limit.id} className="border border-slate-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{limit.purpose}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      limit.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {limit.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {limit.dataTypes.map((type, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => toggleCustomLimit(limit.id)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                >
                  {limit.isActive ? (
                    <ToggleRight className="w-11 h-6 text-blue-600" />
                  ) : (
                    <ToggleLeft className="w-11 h-6 text-slate-300" />
                  )}
                </button>
              </div>

              {limit.isActive && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Max Duration
                    </label>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-900">{limit.maxDuration} days</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Partner Usage
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{limit.currentUsage} / {limit.maxPartners} partners</span>
                        <span className={`font-medium ${
                          getUsagePercentage(limit.currentUsage, limit.maxPartners) >= 90 ? 'text-red-600' :
                          getUsagePercentage(limit.currentUsage, limit.maxPartners) >= 70 ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          {getUsagePercentage(limit.currentUsage, limit.maxPartners)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${getUsageColor(getUsagePercentage(limit.currentUsage, limit.maxPartners))}`}
                          style={{ width: `${getUsagePercentage(limit.currentUsage, limit.maxPartners)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 text-sm">
                      <Settings className="w-4 h-4" />
                      <span>Configure</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Compliance Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-slate-700">GDPR Article 5 - Data Minimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-slate-700">GDPR Article 6 - Purpose Limitation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-slate-700">DPDP Section 8 - Data Retention</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-slate-700">DPDP Section 11 - User Control</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};