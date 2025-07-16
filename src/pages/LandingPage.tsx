import React, { useEffect } from 'react';
import { Shield, Eye, Users, Lock, CheckCircle, ArrowRight, Star, TrendingUp, Zap, FileText, AlertTriangle, BarChart3 } from 'lucide-react';

const LandingPage: React.FC = () => {
  useEffect(() => {
    // Make API call to the securelink prediction API
    const fetchPrediction = async () => {
      try {
        const response = await fetch('https://securelink-prediction-api.onrender.com/');
        const data = await response.json();
        console.log('Prediction API response:', data);
      } catch (error) {
        console.error('Error fetching prediction data:', error);
      }
    };

    fetchPrediction();
  }, []);
  const features = [
    {
      icon: Shield,
      title: 'Privacy-First Architecture',
      description: 'Built with GDPR and DPDP compliance at its core, ensuring your data rights are always protected.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Eye,
      title: 'Real-Time Monitoring',
      description: 'Track who accesses your data in real-time with comprehensive audit trails and instant notifications.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Partner Management',
      description: 'Manage data sharing partnerships with granular controls and automated compliance monitoring.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Lock,
      title: 'Instant Revocation',
      description: 'Revoke data access instantly with one click, giving you complete control over your information.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: BarChart3,
      title: 'AI Risk Assessment',
      description: 'Advanced AI algorithms continuously assess partner risk levels and detect anomalous behavior.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: FileText,
      title: 'Compliance Reports',
      description: 'Generate comprehensive compliance reports for audits and regulatory requirements automatically.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
    { value: '50M+', label: 'Data Points Protected', icon: Shield },
    // { value: '500+', label: 'Enterprise Clients', icon: Users },
    { value: '<100ms', label: 'Response Time', icon: Zap }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Chief Privacy Officer',
      company: 'FinanceFlow Bank',
      content: 'SecureLink transformed our data governance. The real-time monitoring and compliance automation saved us months of manual work.',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Compliance',
      company: 'InvestTrack Pro',
      content: 'The AI-powered risk assessment caught potential issues we never would have spotted manually. Absolutely essential for modern fintech.',
      rating: 5,
      avatar: 'MR'
    },
    {
      name: 'Emily Watson',
      role: 'Data Protection Lead',
      company: 'SecurePayments Ltd',
      content: 'Implementation was seamless, and the dashboard is incredibly intuitive. Our audit preparation time dropped by 80%.',
      rating: 5,
      avatar: 'EW'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for growing fintech startups',
      features: [
        'Up to 10 data partners',
        'Basic compliance monitoring',
        'Standard support',
        'Monthly reports',
        'Basic API access'
      ],
      isPopular: false
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      description: 'Ideal for established financial institutions',
      features: [
        'Up to 50 data partners',
        'Advanced AI risk assessment',
        'Real-time anomaly detection',
        'Priority support',
        'Custom compliance reports',
        'Full API access',
        'White-label options'
      ],
      isPopular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large-scale financial operations',
      features: [
        'Unlimited data partners',
        'Custom AI model training',
        'Dedicated compliance team',
        '24/7 premium support',
        'On-premise deployment',
        'Custom integrations',
        'Regulatory consulting'
      ],
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-36 pb-20 h-[100dvh] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Now with AI-Powered Risk Assessment
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Take Control of Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Financial Data</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              The most advanced data privacy and compliance platform for fintech. Monitor access, manage consents, 
              and ensure regulatory compliance with AI-powered insights and real-time protection.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold text-lg hover:border-slate-400 transition-colors">
                Watch Demo
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>DPDP Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Enterprise-Grade Privacy Protection
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive tools to monitor, control, and optimize your data sharing relationships 
              while maintaining the highest standards of privacy and compliance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8  text-white`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Beautiful, Intuitive Dashboard
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get complete visibility into your data ecosystem with our award-winning interface 
              designed for both technical and business users.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-2xl font-bold text-slate-900">94%</span>
                    </div>
                    <h3 className="font-semibold text-slate-900">Compliance Score</h3>
                    <p className="text-sm text-slate-600">+2% this month</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-2xl font-bold text-slate-900">47</span>
                    </div>
                    <h3 className="font-semibold text-slate-900">Active Partners</h3>
                    <p className="text-sm text-slate-600">+3 this month</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="text-2xl font-bold text-slate-900">4</span>
                    </div>
                    <h3 className="font-semibold text-slate-900">Risk Alerts</h3>
                    <p className="text-sm text-slate-600">-1 this week</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-slate-900 mb-4">Recent Access Activity</h3>
                  <div className="space-y-3">
                    {[
                      { partner: 'FinanceFlow Bank', action: 'Accessed transaction history', time: '2 hours ago', status: 'success' },
                      { partner: 'CreditScope Analytics', action: 'Viewed credit profile', time: '1 day ago', status: 'warning' },
                      { partner: 'InvestTrack Pro', action: 'Downloaded portfolio data', time: '3 days ago', status: 'success' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'success' ? 'bg-green-500' : 'bg-orange-500'
                          }`} />
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{activity.partner}</p>
                            <p className="text-xs text-slate-600">{activity.action}</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join hundreds of financial institutions who trust SecureLink to protect their most sensitive data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-700">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                    <p className="text-sm text-slate-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the plan that fits your organization's needs. All plans include our core privacy protection features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-xl ${
                plan.isPopular 
                  ? 'border-blue-500 shadow-lg transform scale-105' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-600 ml-1">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Data Privacy?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join the leading fintech companies who trust SecureLink to protect their most valuable asset - their data.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
              Schedule Demo
            </button>
          </div>
          
          <p className="text-blue-100 text-sm mt-6">
            No credit card required • 14-day free trial • Setup in minutes
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;