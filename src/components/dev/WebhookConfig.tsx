import React, { useState } from 'react';
import { Webhook, Plus, Settings, TestTube, CheckCircle, XCircle } from 'lucide-react';

const WebhookConfig: React.FC = () => {
  const [webhooks, setWebhooks] = useState([
    {
      id: '1',
      name: 'Token Expiry Notifications',
      url: 'https://api.myapp.com/webhooks/token-expiry',
      events: ['token.expired', 'token.expiring_soon'],
      status: 'active',
      lastTriggered: '2 hours ago',
      successRate: 98.5
    },
    {
      id: '2',
      name: 'Data Access Alerts',
      url: 'https://api.myapp.com/webhooks/data-access',
      events: ['data.accessed', 'data.permission_denied'],
      status: 'inactive',
      lastTriggered: '1 day ago',
      successRate: 95.2
    }
  ]);

  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[],
    secret: ''
  });

  const [isAdding, setIsAdding] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState<string | null>(null);

  const availableEvents = [
    { id: 'token.created', name: 'Token Created', description: 'Fired when a new token is generated' },
    { id: 'token.expired', name: 'Token Expired', description: 'Fired when a token expires' },
    { id: 'token.expiring_soon', name: 'Token Expiring Soon', description: 'Fired 24h before token expiry' },
    { id: 'data.accessed', name: 'Data Accessed', description: 'Fired when data is accessed using a token' },
    { id: 'data.permission_denied', name: 'Permission Denied', description: 'Fired when access is denied' },
    { id: 'rate_limit.exceeded', name: 'Rate Limit Exceeded', description: 'Fired when rate limits are hit' }
  ];

  const testWebhook = async (webhookId: string) => {
    setTestingWebhook(webhookId);
    // Simulate API call
    setTimeout(() => {
      setTestingWebhook(null);
    }, 2000);
  };

  const toggleEvent = (eventId: string) => {
    setNewWebhook(prev => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter(e => e !== eventId)
        : [...prev.events, eventId]
    }));
  };

  const addWebhook = () => {
    if (newWebhook.name && newWebhook.url && newWebhook.events.length > 0) {
      setWebhooks(prev => [...prev, {
        id: Date.now().toString(),
        ...newWebhook,
        status: 'active',
        lastTriggered: 'Never',
        successRate: 100
      }]);
      setNewWebhook({ name: '', url: '', events: [], secret: '' });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Webhook Configuration</h2>
          <p className="text-gray-600 mt-1">Configure webhooks to receive real-time notifications.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Webhook
        </button>
      </div>

      {/* Add New Webhook Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Webhook</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Name</label>
                <input
                  type="text"
                  value={newWebhook.name}
                  onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Webhook"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint URL</label>
                <input
                  type="url"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://api.myapp.com/webhooks"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Events</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      newWebhook.events.includes(event.id)
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleEvent(event.id)}
                  >
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        checked={newWebhook.events.includes(event.id)}
                        onChange={() => toggleEvent(event.id)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{event.name}</h4>
                        <p className="text-xs text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Secret (Optional)</label>
              <input
                type="password"
                value={newWebhook.secret}
                onChange={(e) => setNewWebhook(prev => ({ ...prev, secret: e.target.value }))}
                placeholder="Used to verify webhook authenticity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addWebhook}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Webhook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Webhooks */}
      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <div key={webhook.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Webhook className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{webhook.name}</h4>
                  <p className="text-sm text-gray-600">{webhook.url}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  webhook.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {webhook.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => testWebhook(webhook.id)}
                  disabled={testingWebhook === webhook.id}
                  className="flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  <TestTube className="h-4 w-4 mr-1" />
                  {testingWebhook === webhook.id ? 'Testing...' : 'Test'}
                </button>
                <button className="text-gray-600 hover:text-gray-700">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-500">Events:</span>
                <div className="mt-1">
                  {webhook.events.map((event, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                      {event}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Last Triggered:</span>
                <p className="text-sm text-gray-900">{webhook.lastTriggered}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Success Rate:</span>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-900">{webhook.successRate}%</p>
                  {webhook.successRate >= 95 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Webhook Payload Example */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Webhook Payload</h3>
        <div className="bg-gray-900 rounded-md p-4">
          <pre className="text-sm text-gray-300">
{`{
  "event": "token.expired",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "token_id": "tok_1234567890",
    "user_id": "usr_abcdef123",
    "scopes": ["income_verification", "basic_profile"],
    "expired_at": "2024-01-15T10:30:00Z"
  },
  "signature": "sha256=..."
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default WebhookConfig;