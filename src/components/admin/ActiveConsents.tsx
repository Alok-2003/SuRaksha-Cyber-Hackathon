import React, { useState, useEffect } from 'react';
import { Shield, Clock, Users, Settings, ToggleLeft, ToggleRight, Calendar, AlertTriangle, CheckCircle2, Key, Download } from 'lucide-react';
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

export const ActiveConsents: React.FC = () => {
  const [consents, setConsents] = useState<ConsentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decryptingIds, setDecryptingIds] = useState<Set<string>>(new Set());
  const [decryptedData, setDecryptedData] = useState<Map<string, any>>(new Map());
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-slate-700">Auto-renewal</span>
                    <button
                      onClick={() => toggleAutoRenew(consent.id)}
                      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {consent.isAutoRenew ? (
                        <ToggleRight className="w-11 h-6 text-blue-600" />
                      ) : (
                        <ToggleLeft className="w-11 h-6 text-slate-300" />
                      )}
                    </button>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-800">
                    <Settings className="w-4 h-4" />
                    <span>Modify Consent</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => requestDecryptedData(consent.id, consent.encryptionRef)}
                    disabled={decryptingIds.has(consent.id) || consent.status === 'revoked'}
                    className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    {decryptingIds.has(consent.id) ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600"></div>
                        <span>Decrypting...</span>
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
    </div>
  );
};