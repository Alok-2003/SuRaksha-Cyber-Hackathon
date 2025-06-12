import React, { useState } from 'react';
import { Eye, Clock, MapPin, FileText, Download, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface AccessHistoryProps {
  searchQuery: string;
}

export const AccessHistory: React.FC<AccessHistoryProps> = ({ searchQuery }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const accessHistory = [
    {
      id: 1,
      partner: 'FinanceFlow Bank',
      logo: 'FB',
      purpose: 'Credit Assessment',
      dataType: 'Transaction History',
      accessDate: '2024-01-15T10:30:00Z',
      duration: '30 days',
      status: 'active',
      location: 'London, UK',
      ipAddress: '192.168.1.100',
      details: 'Accessed for mortgage application review'
    },
    {
      id: 2,
      partner: 'CreditScope Analytics',
      logo: 'CS',
      purpose: 'Risk Evaluation',
      dataType: 'Credit Profile',
      accessDate: '2024-01-14T15:45:00Z',
      duration: '45 days',
      status: 'active',
      location: 'New York, US',
      ipAddress: '192.168.1.101',
      details: 'Credit score analysis for insurance purposes'
    },
    {
      id: 3,
      partner: 'InvestTrack Pro',
      logo: 'IT',
      purpose: 'Portfolio Analysis',
      dataType: 'Investment Data',
      accessDate: '2024-01-12T09:15:00Z',
      duration: '60 days',
      status: 'expired',
      location: 'Singapore',
      ipAddress: '192.168.1.102',
      details: 'Investment portfolio optimization service'
    },
    {
      id: 4,
      partner: 'SecurePayments Ltd',
      logo: 'SP',
      purpose: 'Fraud Prevention',
      dataType: 'Payment History',
      accessDate: '2024-01-10T14:20:00Z',
      duration: '90 days',
      status: 'revoked',
      location: 'Dublin, IE',
      ipAddress: '192.168.1.103',
      details: 'Payment pattern analysis for fraud detection'
    }
  ];

  const filteredHistory = accessHistory.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dataType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || item.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'expired':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'revoked':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-orange-100 text-orange-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-700">Filter by status:</span>
          <div className="flex space-x-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'active', label: 'Active' },
              { key: 'expired', label: 'Expired' },
              { key: 'revoked', label: 'Revoked' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-slate-500">
          {filteredHistory.length} of {accessHistory.length} records
        </div>
      </div>

      {/* Access History Cards */}
      <div className="space-y-4">
        {filteredHistory.map((access) => (
          <div key={access.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-700">{access.logo}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-slate-900">{access.partner}</h3>
                    {getStatusIcon(access.status)}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{access.details}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{access.dataType}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(access.accessDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{access.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(access.status)}`}>
                  {access.status}
                </span>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Purpose:</span>
                  <p className="font-medium text-slate-900">{access.purpose}</p>
                </div>
                <div>
                  <span className="text-slate-500">Duration:</span>
                  <p className="font-medium text-slate-900">{access.duration}</p>
                </div>
                <div>
                  <span className="text-slate-500">IP Address:</span>
                  <p className="font-medium text-slate-900">{access.ipAddress}</p>
                </div>
              </div>
              
              {access.status === 'active' && (
                <div className="pt-3 border-t border-slate-200">
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1">
                    <XCircle className="w-4 h-4" />
                    <span>Revoke Access</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center py-12">
          <Eye className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No access records found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};