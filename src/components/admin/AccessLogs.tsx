import React, { useState } from 'react';
import { Eye, Filter, Download, Search, Calendar, MapPin, Clock, User, FileText, AlertTriangle } from 'lucide-react';

interface AccessLogsProps {
  searchQuery: string;
  timeRange: string;
}

export const AccessLogs: React.FC<AccessLogsProps> = ({ searchQuery, timeRange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    partner: 'all',
    dataType: 'all',
    status: 'all',
    riskLevel: 'all'
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const accessLogs = [
    {
      id: 1,
      timestamp: '2024-01-15T14:30:15Z',
      partner: 'FinanceFlow Bank',
      partnerLogo: 'FB',
      userId: 'user_12345',
      dataType: 'Transaction History',
      purpose: 'Credit Assessment',
      status: 'success',
      riskLevel: 'low',
      ipAddress: '192.168.1.100',
      location: 'London, UK',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      recordsAccessed: 247,
      responseTime: 120,
      apiEndpoint: '/api/v1/transactions',
      method: 'GET'
    },
    {
      id: 2,
      timestamp: '2024-01-15T14:28:42Z',
      partner: 'CreditScope Analytics',
      partnerLogo: 'CS',
      userId: 'user_67890',
      dataType: 'Credit Profile',
      purpose: 'Risk Assessment',
      status: 'blocked',
      riskLevel: 'high',
      ipAddress: '192.168.1.101',
      location: 'New York, US',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      recordsAccessed: 0,
      responseTime: 0,
      apiEndpoint: '/api/v1/credit-profile',
      method: 'GET',
      blockReason: 'Unusual access pattern detected'
    },
    {
      id: 3,
      timestamp: '2024-01-15T14:25:33Z',
      partner: 'InvestTrack Pro',
      partnerLogo: 'IT',
      userId: 'user_11111',
      dataType: 'Portfolio Data',
      purpose: 'Investment Advisory',
      status: 'success',
      riskLevel: 'medium',
      ipAddress: '192.168.1.102',
      location: 'Singapore',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      recordsAccessed: 89,
      responseTime: 180,
      apiEndpoint: '/api/v1/portfolio',
      method: 'GET'
    },
    {
      id: 4,
      timestamp: '2024-01-15T14:22:18Z',
      partner: 'SecurePayments Ltd',
      partnerLogo: 'SP',
      userId: 'user_22222',
      dataType: 'Payment History',
      purpose: 'Fraud Prevention',
      status: 'warning',
      riskLevel: 'low',
      ipAddress: '192.168.1.103',
      location: 'Dublin, IE',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      recordsAccessed: 156,
      responseTime: 95,
      apiEndpoint: '/api/v1/payments',
      method: 'POST',
      warningReason: 'Rate limit approaching'
    }
  ];

  const filteredLogs = accessLogs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.dataType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPartner = selectedFilters.partner === 'all' || log.partner === selectedFilters.partner;
    const matchesDataType = selectedFilters.dataType === 'all' || log.dataType === selectedFilters.dataType;
    const matchesStatus = selectedFilters.status === 'all' || log.status === selectedFilters.status;
    const matchesRisk = selectedFilters.riskLevel === 'all' || log.riskLevel === selectedFilters.riskLevel;
    
    return matchesSearch && matchesPartner && matchesDataType && matchesStatus && matchesRisk;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600';
      case 'medium':
        return 'text-orange-600';
      case 'high':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const exportLogs = () => {
    // Implementation for exporting logs
    console.log('Exporting logs...');
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </button>
          
          <button
            onClick={exportLogs}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
        
        <div className="text-sm text-slate-500">
          {filteredLogs.length} of {accessLogs.length} logs
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Advanced Filters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Partner</label>
              <select
                value={selectedFilters.partner}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, partner: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Partners</option>
                <option value="FinanceFlow Bank">FinanceFlow Bank</option>
                <option value="CreditScope Analytics">CreditScope Analytics</option>
                <option value="InvestTrack Pro">InvestTrack Pro</option>
                <option value="SecurePayments Ltd">SecurePayments Ltd</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Data Type</label>
              <select
                value={selectedFilters.dataType}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, dataType: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Data Types</option>
                <option value="Transaction History">Transaction History</option>
                <option value="Credit Profile">Credit Profile</option>
                <option value="Portfolio Data">Portfolio Data</option>
                <option value="Payment History">Payment History</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={selectedFilters.status}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="blocked">Blocked</option>
                <option value="error">Error</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Risk Level</label>
              <select
                value={selectedFilters.riskLevel}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, riskLevel: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Access Logs Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Data Access
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Records
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{formatTimestamp(log.timestamp)}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-700">{log.partnerLogo}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{log.partner}</p>
                        <p className="text-xs text-slate-500">{log.userId}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{log.dataType}</p>
                      <p className="text-xs text-slate-500">{log.purpose}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-xs text-slate-400">{log.method}</span>
                        <span className={`text-xs font-medium ${getRiskColor(log.riskLevel)}`}>
                          {log.riskLevel} risk
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                      {(log.blockReason || log.warningReason) && (
                        <p className="text-xs text-slate-500 max-w-32 truncate">
                          {log.blockReason || log.warningReason}
                        </p>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-900">{log.location}</p>
                        <p className="text-xs text-slate-500">{log.ipAddress}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-900">{log.recordsAccessed}</p>
                      <p className="text-xs text-slate-500">{log.responseTime}ms</p>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {log.status === 'blocked' && (
                        <button className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-12">
          <Eye className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No access logs found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};