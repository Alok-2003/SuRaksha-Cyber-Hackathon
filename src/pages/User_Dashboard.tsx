import React, { useState } from 'react';
import { Shield, Eye, Clock, Users, Settings, Search, Filter, CheckCircle, MoreHorizontal, ShoppingBag } from 'lucide-react';
import { AccessHistory } from '../components/user/AccessHistory';
import { ActiveConsents } from '../components/user/ActiveConsents';
import { ConsentTemplates } from '../components/user/ConsentTemplates';
import { SharingLimits } from '../components/user/SharingLimits';
import { PaymentPartnerDialog } from '../components/PaymentPartnerDialog';


const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('consents');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Dialog and dropdown state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [selectedGateway, setSelectedGateway] = useState('Razorpay');
  const [selectedCompany, setSelectedCompany] = useState('Acme Corp');
  const [selectedDate, setSelectedDate] = useState('');

  const bankOptions = ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'SBI'];
  const gatewayOptions = ['Razorpay', 'Paytm', 'Stripe', 'PayU'];
  const companyOptions = ['Acme Corp', 'Globex Ltd', 'Umbrella Inc', 'Wayne Enterprises'];

  const stats = [
    {
      title: 'Active Consents',
      value: '12',
      change: '+2 this week',
      trend: 'up',
      icon: Shield,
      color: 'text-blue-600'
    },
    {
      title: 'Data Accesses',
      value: '247',
      change: '+18 today',
      trend: 'up',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Partners',
      value: '8',
      change: 'No change',
      trend: 'neutral',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Avg. Duration',
      value: '45d',
      change: '-5d vs last month',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const tabs = [
    { id: 'consents', label: 'Active Consents', icon: CheckCircle },
    { id: 'templates', label: 'Compliance Templates', icon: Settings },
    { id: 'shopping', label: 'Dummy E-commerce Store', icon: ShoppingBag }
  ];
  
  const navigateToShopping = () => {
    window.location.href = '/shopping';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">SecureLink</h1>
                <p className="text-xs text-slate-500">Privacy Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative hidden sm:block">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search partners, purposes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg font-medium transition-colors"
                  onClick={() => setDialogOpen(true)}
                >
                  Payment Partner Verification
                </button>
                <PaymentPartnerDialog
                  open={dialogOpen}
                  setOpen={setDialogOpen}
                  selectedBank={selectedBank}
                  setSelectedBank={setSelectedBank}
                  selectedGateway={selectedGateway}
                  setSelectedGateway={setSelectedGateway}
                  selectedCompany={selectedCompany}
                  setSelectedCompany={setSelectedCompany}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  bankOptions={bankOptions}
                  gatewayOptions={gatewayOptions}
                  companyOptions={companyOptions}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer" onClick={navigateToShopping}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900">Security Store</h3>
                        <ShoppingBag className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-slate-600 mb-4">Explore our security products and services to enhance your data protection.</p>
                      <div className="flex items-center text-blue-600 font-medium">
                        <span>Visit Store</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                    {[
                      { partner: 'FinanceFlow Bank', action: 'Accessed transaction history', time: '2 hours ago', status: 'active' },
                      { partner: 'CreditScope Analytics', action: 'Viewed credit profile', time: '1 day ago', status: 'active' },
                      { partner: 'InvestTrack Pro', action: 'Downloaded portfolio data', time: '3 days ago', status: 'revoked' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <div>
                            <p className="font-medium text-slate-900">{activity.partner}</p>
                            <p className="text-sm text-slate-600">{activity.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">{activity.time}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            activity.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'history' && <AccessHistory searchQuery={searchQuery} />}
            {activeTab === 'consents' && <ActiveConsents />}
            {activeTab === 'templates' && <ConsentTemplates />}
            {activeTab === 'limits' && <SharingLimits />}
            {activeTab === 'shopping' && (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Dummy E-commerce Store</h2>
                <button
                  onClick={navigateToShopping}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Visit Store
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;