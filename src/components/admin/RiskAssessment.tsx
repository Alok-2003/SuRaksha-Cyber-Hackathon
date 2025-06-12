import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Shield, Users, Eye, Settings, Target, Zap } from 'lucide-react';

export const RiskAssessment: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const riskMetrics = [
    {
      title: 'Overall Risk Score',
      value: 67,
      change: -5,
      trend: 'down',
      description: 'Weighted average across all partners',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'High Risk Partners',
      value: 4,
      change: -1,
      trend: 'down',
      description: 'Partners with risk score < 50',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Data Exposure Risk',
      value: 23,
      change: +2,
      trend: 'up',
      description: 'Percentage of sensitive data at risk',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Compliance Risk',
      value: 12,
      change: -3,
      trend: 'down',
      description: 'Risk of regulatory non-compliance',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const riskFactors = [
    {
      id: 1,
      category: 'Security',
      factor: 'Weak Authentication',
      impact: 'high',
      likelihood: 'medium',
      riskScore: 75,
      affectedPartners: 3,
      description: 'Partners using basic authentication methods',
      mitigation: 'Enforce MFA requirements',
      timeline: '30 days'
    },
    {
      id: 2,
      category: 'Compliance',
      factor: 'Data Retention Violations',
      impact: 'high',
      likelihood: 'low',
      riskScore: 45,
      affectedPartners: 2,
      description: 'Partners exceeding agreed retention periods',
      mitigation: 'Automated data deletion policies',
      timeline: '14 days'
    },
    {
      id: 3,
      category: 'Operational',
      factor: 'Excessive Data Access',
      impact: 'medium',
      likelihood: 'high',
      riskScore: 68,
      affectedPartners: 5,
      description: 'Partners accessing more data than necessary',
      mitigation: 'Implement data minimization controls',
      timeline: '45 days'
    },
    {
      id: 4,
      category: 'Technical',
      factor: 'Unencrypted Data Transfer',
      impact: 'high',
      likelihood: 'low',
      riskScore: 35,
      affectedPartners: 1,
      description: 'Partner using insecure data transmission',
      mitigation: 'Mandate TLS 1.3 encryption',
      timeline: '7 days'
    }
  ];

  const partnerRiskProfiles = [
    {
      id: 1,
      name: 'CreditScope Analytics',
      logo: 'CS',
      overallRisk: 45,
      riskLevel: 'high',
      factors: {
        security: 35,
        compliance: 55,
        operational: 40,
        technical: 50
      },
      recentChanges: [
        { factor: 'Security', change: -10, reason: 'Implemented MFA' },
        { factor: 'Compliance', change: +5, reason: 'Missed audit deadline' }
      ],
      recommendations: [
        'Upgrade security infrastructure',
        'Improve compliance monitoring',
        'Reduce data access scope'
      ]
    },
    {
      id: 2,
      name: 'FinanceFlow Bank',
      logo: 'FB',
      overallRisk: 85,
      riskLevel: 'low',
      factors: {
        security: 90,
        compliance: 88,
        operational: 82,
        technical: 80
      },
      recentChanges: [
        { factor: 'Technical', change: +5, reason: 'Infrastructure upgrade' },
        { factor: 'Operational', change: +2, reason: 'Process improvements' }
      ],
      recommendations: [
        'Maintain current security standards',
        'Consider expanding data access'
      ]
    },
    {
      id: 3,
      name: 'InvestTrack Pro',
      logo: 'IT',
      overallRisk: 72,
      riskLevel: 'medium',
      factors: {
        security: 75,
        compliance: 70,
        operational: 68,
        technical: 75
      },
      recentChanges: [
        { factor: 'Compliance', change: +8, reason: 'Updated privacy policies' },
        { factor: 'Security', change: -3, reason: 'Minor security incident' }
      ],
      recommendations: [
        'Enhance incident response procedures',
        'Regular security assessments',
        'Improve data handling processes'
      ]
    }
  ];

  const filteredFactors = riskFactors.filter(factor => 
    selectedCategory === 'all' || factor.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} bg-opacity-10 flex items-center justify-center`}>
                <AlertTriangle className={`w-6 h-6 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                metric.trend === 'up' ? 'text-red-600' : 'text-green-600'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(metric.change)}</span>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{metric.value}{typeof metric.value === 'number' && metric.value <= 100 ? '%' : ''}</h3>
              <p className="text-sm font-medium text-slate-600 mb-2">{metric.title}</p>
              <p className="text-xs text-slate-500">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Factors */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Risk Factors Analysis</h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="security">Security</option>
              <option value="compliance">Compliance</option>
              <option value="operational">Operational</option>
              <option value="technical">Technical</option>
            </select>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredFactors.map((factor) => (
            <div key={factor.id} className="border border-slate-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{factor.factor}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {factor.category}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(factor.impact)}`}>
                      {factor.impact} impact
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLikelihoodColor(factor.likelihood)}`}>
                      {factor.likelihood} likelihood
                    </span>
                  </div>
                  <p className="text-slate-600 mb-3">{factor.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Affected Partners:</span>
                      <p className="font-medium text-slate-900">{factor.affectedPartners}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Mitigation:</span>
                      <p className="font-medium text-slate-900">{factor.mitigation}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Timeline:</span>
                      <p className="font-medium text-slate-900">{factor.timeline}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center ml-6">
                  <div className="relative w-16 h-16">
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
                        stroke={factor.riskScore >= 70 ? '#ef4444' : factor.riskScore >= 50 ? '#f59e0b' : '#10b981'}
                        strokeWidth="2"
                        strokeDasharray={`${factor.riskScore}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-900">{factor.riskScore}</span>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-slate-600 mt-1">Risk Score</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Risk Profiles */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Partner Risk Profiles</h2>
        
        <div className="space-y-6">
          {partnerRiskProfiles.map((partner) => (
            <div key={partner.id} className="border border-slate-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-700">{partner.logo}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{partner.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(partner.overallRisk)}`}>
                        {partner.riskLevel} risk
                      </span>
                    </div>
                    <div className="text-sm text-slate-600">
                      Overall Risk Score: <span className="font-semibold">{partner.overallRisk}/100</span>
                    </div>
                  </div>
                </div>
                
                <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>

              {/* Risk Factor Breakdown */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {Object.entries(partner.factors).map(([factor, score]) => (
                  <div key={factor} className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900 mb-1">{score}</div>
                    <div className="text-xs font-medium text-slate-600 capitalize">{factor}</div>
                  </div>
                ))}
              </div>

              {/* Recent Changes */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Recent Changes</h4>
                <div className="space-y-2">
                  {partner.recentChanges.map((change, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{change.factor}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${change.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {change.change > 0 ? '+' : ''}{change.change}
                        </span>
                        <span className="text-slate-500">({change.reason})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Recommendations</h4>
                <div className="flex flex-wrap gap-2">
                  {partner.recommendations.map((rec, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Target className="w-3 h-3 mr-1" />
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};