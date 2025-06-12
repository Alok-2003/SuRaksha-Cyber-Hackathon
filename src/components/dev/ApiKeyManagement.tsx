import React, { useState } from 'react';
import { Key, Plus, Copy, Eye, EyeOff, Trash2, Calendar } from 'lucide-react';

const ApiKeyManagement: React.FC = () => {
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const apiKeys = [
    {
      id: '1',
      name: 'Production Key',
      key: 'pk_live_51H7Z2KJ2...',
      fullKey: 'pk_live_51H7Z2KJ2LhGZQFH8F4g5t2d1j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2',
      created: '2024-01-15',
      lastUsed: '2 hours ago',
      requests: 1247,
      environment: 'production'
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'pk_test_51H7Z2KJ2...',
      fullKey: 'pk_test_51H7Z2KJ2LhGZQFH8F4g5t2d1j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2',
      created: '2024-01-10',
      lastUsed: '5 minutes ago',
      requests: 523,
      environment: 'development'
    },
    {
      id: '3',
      name: 'Sandbox Key',
      key: 'pk_sand_51H7Z2KJ2...',
      fullKey: 'pk_sand_51H7Z2KJ2LhGZQFH8F4g5t2d1j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2',
      created: '2024-01-08',
      lastUsed: '1 day ago',
      requests: 89,
      environment: 'sandbox'
    }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateNewKey = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Key Management</h2>
          <p className="text-gray-600 mt-1">Generate and manage your API keys for secure access.</p>
        </div>
        <button
          onClick={generateNewKey}
          disabled={isGenerating}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate New Key'}
        </button>
      </div>

      {/* API Keys List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your API Keys</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Key className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{apiKey.name}</h4>
                    <p className="text-xs text-gray-500">Created {apiKey.created}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    apiKey.environment === 'production' 
                      ? 'bg-red-100 text-red-800'
                      : apiKey.environment === 'development'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {apiKey.environment}
                  </span>
                </div>
                <button className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="bg-gray-50 rounded-md p-3 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-gray-800">
                    {showKeys[apiKey.id] ? apiKey.fullKey : apiKey.key}
                  </code>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.fullKey)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Last Used:</span>
                  <span className="ml-2 text-gray-900">{apiKey.lastUsed}</span>
                </div>
                <div>
                  <span className="text-gray-500">Total Requests:</span>
                  <span className="ml-2 text-gray-900">{apiKey.requests}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Security Guidelines</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Never share your API keys in public repositories or client-side code</li>
          <li>• Use environment-specific keys for different deployment stages</li>
          <li>• Rotate keys regularly and immediately if compromised</li>
          <li>• Monitor usage patterns for unusual activity</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiKeyManagement;