import React, { useState, useEffect } from 'react';
import { Shield, Clock, Users, Settings, ToggleLeft, ToggleRight, Calendar, AlertTriangle, CheckCircle2, Key, Download, Search, X, Building2 } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';



interface ConsentData {
  id: string;
  partner: string;
  logo: string;
  dataTypes: string[];
  purpose: string;
  startDate: string;
  expiryDate: string;
  status: string;
  isAutoRenew: boolean;
  lastAccessed: string;
  riskLevel: string;
  amount: number;
  currency: string;
  courseTitle: string;
  encryptionRef: string;
  is_consent: boolean;
  metadata?: {
    encryption_data?: {
      platform: string;
      base64Encoded: string;
      encrypted: {
        algorithm: string;
        iv: string;
        content: string;
      };
      originalDataType: string;
    };
    read_at?: {
      count: number;
      time_date: string | null;
    };
    [key: string]: any;
  };
  read_at?: {
    count: number;
    time_date: string | null;
  };
}

// Company data for the overview dialog
const COMPANY_OPTIONS = [
  { id: 'P001', name: 'FinScope Technologies' },
  { id: 'P002', name: 'CredX Capital' },
  { id: 'P003', name: 'PaySure Systems' },
  { id: 'P004', name: 'VeriBank AI' }
];

export const ActiveConsents: React.FC = () => {
  const [consents, setConsents] = useState<ConsentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decryptingIds, setDecryptingIds] = useState<Set<string>>(new Set());
  const [decryptedData, setDecryptedData] = useState<Map<string, any>>(new Map());
  
  // Dialog state
  const [showOverviewDialog, setShowOverviewDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskData, setRiskData] = useState<any>(null);
  const [loadingRisk, setLoadingRisk] = useState(false);
useEffect(() => {
    fetchPaymentTransactions();
  }, []);

  const fetchPaymentTransactions = async () => {
    try {
      setLoading(true);
      
      // Fetch payment transactions
      const { data: transactions, error: fetchError } = await supabase
        .from('Payment_Transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }
      // Transform the data to match the consent structure
      const transformedConsents: ConsentData[] = transactions?.map((transaction: any) => {
        // Calculate days until expiry using real destroy_date
        const destroyDate = new Date(transaction.destroy_date);
        const currentDate = new Date();
        const daysUntilExpiry = Math.ceil((destroyDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // Determine status based on real expiry date
        let status = 'active';
        if (daysUntilExpiry <= 0) {
          status = 'expired';
        } else if (daysUntilExpiry <= 7) {
          status = 'expiring';
        }
        
        // Get course title from metadata
        const courseTitle = transaction.metadata?.courseTitle || `Course ${transaction.course_id}`;
        
        // Create logo from course title initials
        const logoLetters = courseTitle.split(' ').map((word: string) => word[0]).join('').substring(0, 2).toUpperCase();
        
        // Determine data types based on what's actually encrypted
        const dataTypes = ['Personal Information', 'Payment Data', 'Contact Details'];
        
        // Determine risk level based on amount and access count
        let riskLevel = 'low';
        if (transaction.amount > 2000 || (transaction.read_at?.count || 0) > 5) {
          riskLevel = 'medium';
        }
        if (transaction.amount > 5000 || (transaction.read_at?.count || 0) > 10) {
          riskLevel = 'high';
        }
        
        return {
          id: transaction.id,
          partner: courseTitle,
          logo: logoLetters,
          dataTypes: dataTypes,
          purpose: `Payment processing and service access for ${courseTitle}`,
          startDate: transaction.created_at,
          expiryDate: transaction.destroy_date, // Use real destroy_date
          status: status,
          isAutoRenew: false, // No auto-renew by default
          lastAccessed: transaction.read_at?.time_date || transaction.created_at, // Use real last access or creation date
          riskLevel: riskLevel,
          amount: transaction.amount,
          currency: transaction.currency || 'INR',
          courseTitle: courseTitle,
          encryptionRef: transaction.encryption_ref,
          is_consent: transaction.is_consent !== false, // Include consent status, default to true if undefined
          metadata: transaction.metadata, // Include the full metadata with encryption_data
          read_at: transaction.read_at // Include read_at tracking data
        };
      }) || [];

      setConsents(transformedConsents);
    } catch (err) {
      console.error('Error fetching payment transactions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const toggleAutoRenew = (id: string) => {
    setConsents(consents.map(consent => 
      consent.id === id ? { ...consent, isAutoRenew: !consent.isAutoRenew } : consent
    ));
  };

  const revokeConsent = (id: string) => {
    setConsents(consents.map(consent => 
      consent.id === id ? { ...consent, status: 'revoked' } : consent
    ));
  };

  // Function to fetch risk analysis data
  const fetchRiskAnalysis = async (partnerId: string) => {
    try {
      setLoadingRisk(true);
      const response = await fetch(`https://securelink-prediction-api.onrender.com/explain_risk/?partner_id=${partnerId}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch risk analysis: ${response.status}`);
      }
      
      const data = await response.json();
      setRiskData(data);
    } catch (error) {
      console.error('Error fetching risk analysis:', error);
      alert('Failed to fetch risk analysis. Please try again.');
    } finally {
      setLoadingRisk(false);
    }
  };

  // Function to handle company selection and fetch risk data
  const handleCompanySelect = (companyId: string) => {
    setSelectedCompany(companyId);
    fetchRiskAnalysis(companyId);
  };

  // Function to open the overview dialog
  const openOverviewDialog = () => {
    setShowOverviewDialog(true);
    setSelectedCompany('');
    setSearchQuery('');
    setRiskData(null);
  };

  // Function to close the overview dialog
  const closeOverviewDialog = () => {
    setShowOverviewDialog(false);
    setSelectedCompany('');
    setSearchQuery('');
    setRiskData(null);
  };

  const requestDecryptedData = async (consentId: string, encryptionRef: string) => {
    try {
      setDecryptingIds(prev => new Set([...prev, consentId]));
      
      // Get the consent data to access the full encryption_data from metadata
      const consentData = consents.find(c => c.id === consentId);
      const encryptionData = consentData?.metadata?.encryption_data;
      
      if (!encryptionData) {
        throw new Error('Encryption data not found in transaction metadata');
      }
      
      // Call the decode-data endpoint with the complete encryption structure
      const response = await fetch('https://secure-link-backend.vercel.app/decode-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: encryptionData.platform,
          base64Encoded: encryptionData.base64Encoded,
          encrypted: {
            algorithm: encryptionData.encrypted.algorithm,
            iv: encryptionData.encrypted.iv,
            content: encryptionData.encrypted.content
          },
          originalDataType: encryptionData.originalDataType
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to decrypt data: ${response.status} ${errorText}`);
      }
      
      const decryptedResult = await response.json();
      console.log('Decrypted data received:', decryptedResult);
      
      // Extract the actual user data from the API response
      const userData = decryptedResult.data || decryptedResult;
      
      // Add metadata for display purposes
      const consentInfo = consents.find(c => c.id === consentId);
      const enhancedResult = {
        ...userData, // Use the extracted user data (name, email, phone, platform)
        encryptionMetadata: {
          algorithm: consentInfo?.metadata?.encryption_data?.encrypted?.algorithm || 'Unknown',
          iv: encryptionRef,
          decryptedAt: new Date().toISOString(),
          originalAmount: consentInfo?.amount || 0,
          originalCurrency: consentInfo?.currency || 'INR',
          courseTitle: consentInfo?.courseTitle || 'Unknown Course'
        }
      };
      
      // Update read_at tracking in the database
      try {
        const currentReadAt = consentInfo?.metadata?.read_at || { count: 0, time_date: null };
        const updatedReadAt = {
          count: (currentReadAt.count || 0) + 1,
          time_date: new Date().toISOString()
        };
        
        const { error: updateError } = await supabase
          .from('Payment_Transactions')
          .update({ 
            read_at: updatedReadAt,
            // Also update metadata to keep it in sync
            metadata: {
              ...consentInfo?.metadata,
              read_at: updatedReadAt
            }
          })
          .eq('id', consentId);
          
        if (updateError) {
          console.error('Error updating read_at tracking:', updateError);
        } else {
          console.log('Successfully updated read_at tracking:', updatedReadAt);
        }
      } catch (updateErr) {
        console.error('Failed to update read_at tracking:', updateErr);
      }
      
      // Store the decrypted data
      setDecryptedData(prev => new Map([...prev, [consentId, enhancedResult]]));
      
      // Show success message
      // alert('Data successfully decrypted and retrieved!');
      
    } catch (error) {
      console.error('Error decrypting data:', error);
      alert(`Failed to decrypt data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      // Don't store any data on error
    } finally {
      setDecryptingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(consentId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Loading payment transactions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
          <h3 className="text-red-800 font-medium">Error Loading Data</h3>
        </div>
        <p className="text-red-700 mt-2">{error}</p>
        <button 
          onClick={fetchPaymentTransactions}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
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
              <p className="text-2xl font-bold text-blue-700">{consents.reduce((sum, c) => sum + (c.read_at?.count || 0), 0)}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <button 
            onClick={openOverviewDialog}
            className="px-6 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Building2 className="w-4 h-4" />
            <span>Get Overview of company</span>
          </button>
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
                    <div className="fle items-center  ">
                      <h3 className="text-lg font-semibold text-slate-900">{consent.partner}</h3>
                      <div className="flex space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consent.status)}`}>
                        {consent.status}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getRiskColor(consent.riskLevel)}`}>
                        {consent.riskLevel} risk
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-slate-500 mb-1">
                    {getDaysUntilExpiry(consent.expiryDate)} days left
                  </div>
                  <div className="text-xs text-slate-400 mb-1">
                    {consent.read_at?.count || 0} data accesses
                  </div>
                  {consent.read_at?.time_date && (
                    <div className="text-xs text-slate-400">
                      Last: {formatDate(consent.read_at.time_date)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 bg-slate-50">
              {/* Transaction Information */}
              <div className="bg-white rounded-lg p-4 mb-6 border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Transaction Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Course/Service</p>
                    <p className="font-medium text-slate-900">{consent.courseTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Amount</p>
                    <p className="font-medium text-slate-900">{consent.currency} {consent.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Transaction ID</p>
                    <p className="font-medium text-slate-900 font-mono text-xs">{consent.id.substring(0, 70)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Encryption Reference</p>
                    <p className="font-medium text-slate-900 font-mono text-xs">{consent.encryptionRef.substring(0, 70)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Data Access Count</p>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-slate-900">{consent.read_at?.count || 0} times</span>
                      {(consent.read_at?.count || 0) > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Accessed
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Last Access</p>
                    <p className="font-medium text-slate-900">
                      {consent.read_at?.time_date ? 
                        formatDate(consent.read_at.time_date) : 
                        'Never accessed'
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decrypted Data Section */}
              {decryptedData.has(consent.id) && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-green-800 flex items-center">
                      <Key className="w-4 h-4 mr-2" />
                      Decrypted Data
                    </h4>
                    {/* <button 
                      onClick={() => {
                        const data = decryptedData.get(consent.id);
                        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `decrypted-data-${consent.id.substring(0, 8)}.json`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                      className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button> */}
                  </div>
                  <div className="space-y-3">
                    {(() => {
                      const data = decryptedData.get(consent.id);
                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-green-600 font-medium mb-1">Decrypted User Information</p>
                            <div className="bg-white rounded p-2 text-xs">
                              <p><strong>Name:</strong> {data?.name}</p>
                              <p><strong>Email:</strong> {data?.email}</p>
                              <p><strong>Phone:</strong> {data?.phone}</p>
                              <p><strong>Platform:</strong> {data?.platform}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-green-600 font-medium mb-1">Transaction Context</p>
                            <div className="bg-white rounded p-2 text-xs">
                              <p><strong>Amount:</strong> {data?.encryptionMetadata?.originalAmount} {data?.encryptionMetadata?.originalCurrency}</p>
                              <p><strong>Course:</strong> {data?.encryptionMetadata?.courseTitle}</p>
                              <p><strong>Encryption IV:</strong> {data?.encryptionMetadata?.iv?.substring(0, 16)}...</p>
                            </div>
                          </div>
                        </div>
                      );
                    })()} 
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-xs text-green-600">
                      <strong>Encryption Info:</strong> {decryptedData.get(consent.id)?.encryptionMetadata?.algorithm} | 
                      Decrypted at: {new Date(decryptedData.get(consent.id)?.encryptionMetadata?.decryptedAt || '').toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Start Date</p>
                  <p className="font-medium text-slate-900">{formatDate(consent.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Expiry Date</p>
                  <p className="font-medium text-slate-900">{formatDate(consent.expiryDate)}</p>
                </div>
                
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                
                
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => requestDecryptedData(consent.id, consent.encryptionRef)}
                    disabled={decryptingIds.has(consent.id) || consent.status === 'revoked' || !consent.is_consent}
                    className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    {decryptingIds.has(consent.id) ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600"></div>
                        <span>Decrypting...</span>
                      </>
                    ) : !consent.is_consent ? (
                      <>
                        <Key className="w-4 h-4" />
                        <span>Consent Revoked</span>
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4" />
                        <span>Decrypt Data</span>
                      </>
                    )}
                  </button>
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

      {/* Company Overview Dialog */}
      {showOverviewDialog && (
        <div className="fixed -top-6 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Building2 className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Company Risk Overview</h2>
              </div>
              <button
                onClick={closeOverviewDialog}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Search Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Company ID or Search Companies
                </label>
                <div className="flex space-x-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Enter company ID (e.g., P001) or search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          handleCompanySelect(searchQuery.trim().toUpperCase());
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (searchQuery.trim()) {
                        handleCompanySelect(searchQuery.trim().toUpperCase());
                      }
                    }}
                    disabled={!searchQuery.trim() || loadingRisk}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {loadingRisk ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    <span>Analyze</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter a company ID (P001, P002, P003, P004) or search from the options below
                </p>
              </div>

              {/* Company Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {COMPANY_OPTIONS
                  .filter(company => 
                    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    company.id.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((company) => (
                    <button
                      key={company.id}
                      onClick={() => handleCompanySelect(company.id)}
                      disabled={loadingRisk}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        selectedCompany === company.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.id}</div>
                        </div>
                        {selectedCompany === company.id && loadingRisk && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        )}
                      </div>
                    </button>
                  ))
                }
              </div>

              {/* Risk Analysis Results */}
              {riskData && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Risk Analysis Results</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      riskData.risk_level === 'Low' ? 'bg-green-100 text-green-800' :
                      riskData.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {riskData.risk_level} Risk
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">
                      Partner ID: <span className="font-medium">{riskData.partner_id}</span>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                      {riskData.explanation.split('\n').map((line: string, index: number) => {
                        // Handle empty lines
                        if (!line.trim()) {
                          return <div key={index} className="h-2"></div>;
                        }
                        
                        // Handle main headings (surrounded by **)
                        if (line.includes('**') && !line.startsWith('1.') && !line.startsWith('2.') && !line.startsWith('3.')) {
                          const boldText = line.replace(/\*\*(.*?)\*\*/g, '$1');
                          return (
                            <h4 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-3">
                              {boldText}
                            </h4>
                          );
                        }
                        
                        // Handle section headers (like "Risk Factors:", "Red Flags:", etc.)
                        if (line.endsWith(':') && !line.startsWith(' ') && !line.match(/^\d+\./)) {
                          return (
                            <h5 key={index} className="text-base font-semibold text-gray-800 mt-4 mb-2 border-b border-gray-300 pb-1">
                              {line}
                            </h5>
                          );
                        }
                        
                        // Handle numbered lists
                        if (line.match(/^\d+\./)) {
                          const content = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                          return (
                            <div key={index} className="ml-4 mb-2">
                              <div 
                                className="text-gray-700"
                                dangerouslySetInnerHTML={{ __html: content }}
                              />
                            </div>
                          );
                        }
                        
                        // Handle regular paragraphs with bold formatting
                        const content = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return (
                          <p 
                            key={index} 
                            className="text-gray-700 mb-2"
                            dangerouslySetInnerHTML={{ __html: content }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {loadingRisk && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Analyzing risk data...</span>
                </div>
              )}

              {/* No Selection State */}
              {!selectedCompany && !loadingRisk && (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a company to view risk analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};