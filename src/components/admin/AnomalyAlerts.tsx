import React, { useState } from 'react';
import { Zap, AlertTriangle, TrendingUp, Clock, Users, Eye, CheckCircle, XCircle, Settings, Filter } from 'lucide-react';

export const AnomalyAlerts: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const alerts = [
    {
      id: 1,
      title: 'Unusual Data Access Volume',
      description: 'CreditScope Analytics accessed 300% more records than usual in the last hour',
      severity: 'high',
      status: 'active',
      partner: 'CreditScope Analytics',
      partnerLogo: 'CS',
      timestamp: '2024-01-15T14:30:00Z',
      affectedUsers: 247,
      dataType: 'Credit Profiles',
      anomalyType: 'volume_spike',
      threshold: '100 records/hour',
      actualValue: '347 records/hour',
      confidence: 95,
      riskScore: 85,
      actions: ['Block Access', 'Notify Partner', 'Investigate']
    },
    {
      id: 2,
      title: 'Suspicious Access Pattern',
      description: 'Multiple failed authentication attempts from InvestTrack Pro',
      severity: 'medium',
      status: 'investigating',
      partner: 'InvestTrack Pro',
      partnerLogo: 'IT',
      timestamp: '2024-01-15T13:45:00Z',
      affectedUsers: 12,
      dataType: 'Portfolio Data',
      anomalyType: 'auth_failure',
      threshold: '5 failures/hour',
      actualValue: '23 failures/hour',
      confidence: 88,
      riskScore: 67,
      actions: ['Temporary Suspension', 'Contact Partner', 'Review Logs']
    },
    {
      id: 3,
      title: 'Off-Hours Data Access',
      description: 'SecurePayments Ltd accessing data outside normal business hours',
      severity: 'low',
      status: 'resolved',
      partner: 'SecurePayments Ltd',
      partnerLogo: 'SP',
      timestamp: '2024-01-15T02:15:00Z',
      affectedUsers: 89,
      dataType: 'Payment History',
      anomalyType: 'time_anomaly',
      threshold: '09:00-17:00 UTC',
      actualValue: '02:15 UTC',
      confidence: 72,
      riskScore: 34,
      actions: ['Approved Exception', 'Update Schedule']
    },
    {
      id: 4,
      title: 'Geographic Access Anomaly',
      description: 'FinanceFlow Bank accessing data from unusual geographic location',
      severity: 'medium',
      status: 'pending',
      partner: 'FinanceFlow Bank',
      partnerLogo: 'FB',
      timestamp: '2024-01-15T11:20:00Z',
      affectedUsers: 156,
      dataType: 'Transaction History',
      anomalyType: 'geo_anomaly',
      threshold: 'EU Region',
      actualValue: 'Asia-Pacific',
      confidence: 91,
      riskScore: 58,
      actions: ['Verify Location', 'Contact Partner', 'Monitor']
    }
  ];

  const alertRules = [
    {
      id: 1,
      name: 'High Volume Access',
      description: 'Detect when partners access more than 2x their normal volume',
      isActive: true,
      threshold: '200% of baseline',
      sensitivity: 'medium',
      triggeredCount: 12
    },
    {
      id: 2,
      name: 'Failed Authentication Spike',
      description: 'Alert on multiple authentication failures',
      isActive: true,
      threshold: '10 failures/hour',
      sensitivity: 'high',
      triggeredCount: 5
    },
    {
      id: 3,
      name: 'Off-Hours Access',
      description: 'Monitor data access outside business hours',
      isActive: false,
      threshold: 'Outside 09:00-17:00 UTC',
      sensitivity: 'low',
      triggeredCount: 8
    },
    {
      id: 4,
      name: 'Geographic Anomaly',
      description: 'Detect access from unexpected locations',
      isActive: true,
      threshold: 'Outside approved regions',
      sensitivity: 'medium',
      triggeredCount: 3
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;
    return matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'investigating':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAnomalyIcon = (type: string) => {
    switch (type) {
      case 'volume_spike':
        return TrendingUp;
      case 'auth_failure':
        return XCircle;
      case 'time_anomaly':
        return Clock;
      case 'geo_anomaly':
        return Eye;
      default:
        return AlertTriangle;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  const toggleRule = (ruleId: number) => {
    console.log(`Toggling rule ${ruleId}`);
  };

  return (
    <div className="space-y-8">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Active Alerts</p>
              <p className="text-2xl font-bold text-red-700">{alerts.filter(a => a.status === 'active').length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Investigating</p>
              <p className="text-2xl font-bold text-orange-700">{alerts.filter(a => a.status === 'investigating').length}</p>
            </div>
            <Eye className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Pending</p>
              <p className="text-2xl font-bold text-blue-700">{alerts.filter(a => a.status === 'pending').length}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Resolved</p>
              <p className="text-2xl font-bold text-green-700">{alerts.filter(a => a.status === 'resolved').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700">Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="investigating">Investigating</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-slate-500">
          {filteredAlerts.length} of {alerts.length} alerts
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const AnomalyIcon = getAnomalyIcon(alert.anomalyType);
          
          return (
            <div key={alert.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    alert.severity === 'high' ? 'bg-red-100' :
                    alert.severity === 'medium' ? 'bg-orange-100' : 'bg-yellow-100'
                  }`}>
                    <AnomalyIcon className={`w-6 h-6 ${
                      alert.severity === 'high' ? 'text-red-600' :
                      alert.severity === 'medium' ? 'text-orange-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{alert.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-3">{alert.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-slate-500">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-700">{alert.partnerLogo}</span>
                        </div>
                        <span>{alert.partner}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{alert.affectedUsers} users</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-slate-500 mb-1">Confidence</div>
                  <div className="text-lg font-bold text-slate-900">{alert.confidence}%</div>
                  <div className="text-xs text-slate-500">Risk: {alert.riskScore}</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Data Type:</span>
                    <p className="font-medium text-slate-900">{alert.dataType}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Threshold:</span>
                    <p className="font-medium text-slate-900">{alert.threshold}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Actual Value:</span>
                    <p className="font-medium text-slate-900">{alert.actualValue}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {alert.actions.map((action, index) => (
                    <button
                      key={index}
                      className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
                
                <button className="flex items-center space-x-1 text-sm text-slate-600 hover:text-slate-800">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert Rules Configuration */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Alert Rules</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Configure Rules</span>
          </button>
        </div>

        <div className="space-y-4">
          {alertRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-slate-900">{rule.name}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {rule.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{rule.description}</p>
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <span>Threshold: {rule.threshold}</span>
                  <span>Sensitivity: {rule.sensitivity}</span>
                  <span>Triggered: {rule.triggeredCount} times</span>
                </div>
              </div>
              
              <button
                onClick={() => toggleRule(rule.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  rule.isActive ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  rule.isActive ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <Zap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No alerts found</h3>
          <p className="text-slate-500">Try adjusting your filter criteria.</p>
        </div>
      )}
    </div>
  );
};