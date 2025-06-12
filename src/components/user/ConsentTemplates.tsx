import React, { useState } from 'react';
import { FileText, Plus, Edit3, Copy, Trash2, Shield, Clock, Users, CheckCircle } from 'lucide-react';

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
        <button
          onClick={() => setShowNewTemplate(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Template</span>
        </button>
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
    </div>
  );
};