import React, { useState } from 'react';
import { FileText, Shield, Clock, AlertTriangle } from 'lucide-react';

const TokenRequest: React.FC = () => {
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [accessDuration, setAccessDuration] = useState('24h');
  const [customDuration, setCustomDuration] = useState('');
  const [purpose, setPurpose] = useState('');

  const scopes = [
    {
      id: 'income_verification',
      name: 'Income Verification',
      description: 'Access to income and employment data',
      risk: 'Medium',
      permissions: ['Read income statements', 'Access employment history', 'View salary information']
    },
    {
      id: 'kyc_identity',
      name: 'KYC Identity',
      description: 'Identity verification and background checks',
      risk: 'High',
      permissions: ['Personal identification', 'Address verification', 'Identity documents']
    },
    {
      id: 'transaction_history',
      name: 'Transaction History',
      description: 'Bank account and transaction data',
      risk: 'High',
      permissions: ['Account balances', 'Transaction records', 'Spending patterns']
    },
    {
      id: 'credit_score',
      name: 'Credit Score',
      description: 'Credit rating and score information',
      risk: 'Medium',
      permissions: ['Credit score', 'Credit history', 'Payment behavior']
    },
    {
      id: 'basic_profile',
      name: 'Basic Profile',
      description: 'Basic user profile information',
      risk: 'Low',
      permissions: ['Name and email', 'Phone number', 'Basic demographics']
    }
  ];

  const durations = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: 'custom', label: 'Custom' }
  ];

  const toggleScope = (scopeId: string) => {
    setSelectedScopes(prev => 
      prev.includes(scopeId) 
        ? prev.filter(id => id !== scopeId)
        : [...prev, scopeId]
    );
  };

  const getRiskLevel = () => {
    if (selectedScopes.length === 0) return 'None';
    const risks = selectedScopes.map(id => scopes.find(s => s.id === id)?.risk || 'Low');
    if (risks.includes('High')) return 'High';
    if (risks.includes('Medium')) return 'Medium';
    return 'Low';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Token request submitted:', {
      scopes: selectedScopes,
      duration: accessDuration === 'custom' ? customDuration : accessDuration,
      purpose
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Token Request</h2>
        <p className="text-gray-600 mt-1">Request access tokens for specific data scopes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Scope Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Data Scopes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scopes.map((scope) => (
              <div
                key={scope.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedScopes.includes(scope.id)
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleScope(scope.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedScopes.includes(scope.id)}
                      onChange={() => toggleScope(scope.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <h4 className="font-medium text-gray-900">{scope.name}</h4>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getRiskColor(scope.risk)}`}>
                    {scope.risk} Risk
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{scope.description}</p>
                <div className="text-xs text-gray-500">
                  <strong>Permissions:</strong>
                  <ul className="mt-1 list-disc list-inside">
                    {scope.permissions.map((permission, index) => (
                      <li key={index}>{permission}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Duration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Duration</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {durations.map((duration) => (
              <button
                key={duration.value}
                type="button"
                onClick={() => setAccessDuration(duration.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  accessDuration === duration.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {duration.label}
              </button>
            ))}
          </div>
          {accessDuration === 'custom' && (
            <input
              type="text"
              placeholder="e.g., 6h, 3d, 2w"
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Purpose */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Purpose Description</h3>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Describe the intended use case for this token..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Risk Assessment */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Overall Risk Level:</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(getRiskLevel())}`}>
              {getRiskLevel()}
            </span>
          </div>
          {getRiskLevel() === 'High' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">High Risk Access Requested</p>
                  <p>This token request includes access to sensitive financial data. Ensure proper security measures are in place.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={selectedScopes.length === 0}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="h-4 w-4 mr-2" />
            Request Token
          </button>
        </div>
      </form>

      {/* Code Example */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Implementation Example</h3>
        <div className="bg-gray-900 rounded-md p-4">
          <pre className="text-sm text-gray-300">
{`curl -X POST https://api.fintech.com/v1/tokens \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "scopes": [${selectedScopes.map(s => `"${s}"`).join(', ')}],
    "duration": "${accessDuration === 'custom' ? customDuration : accessDuration}",
    "purpose": "${purpose}"
  }'`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TokenRequest;