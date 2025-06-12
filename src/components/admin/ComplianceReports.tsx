import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, AlertTriangle, CheckCircle, Clock, Users, Shield } from 'lucide-react';

export const ComplianceReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('gdpr-audit');
  const [dateRange, setDateRange] = useState('30d');
  const [reportFormat, setReportFormat] = useState('pdf');

  const reportTypes = [
    {
      id: 'gdpr-audit',
      name: 'GDPR Compliance Audit',
      description: 'Comprehensive GDPR compliance assessment and audit trail',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 'dpdp-assessment',
      name: 'DPDP Assessment Report',
      description: 'Digital Personal Data Protection Act compliance review',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      id: 'partner-risk',
      name: 'Partner Risk Analysis',
      description: 'Detailed risk assessment of all data sharing partners',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    },
    {
      id: 'access-summary',
      name: 'Data Access Summary',
      description: 'Statistical overview of data access patterns and trends',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    }
  ];

  const complianceMetrics = [
    {
      title: 'GDPR Compliance Score',
      value: '94%',
      change: '+2%',
      trend: 'up',
      description: 'Overall GDPR compliance rating',
      details: [
        { item: 'Data Minimization', status: 'compliant', score: 96 },
        { item: 'Purpose Limitation', status: 'compliant', score: 98 },
        { item: 'Consent Management', status: 'compliant', score: 92 },
        { item: 'Data Subject Rights', status: 'warning', score: 88 }
      ]
    },
    {
      title: 'DPDP Compliance Score',
      value: '91%',
      change: '+1%',
      trend: 'up',
      description: 'Digital Personal Data Protection Act compliance',
      details: [
        { item: 'Data Processing Lawfulness', status: 'compliant', score: 94 },
        { item: 'Data Retention Limits', status: 'compliant', score: 89 },
        { item: 'Cross-border Transfers', status: 'compliant', score: 92 },
        { item: 'Breach Notification', status: 'compliant', score: 88 }
      ]
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Q4 2023 GDPR Audit Report',
      type: 'GDPR Audit',
      generatedDate: '2024-01-10T10:00:00Z',
      size: '2.4 MB',
      format: 'PDF',
      status: 'completed',
      downloadCount: 12
    },
    {
      id: 2,
      name: 'Partner Risk Assessment - December',
      type: 'Risk Analysis',
      generatedDate: '2024-01-05T14:30:00Z',
      size: '1.8 MB',
      format: 'PDF',
      status: 'completed',
      downloadCount: 8
    },
    {
      id: 3,
      name: 'DPDP Compliance Review',
      type: 'DPDP Assessment',
      generatedDate: '2024-01-03T09:15:00Z',
      size: '3.1 MB',
      format: 'PDF',
      status: 'completed',
      downloadCount: 15
    },
    {
      id: 4,
      name: 'Data Access Trends Report',
      type: 'Access Summary',
      generatedDate: '2024-01-01T16:45:00Z',
      size: '1.2 MB',
      format: 'Excel',
      status: 'completed',
      downloadCount: 6
    }
  ];

  const generateReport = () => {
    console.log(`Generating ${selectedReport} report for ${dateRange} in ${reportFormat} format`);
  };

  const downloadReport = (reportId: number) => {
    console.log(`Downloading report ${reportId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-orange-600 bg-orange-100';
      case 'non-compliant':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Report Generation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Generate Compliance Report</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Type Selection */}
          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-4">Select Report Type</h3>
            <div className="space-y-3">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedReport === report.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${report.bgColor} flex items-center justify-center`}>
                      <report.icon className={`w-5 h-5 bg-gradient-to-r ${report.color} bg-clip-text text-transparent`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{report.name}</h4>
                      <p className="text-sm text-slate-600 mt-1">{report.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Report Configuration */}
          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-4">Report Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Format</label>
                <select
                  value={reportFormat}
                  onChange={(e) => setReportFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV Data</option>
                  <option value="json">JSON Export</option>
                </select>
              </div>

              <button
                onClick={generateReport}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {complianceMetrics.map((metric, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{metric.title}</h3>
                <p className="text-sm text-slate-600">{metric.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">{metric.value}</div>
                <div className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {metric.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(detail.status)}`}>
                      {detail.status === 'compliant' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {detail.status}
                    </span>
                    <span className="text-sm font-medium text-slate-900">{detail.item}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{detail.score}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Recent Reports</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{report.name}</p>
                        <p className="text-xs text-slate-500">{report.format}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{formatDate(report.generatedDate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-900">{report.size}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-900">{report.downloadCount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => downloadReport(report.id)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};