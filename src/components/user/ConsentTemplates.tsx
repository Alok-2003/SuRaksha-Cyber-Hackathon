import React, { useState } from 'react';
import { FileText, Plus, Edit3, Copy, Trash2, Shield, Clock, Users, CheckCircle, BarChart3, Download, Calendar, Filter, TrendingUp, AlertTriangle, Eye, FileCheck, X } from 'lucide-react';
import jsPDF from 'jspdf';

export const ConsentTemplates: React.FC = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'GDPR Banking Standard',
      description: 'Compliant template for banking institutions under GDPR',
      category: 'Banking',
      regulation: 'GDPR',
      isDefault: true,
      usageCount: 12,
      lastModified: '2024-01-10',
      dataTypes: ['Transaction History', 'Account Information', 'Personal Details'],
      maxDuration: 90,
      purposes: ['Credit Assessment', 'Risk Analysis', 'Compliance Reporting'],
      template: {
        title: 'Banking Data Access Consent',
        description: 'This consent allows the partner to access your banking data for specified purposes.',
        dataRetentionPeriod: '90 days',
        rightsNotice: 'You have the right to withdraw consent at any time.',
        contactInfo: 'privacy@bank.com'
      }
    },
    {
      id: 2,
      name: 'DPDP Investment Services',
      description: 'Template for investment and wealth management services',
      category: 'Investment',
      regulation: 'DPDP',
      isDefault: false,
      usageCount: 8,
      lastModified: '2024-01-08',
      dataTypes: ['Portfolio Data', 'Investment History', 'Risk Profile'],
      maxDuration: 180,
      purposes: ['Investment Advisory', 'Portfolio Management', 'Risk Assessment'],
      template: {
        title: 'Investment Advisory Consent',
        description: 'Consent for accessing investment data for advisory services.',
        dataRetentionPeriod: '180 days',
        rightsNotice: 'Data subject rights as per DPDP Act 2023.',
        contactInfo: 'dpo@investment.com'
      }
    },
    {
      id: 3,
      name: 'Insurance Analytics',
      description: 'Specialized template for insurance risk assessment',
      category: 'Insurance',
      regulation: 'GDPR',
      isDefault: false,
      usageCount: 5,
      lastModified: '2024-01-05',
      dataTypes: ['Credit Score', 'Payment History', 'Demographic Data'],
      maxDuration: 60,
      purposes: ['Risk Assessment', 'Premium Calculation', 'Underwriting'],
      template: {
        title: 'Insurance Risk Assessment Consent',
        description: 'Consent for insurance risk evaluation and premium calculation.',
        dataRetentionPeriod: '60 days',
        rightsNotice: 'Rights under GDPR including right to erasure.',
        contactInfo: 'privacy@insurance.com'
      }
    }
  ]);

  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<number | null>(null);
  const [showComplianceReport, setShowComplianceReport] = useState(false);
  const [reportDateRange, setReportDateRange] = useState('last30days');
  const [selectedRegulation, setSelectedRegulation] = useState('all');
  const [reportType, setReportType] = useState('summary');

  const duplicateTemplate = (id: number) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      const newTemplate = {
        ...template,
        id: Math.max(...templates.map(t => t.id)) + 1,
        name: `${template.name} (Copy)`,
        isDefault: false,
        usageCount: 0,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setTemplates([...templates, newTemplate]);
    }
  };

  const deleteTemplate = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const getRegulationColor = (regulation: string) => {
    switch (regulation) {
      case 'GDPR':
        return 'bg-blue-100 text-blue-800';
      case 'DPDP':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock compliance data for reporting
  const complianceData = {
    totalConsents: 1247,
    activeConsents: 892,
    expiredConsents: 355,
    withdrawnConsents: 67,
    gdprCompliance: 98.5,
    dpdpCompliance: 96.2,
    dataBreaches: 0,
    auditFindings: 2,
    monthlyTrends: [
      { month: 'Jan', consents: 120, breaches: 0, audits: 1 },
      { month: 'Feb', consents: 135, breaches: 0, audits: 0 },
      { month: 'Mar', consents: 142, breaches: 0, audits: 1 },
      { month: 'Apr', consents: 158, breaches: 0, audits: 0 },
      { month: 'May', consents: 167, breaches: 0, audits: 0 },
      { month: 'Jun', consents: 175, breaches: 0, audits: 0 }
    ],
    riskAssessment: {
      high: 12,
      medium: 45,
      low: 835
    },
    dataTypes: {
      'Personal Information': 567,
      'Financial Data': 423,
      'Transaction History': 389,
      'Contact Details': 298,
      'Behavioral Data': 156
    }
  };

  const generateComplianceReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      dateRange: reportDateRange,
      regulation: selectedRegulation,
      type: reportType,
      summary: complianceData,
      recommendations: [
        'Review and update 12 consents expiring in next 30 days',
        'Conduct quarterly compliance audit for GDPR requirements',
        'Update privacy notices for 2 medium-risk data categories',
        'Implement automated consent renewal notifications'
      ]
    };
    
    // Generate elegant PDF report
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 25;
    const centerX = pageWidth / 2;
    let yPosition = 40;
    
    // Color scheme
    const colors = {
      primary: [41, 128, 185] as [number, number, number],    // Professional blue
      secondary: [52, 73, 94] as [number, number, number],    // Dark gray
      accent: [46, 204, 113] as [number, number, number],     // Green
      warning: [241, 196, 15] as [number, number, number],    // Yellow
      danger: [231, 76, 60] as [number, number, number],      // Red
      light: [236, 240, 241] as [number, number, number],     // Light gray
      text: [44, 62, 80] as [number, number, number]          // Dark text
    };
    
    // Helper functions
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const maxWidth = options.maxWidth || (pageWidth - 2 * margin);
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y, options);
      return y + (lines.length * (options.lineHeight || 6)) + (options.marginBottom || 0);
    };
    
    const addSection = (title: string, y: number) => {
      // Section background
      pdf.setFillColor(...colors.primary);
      pdf.rect(margin, y - 5, pageWidth - 2 * margin, 12, 'F');
      
      // Section title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title, margin + 5, y + 3);
      
      // Reset text color
      pdf.setTextColor(...colors.text);
      return y + 20;
    };
    
    const addTable = (headers: string[], rows: string[][], startY: number) => {
      const colWidth = (pageWidth - 2 * margin) / headers.length;
      let currentY = startY;
      
      // Header row
      pdf.setFillColor(...colors.secondary);
      pdf.rect(margin, currentY, pageWidth - 2 * margin, 10, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      
      headers.forEach((header, i) => {
        pdf.text(header, margin + (i * colWidth) + 3, currentY + 7);
      });
      
      currentY += 10;
      
      // Data rows
      pdf.setTextColor(...colors.text);
      pdf.setFont('helvetica', 'normal');
      
      rows.forEach((row, rowIndex) => {
        if (rowIndex % 2 === 0) {
          pdf.setFillColor(...colors.light);
          pdf.rect(margin, currentY, pageWidth - 2 * margin, 8, 'F');
        }
        
        row.forEach((cell, i) => {
          pdf.text(cell, margin + (i * colWidth) + 3, currentY + 6);
        });
        
        currentY += 8;
      });
      
      return currentY + 10;
    };
    
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 40) {
        pdf.addPage();
        yPosition = 40;
        return true;
      }
      return false;
    };
    
    // === COVER PAGE ===
    // Company header with logo placeholder
    pdf.setFillColor(...colors.primary);
    pdf.rect(0, 0, pageWidth, 60, 'F');
    
    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('COMPLIANCE REPORT', centerX, 25, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Data Privacy & Security Assessment', centerX, 40, { align: 'center' });
    
    // Report metadata box
    yPosition = 80;
    pdf.setFillColor(...colors.light);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 60, 'F');
    pdf.setDrawColor(...colors.secondary);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 60, 'S');
    
    pdf.setTextColor(...colors.text);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    
    const reportInfo = [
      ['Report Type:', reportType.charAt(0).toUpperCase() + reportType.slice(1)],
      ['Date Range:', reportDateRange.replace(/([a-z])([0-9])/g, '$1 $2').replace(/([0-9])([a-z])/g, '$1 $2')],
      ['Regulation Focus:', selectedRegulation.toUpperCase()],
      ['Generated On:', new Date().toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
      })],
      ['Generated At:', new Date().toLocaleTimeString('en-US')]
    ];
    
    reportInfo.forEach(([label, value], index) => {
      const y = yPosition + 15 + (index * 10);
      pdf.text(label, margin + 10, y);
      pdf.setFont('helvetica', 'normal');
      pdf.text(value, margin + 80, y);
      pdf.setFont('helvetica', 'bold');
    });
    
    // Confidentiality notice
    yPosition = 180;
    pdf.setFillColor(255, 243, 205); // Light yellow
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 30, 'F');
    pdf.setDrawColor(...colors.warning);
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 30, 'S');
    
    pdf.setTextColor(...colors.text);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CONFIDENTIAL', margin + 10, yPosition + 12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('This report contains sensitive compliance information and should be handled according to', margin + 10, yPosition + 22);
    pdf.text('your organization\'s data classification and handling policies.', margin + 10, yPosition + 30);
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text('Generated by SuRaksha Cyber Security Platform', centerX, pageHeight - 20, { align: 'center' });
    
    // Start new page for content
    pdf.addPage();
    yPosition = 40;
    
    // === EXECUTIVE SUMMARY ===
    yPosition = addSection('EXECUTIVE SUMMARY', yPosition);
    
    // Summary metrics table
    const summaryHeaders = ['Metric', 'Count', 'Status'];
    const summaryRows = [
      ['Total Consents', complianceData.totalConsents.toLocaleString(), '✓ Tracked'],
      ['Active Consents', complianceData.activeConsents.toLocaleString(), '✓ Compliant'],
      ['Expired Consents', complianceData.expiredConsents.toString(), '⚠ Review Required'],
      ['Withdrawn Consents', complianceData.withdrawnConsents.toString(), '✓ Processed'],
      ['Data Breaches', complianceData.dataBreaches.toString(), complianceData.dataBreaches === 0 ? '✓ No Incidents' : '⚠ Action Required']
    ];
    
    yPosition = addTable(summaryHeaders, summaryRows, yPosition);
    
    // Key insights
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...colors.text);
    const activePercentage = ((complianceData.activeConsents / complianceData.totalConsents) * 100).toFixed(1);
    yPosition = addText(`Key Insight: ${activePercentage}% of consents are currently active, indicating strong user engagement and compliance.`, margin, yPosition, { marginBottom: 15 });
    
    checkPageBreak(80);
    
    // === COMPLIANCE SCORES ===
    yPosition = addSection('COMPLIANCE SCORES', yPosition);
    
    // Compliance scores with visual indicators
    const complianceHeaders = ['Regulation', 'Score', 'Status', 'Action Required'];
    const complianceRows = [
      ['GDPR', `${complianceData.gdprCompliance}%`, complianceData.gdprCompliance >= 95 ? '✓ Excellent' : '⚠ Needs Attention', complianceData.gdprCompliance >= 95 ? 'Maintain current practices' : 'Review data processing activities'],
      ['DPDP', `${complianceData.dpdpCompliance}%`, complianceData.dpdpCompliance >= 95 ? '✓ Excellent' : '⚠ Needs Attention', complianceData.dpdpCompliance >= 95 ? 'Maintain current practices' : 'Update consent mechanisms']
    ];
    
    yPosition = addTable(complianceHeaders, complianceRows, yPosition);
    
    checkPageBreak(100);
    
    // === RISK ASSESSMENT ===
    yPosition = addSection('RISK ASSESSMENT', yPosition);
    
    const riskHeaders = ['Risk Level', 'Count', 'Percentage', 'Priority'];
    const totalRisk = complianceData.riskAssessment.high + complianceData.riskAssessment.medium + complianceData.riskAssessment.low;
    const riskRows = [
      ['High Risk', complianceData.riskAssessment.high.toString(), `${((complianceData.riskAssessment.high / totalRisk) * 100).toFixed(1)}%`, '⚠ Immediate Action'],
      ['Medium Risk', complianceData.riskAssessment.medium.toString(), `${((complianceData.riskAssessment.medium / totalRisk) * 100).toFixed(1)}%`, '⚠ Monitor Closely'],
      ['Low Risk', complianceData.riskAssessment.low.toString(), `${((complianceData.riskAssessment.low / totalRisk) * 100).toFixed(1)}%`, '✓ Standard Monitoring']
    ];
    
    yPosition = addTable(riskHeaders, riskRows, yPosition);
    
    checkPageBreak(100);
    
    // === DATA TYPES DISTRIBUTION ===
    yPosition = addSection('DATA TYPES DISTRIBUTION', yPosition);
    
    const dataTypeHeaders = ['Data Type', 'Count', 'Percentage', 'Compliance Status'];
    const totalDataTypes = Object.values(complianceData.dataTypes).reduce((sum, count) => sum + count, 0);
    const dataTypeRows = Object.entries(complianceData.dataTypes).map(([type, count]) => [
      type,
      count.toString(),
      `${((count / totalDataTypes) * 100).toFixed(1)}%`,
      '✓ Compliant'
    ]);
    
    yPosition = addTable(dataTypeHeaders, dataTypeRows, yPosition);
    
    checkPageBreak(120);
    
    // === RECOMMENDATIONS ===
    yPosition = addSection('RECOMMENDATIONS', yPosition);
    
    // Structured recommendations with priority levels
    const recommendationHeaders = ['Priority', 'Recommendation', 'Timeline', 'Impact'];
    const recommendationRows = reportData.recommendations.map((rec, index) => {
      const priorities = ['High', 'Medium', 'Low'];
      const timelines = ['Immediate', '30 days', '90 days'];
      const impacts = ['Critical', 'Moderate', 'Low'];
      return [
        priorities[index % 3],
        rec,
        timelines[index % 3],
        impacts[index % 3]
      ];
    });
    
    yPosition = addTable(recommendationHeaders, recommendationRows, yPosition);
    
    checkPageBreak(100);
    
    // === MONTHLY TRENDS ===
    yPosition = addSection('MONTHLY TRENDS', yPosition);
    
    const trendsHeaders = ['Month', 'New Consents', 'Audits Completed', 'Compliance Score', 'Trend'];
    const trendsRows = complianceData.monthlyTrends.map((month, index) => {
      const prevScore = index > 0 ? 95 + (index - 1) * 0.5 : 95;
      const currentScore = 95 + index * 0.5;
      const trend = currentScore > prevScore ? '↑ Improving' : currentScore < prevScore ? '↓ Declining' : '→ Stable';
      return [
        month.month,
        month.consents.toString(),
        month.audits.toString(),
        `${currentScore.toFixed(1)}%`,
        trend
      ];
    });
    
    yPosition = addTable(trendsHeaders, trendsRows, yPosition);
    
    // === FOOTER WITH PAGE NUMBERS ===
    const pageCount = (pdf as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...colors.secondary);
      
      // Page number (right aligned)
      pdf.text(`Page ${i} of ${pageCount}`, pageWidth - 30, pdf.internal.pageSize.getHeight() - 10, { align: 'right' });
      
      // Confidentiality notice (left aligned)
      pdf.text('CONFIDENTIAL - SuRaksha Compliance Report', margin, pdf.internal.pageSize.getHeight() - 10);
      
      // Generation timestamp (center)
      const genTime = new Date().toLocaleString();
      pdf.text(`Generated: ${genTime}`, pageWidth / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `compliance-report-${reportType}-${timestamp}.pdf`;
    
    // Download the PDF
    pdf.save(filename);
    
    console.log('PDF compliance report generated:', reportData);
    alert(`Compliance report downloaded as ${filename}`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Banking':
        return '🏦';
      case 'Investment':
        return '📈';
      case 'Insurance':
        return '🛡️';
      default:
        return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Consent Templates</h2>
          <p className="text-slate-600 mt-1">Pre-configured templates for different data sharing scenarios</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowComplianceReport(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Compliance Report</span>
          </button>
          <button
            onClick={() => setShowNewTemplate(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Template</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{templates.length}</p>
              <p className="text-sm text-slate-600">Total Templates</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{templates.filter(t => t.regulation === 'GDPR').length}</p>
              <p className="text-sm text-slate-600">GDPR Compliant</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{templates.filter(t => t.regulation === 'DPDP').length}</p>
              <p className="text-sm text-slate-600">DPDP Compliant</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{templates.reduce((sum, t) => sum + t.usageCount, 0)}</p>
              <p className="text-sm text-slate-600">Times Used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            {/* Template Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getCategoryIcon(template.category)}</div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-slate-900">{template.name}</h3>
                    {template.isDefault && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{template.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setEditingTemplate(template.id)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => duplicateTemplate(template.id)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {!template.isDefault && (
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Template Details */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRegulationColor(template.regulation)}`}>
                  {template.regulation}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                  {template.category}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <Clock className="w-3 h-3 mr-1" />
                  {template.maxDuration} days max
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Data Types</p>
                  <div className="space-y-1">
                    {template.dataTypes.slice(0, 2).map((type, index) => (
                      <p key={index} className="text-slate-700 text-xs">{type}</p>
                    ))}
                    {template.dataTypes.length > 2 && (
                      <p className="text-slate-500 text-xs">+{template.dataTypes.length - 2} more</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-slate-500 mb-1">Usage</p>
                  <p className="text-slate-700">{template.usageCount} times</p>
                  <p className="text-slate-500 text-xs">Last: {template.lastModified}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    {template.purposes.length} purposes defined
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Template Modal */}
      {showNewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Create New Template</h3>
              <p className="text-slate-600 mt-1">Design a custom consent template for your specific use case.</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Template Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Custom Banking Template"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Regulation</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="GDPR">GDPR</option>
                    <option value="DPDP">DPDP</option>
                    <option value="CCPA">CCPA</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe when this template should be used..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowNewTemplate(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Report Modal */}
      {showComplianceReport && (
        <div className="fixed inset-0 -top-6 bg-black bg-opacity-50 flex items-center mt-0 justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-semibold text-slate-900 mt-1">Comprehensive compliance reporting and analytics</p>
                </div>
                <button
                  onClick={() => setShowComplianceReport(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Report Controls */}
              <div className="mb-6 bg-slate-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date Range
                    </label>
                    <select 
                      value={reportDateRange}
                      onChange={(e) => setReportDateRange(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="last7days">Last 7 Days</option>
                      <option value="last30days">Last 30 Days</option>
                      <option value="last90days">Last 90 Days</option>
                      <option value="last12months">Last 12 Months</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Filter className="w-4 h-4 inline mr-1" />
                      Regulation
                    </label>
                    <select 
                      value={selectedRegulation}
                      onChange={(e) => setSelectedRegulation(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">All Regulations</option>
                      <option value="gdpr">GDPR Only</option>
                      <option value="dpdp">DPDP Only</option>
                      <option value="ccpa">CCPA Only</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <FileCheck className="w-4 h-4 inline mr-1" />
                      Report Type
                    </label>
                    <select 
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="summary">Executive Summary</option>
                      <option value="detailed">Detailed Analysis</option>
                      <option value="audit">Audit Report</option>
                      <option value="risk">Risk Assessment</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={generateComplianceReport}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Generate Report</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{complianceData.totalConsents.toLocaleString()}</p>
                      <p className="text-sm text-blue-700">Total Consents</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="mt-2 flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+12% this month</span>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-900">{complianceData.activeConsents.toLocaleString()}</p>
                      <p className="text-sm text-green-700">Active Consents</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="mt-2 flex items-center">
                    <Eye className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="text-xs text-blue-600">{((complianceData.activeConsents/complianceData.totalConsents)*100).toFixed(1)}% of total</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-yellow-900">{complianceData.expiredConsents}</p>
                      <p className="text-sm text-yellow-700">Expired Consents</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="mt-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="text-xs text-orange-600">Requires attention</span>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-red-900">{complianceData.dataBreaches}</p>
                      <p className="text-sm text-red-700">Data Breaches</p>
                    </div>
                    <Shield className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="mt-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">No incidents</span>
                  </div>
                </div>
              </div>

              {/* Compliance Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-4">Compliance Scores</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">GDPR Compliance</span>
                        <span className="text-sm font-bold text-green-600">{complianceData.gdprCompliance}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{width: `${complianceData.gdprCompliance}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">DPDP Compliance</span>
                        <span className="text-sm font-bold text-blue-600">{complianceData.dpdpCompliance}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{width: `${complianceData.dpdpCompliance}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-4">Risk Assessment</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-700">High Risk</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {complianceData.riskAssessment.high} consents
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-700">Medium Risk</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {complianceData.riskAssessment.medium} consents
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-700">Low Risk</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {complianceData.riskAssessment.low} consents
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Types Breakdown */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-slate-900 mb-4">Data Types Distribution</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(complianceData.dataTypes).map(([type, count]) => (
                    <div key={type} className="text-center">
                      <div className="bg-slate-100 rounded-lg p-3 mb-2">
                        <p className="text-lg font-bold text-slate-900">{count}</p>
                      </div>
                      <p className="text-xs text-slate-600">{type}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Trends */}
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-4">Monthly Trends</h4>
                <div className="grid grid-cols-6 gap-4">
                  {complianceData.monthlyTrends.map((month) => (
                    <div key={month.month} className="text-center">
                      <div className="bg-blue-100 rounded-lg p-3 mb-2">
                        <p className="text-sm font-bold text-blue-900">{month.consents}</p>
                        <p className="text-xs text-blue-600">Consents</p>
                      </div>
                      <p className="text-xs text-slate-600">{month.month}</p>
                      {month.audits > 0 && (
                        <div className="mt-1">
                          <span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                            {month.audits} audit{month.audits > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowComplianceReport(false)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={generateComplianceReport}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};