import React, { useState } from 'react';
import { Users, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Shield, Eye, Settings, MoreVertical } from 'lucide-react';

interface PartnerMonitoringProps {
  searchQuery: string;
  timeRange: string;
}

export const PartnerMonitoring: React.FC<PartnerMonitoringProps> = ({ searchQuery, timeRange }) => {
  const [sortBy, setSortBy] = useState('riskScore');
  const [filterRisk, setFilterRisk] = useState('all');

  const partners = [
    {
      id: 1,
      name: 'FinanceFlow Bank',
      logo: 'FB',
      riskScore: 85,
      riskLevel: 'low',
      status: 'active',
      lastAccess: '2024-01-15T14:30:00Z',
      totalAccesses: 1247,
      dataTypes: ['Transaction History', 'Account Balance', 'Personal Details'],
      complianceScore: 94,
      anomalies: 0,
      avgResponseTime: 120,
      dataRetention: 90,
      purposes: ['Credit Assessment', 'Risk Analysis'],
      region: 'EU',
      certifications: ['ISO 27001', 'SOC 2', 'GDPR']
    },
    {
      id: 2,
      name: 'CreditScope Analytics',
      logo: 'CS',
      riskScore: 45,
      riskLevel: 'high',
      status: 'active',
      lastAccess: '2024-01-15T13:45:00Z',
      totalAccesses: 892,
      dataTypes: ['Credit Score', 'Payment History', 'Debt Information'],
      complianceScore: 67,
      anomalies: 3,
      avgResponseTime: 340,
      dataRetention: 180,
      purposes: ['Risk Assessment', 'Credit Scoring'],
      region: 'US',
      certifications: ['SOC 2']
    },
    {
      id: 3,
      name: 'InvestTrack Pro',
      logo: 'IT',
      riskScore: 72,
      riskLevel: 'medium',
      status: 'active',
      lastAccess: '2024-01-15T12:20:00Z',
      totalAccesses: 634,
      dataTypes: ['Portfolio Data', 'Investment History', 'Risk Profile'],
      complianceScore: 88,
      anomalies: 1,
      avgResponseTime: 180,
      dataRetention: 120,
      purposes: ['Investment Advisory', 'Portfolio Management'],
      region: 'APAC',
      certifications: ['ISO 27001', 'SOC 2']
    },
    {
      id: 4,
      name: 'SecurePayments Ltd',
      logo: 'SP',
      riskScore: 91,
      riskLevel: 'low',
      status: 'pending',
      lastAccess: '2024-01-14T16:10:00Z',
      totalAccesses: 156,
      dataTypes: ['Payment History', 'Transaction Details'],
      complianceScore: 96,
      anomalies: 0,
      avgResponseTime: 95,
      dataRetention: 60,
      purposes: ['Fraud Prevention', 'Payment Processing'],
      region: 'EU',
      certifications: ['ISO 27001', 'SOC 2', 'PCI DSS', 'GDPR']
    }
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = searchQuery === '' || 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.purposes.some(purpose => purpose.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRisk = filterRisk === 'all' || partner.riskLevel === filterRisk;
    
    return matchesSearch && matchesRisk;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastAccess = (timestamp: string) => {
    const now = new Date();
    const accessTime = new Date(timestamp);
    const diffHours = Math.floor((now.getTime() - accessTime.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700">Risk Level:</span>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="riskScore">Risk Score</option>
              <option value="lastAccess">Last Access</option>
              <option value="totalAccesses">Total Accesses</option>
              <option value="complianceScore">Compliance Score</option>
            </select>
          </div>
        </div>
        
        <div className="text-sm text-slate-500">
          {filteredPartners.length} of {partners.length} partners
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPartners.map((partner) => (
          <div key={partner.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-lg font-bold text-blue-700">{partner.logo}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{partner.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                      {partner.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <span>{partner.region}</span>
                    <span>•</span>
                    <span>{formatLastAccess(partner.lastAccess)}</span>
                  </div>
                </div>
              </div>
              
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Risk & Compliance Scores */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={partner.riskLevel === 'low' ? '#10b981' : partner.riskLevel === 'medium' ? '#f59e0b' : '#ef4444'}
                      strokeWidth="2"
                      strokeDasharray={`${partner.riskScore}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-slate-900">{partner.riskScore}</span>
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-600">Risk Score</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getRiskColor(partner.riskLevel)}`}>
                  {partner.riskLevel}
                </span>
              </div>
              
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray={`${partner.complianceScore}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-slate-900">{partner.complianceScore}%</span>
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-600">Compliance</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">{partner.totalAccesses.toLocaleString()}</p>
                <p className="text-xs text-slate-600">Total Accesses</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">{partner.anomalies}</p>
                <p className="text-xs text-slate-600">Anomalies</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">{partner.avgResponseTime}ms</p>
                <p className="text-xs text-slate-600">Avg Response</p>
              </div>
            </div>

            {/* Data Types */}
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 mb-2">Data Access</p>
              <div className="flex flex-wrap gap-1">
                {partner.dataTypes.slice(0, 2).map((type, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700">
                    {type}
                  </span>
                ))}
                {partner.dataTypes.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                    +{partner.dataTypes.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-700 mb-2">Certifications</p>
              <div className="flex flex-wrap gap-1">
                {partner.certifications.map((cert, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-slate-600 hover:text-slate-800">
                  <Settings className="w-4 h-4" />
                  <span>Configure</span>
                </button>
              </div>
              
              {partner.anomalies > 0 && (
                <div className="flex items-center space-x-1 text-sm text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{partner.anomalies} alert{partner.anomalies > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No partners found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};