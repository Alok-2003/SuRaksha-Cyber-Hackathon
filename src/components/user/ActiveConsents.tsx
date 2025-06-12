import React, { useState } from 'react';
import { Shield, Clock, Users, Settings, ToggleLeft, ToggleRight, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ActiveConsents: React.FC = () => {
  const [consents, setConsents] = useState([
    {
      id: 1,
      partner: 'FinanceFlow Bank',
      logo: 'FB',
      dataTypes: ['Transaction History', 'Account Balance', 'Payment Details'],
      purpose: 'Credit Assessment & Loan Processing',
      startDate: '2024-01-15',
      expiryDate: '2024-02-14',
      status: 'active',
      isAutoRenew: true,
      accessCount: 45,
      lastAccessed: '2024-01-15T14:30:00Z',
      riskLevel: 'low'
    },
    {
      id: 2,
      partner: 'CreditScope Analytics',
      logo: 'CS',
      dataTypes: ['Credit Score', 'Payment History', 'Debt Information'],
      purpose: 'Risk Assessment for Insurance',
      startDate: '2024-01-10',
      expiryDate: '2024-02-24',
      status: 'active',
      isAutoRenew: false,
      accessCount: 23,
      lastAccessed: '2024-01-14T09:15:00Z',
      riskLevel: 'medium'
    },
    {
      id: 3,
      partner: 'InvestTrack Pro',
      logo: 'IT',
      dataTypes: ['Portfolio Data', 'Investment History', 'Risk Profile'],
      purpose: 'Investment Advisory Services',
      startDate: '2024-01-05',
      expiryDate: '2024-01-20',
      status: 'expiring',
      isAutoRenew: true,
      accessCount: 78,
      lastAccessed: '2024-01-12T16:45:00Z',
      riskLevel: 'low'
    }
  ]);

  const toggleAutoRenew = (id: number) => {
    setConsents(consents.map(consent => 
      consent.id === id ? { ...consent, isAutoRenew: !consent.isAutoRenew } : consent
    ));
  };

  const revokeConsent = (id: number) => {
    setConsents(consents.map(consent => 
      consent.id === id ? { ...consent, status: 'revoked' } : consent
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expiring':
        return 'bg-orange-100 text-orange-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'high':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active Consents</p>
              <p className="text-2xl font-bold text-green-700">{consents.filter(c => c.status === 'active').length}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-700">{consents.filter(c => c.status === 'expiring').length}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Accesses</p>
              <p className="text-2xl font-bold text-blue-700">{consents.reduce((sum, c) => sum + c.accessCount, 0)}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Active Consents List */}
      <div className="space-y-4">
        {consents.map((consent) => (
          <div key={consent.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-700">{consent.logo}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{consent.partner}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consent.status)}`}>
                        {consent.status}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getRiskColor(consent.riskLevel)}`}>
                        {consent.riskLevel} risk
                      </span>
                    </div>
                    <p className="text-slate-600 mb-3">{consent.purpose}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {consent.dataTypes.map((dataType, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                          {dataType}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-slate-500 mb-1">
                    {getDaysUntilExpiry(consent.expiryDate)} days left
                  </div>
                  <div className="text-xs text-slate-400">
                    {consent.accessCount} accesses
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 bg-slate-50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Start Date</p>
                  <p className="font-medium text-slate-900">{formatDate(consent.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Expiry Date</p>
                  <p className="font-medium text-slate-900">{formatDate(consent.expiryDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Last Accessed</p>
                  <p className="font-medium text-slate-900">{formatDate(consent.lastAccessed)}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-slate-700">Auto-renewal</span>
                    <button
                      onClick={() => toggleAutoRenew(consent.id)}
                      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {consent.isAutoRenew ? (
                        <ToggleRight className="w-11 h-6 text-blue-600" />
                      ) : (
                        <ToggleLeft className="w-11 h-6 text-slate-300" />
                      )}
                    </button>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-800">
                    <Settings className="w-4 h-4" />
                    <span>Modify Consent</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Extend
                  </button>
                  <button 
                    onClick={() => revokeConsent(consent.id)}
                    disabled={consent.status === 'revoked'}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {consent.status === 'revoked' ? 'Revoked' : 'Revoke'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {consents.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No active consents</h3>
          <p className="text-slate-500">You haven't granted access to any partners yet.</p>
        </div>
      )}
    </div>
  );
};