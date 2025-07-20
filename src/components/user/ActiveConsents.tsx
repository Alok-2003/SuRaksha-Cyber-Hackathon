import React, { useState, useEffect } from 'react';
import { Shield, Clock, Users, ToggleLeft, ToggleRight, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import { format, parseISO, differenceInDays } from 'date-fns';

// Define the transaction structure from Supabase
interface PaymentTransaction {
  id: string;
  user_id: string;
  course_id: string;
  encryption_ref: string;
  amount: number;
  currency: string;
  metadata: any;
  created_at: string;
  read_at?: {
    count: number;
    time_date: string | null;
  };
}

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
  accessCount: number;
  lastAccessed: string;
  riskLevel: string;
  contactInfo: string;
  email: string;
  encryptionRef: string;
  amount?: number;
  currency?: string;
  read_at?: {
    count: number;
    time_date: string | null;
  };
}

export const ActiveConsents: React.FC = () => {
  const [consents, setConsents] = useState<ConsentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        
        // Get current user
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData?.session?.user) {
          setError("You must be logged in to view this data");
          setLoading(false);
          return;
        }
        
        const userId = sessionData.session.user.id;
        
        // Fetch payment transactions for the user
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('Payment_Transactions')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
          
        if (transactionsError) {
          throw transactionsError;
        }
        console.log("Transactions data",transactionsData)
        // Ensure proper typing for the transaction data
        const typedTransactions: PaymentTransaction[] = transactionsData || [];
        
        // Transform payment transactions into consent format for the UI
        const consentData = typedTransactions.map(tx => {
          // Extract data from metadata or use defaults
          const metadata = tx.metadata || {};
          const courseTitle = metadata.courseTitle || 'Unknown Course';
          const contactInfo = metadata.contact || 'Not available';
          const email = metadata.email || 'Not available';
          
          // Calculate expiry date (30 days from created_at)
          const startDate = tx.created_at;
          const createdDate = new Date(startDate);
          const expiryDate = new Date(createdDate);
          expiryDate.setDate(createdDate.getDate() + 30); // 30 day consent
          
          // Determine risk level based on data shared
          let riskLevel = 'low';
          if (metadata.name && metadata.contact && metadata.email) {
            riskLevel = 'medium';
          }
          
          // Get first letter of each word in course title for logo
          const logoLetters = courseTitle
            .split(' ')
            .map((word: string) => word.charAt(0))
            .join('')
            .substring(0, 2);
          
          // Create data types array based on actual metadata present
          const dataTypes = [];
          if (metadata.name) dataTypes.push('Identity');
          if (metadata.contact) dataTypes.push('Contact');
          if (metadata.email) dataTypes.push('Email');
          dataTypes.push('Payment Information');
          
          return {
            id: tx.id,
            partner: courseTitle,
            logo: logoLetters,
            dataTypes: dataTypes,
            purpose: `Payment for ${courseTitle}`,
            startDate: format(parseISO(startDate), 'yyyy-MM-dd'),
            expiryDate: format(expiryDate, 'yyyy-MM-dd'),
            status: 'active',
            isAutoRenew: false,
            accessCount: 1, // Initial access
            lastAccessed: tx.created_at,
            riskLevel: riskLevel,
            contactInfo: contactInfo,
            email: email,
            encryptionRef: tx.encryption_ref,
            amount: tx.amount,
            currency: tx.currency,
            read_at: tx.read_at // Include read_at tracking data
          };
        });
        
        setConsents(consentData);
      } catch (err) {
        console.error('Error fetching payment transactions:', err);
        setError('Failed to load your data consent records');
      } finally {
        setLoading(false);
      }
    }
    
    fetchTransactions();
  }, []);

  const toggleAutoRenew = (id: string) => {
    setConsents(consents.map(consent => 
      consent.id === id ? { ...consent, isAutoRenew: !consent.isAutoRenew } : consent
    ));
  };

  const revokeConsent = async (id: string) => {
    try {
      // Update the is_consent column to false in the database
      const { error } = await supabase
        .from('Payment_Transactions')
        .update({ is_consent: false })
        .eq('id', id);

      if (error) {
        console.error('Error revoking consent:', error);
        alert('Failed to revoke consent. Please try again.');
        return;
      }

      // Update local state to reflect the change
      setConsents(consents.map(consent => 
        consent.id === id ? { ...consent, status: 'revoked' } : consent
      ));

      alert('Consent successfully revoked!');
    } catch (error) {
      console.error('Error revoking consent:', error);
      alert('Failed to revoke consent. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  const formatDateTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy - HH:mm:ss');
    } catch (error) {
      return dateString;
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    try {
      const days = differenceInDays(parseISO(expiryDate), new Date());
      return days;
    } catch (error) {
      return 0;
    }
  };

  const getStatusColor = (status: string, expiryDate: string) => {
    if (status === 'revoked') return 'bg-red-100 text-red-800';
    if (status === 'expired') return 'bg-gray-100 text-gray-800';
    
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) return 'bg-gray-100 text-gray-800';
    if (days < 7) return 'bg-amber-100 text-amber-800';
    return 'bg-green-100 text-green-800';
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-gray-500">Loading your consent records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle className="w-8 h-8 mb-4" />
        <p>{error}</p>
      </div>
    );
  }

  if (consents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <CheckCircle2 className="w-8 h-8 mb-4" />
        <p>You have no active data consent records</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Active Data Consents</h3>
        <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 rounded-full px-4 py-2">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{consents.length} active consent{consents.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="space-y-6">
        {consents.map((consent) => (
          <div key={consent.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-5 shadow-md bg-white dark:bg-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {consent.logo}
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">{consent.partner}</h4>
                  <p className="text-sm text-gray-500">{consent.purpose}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(consent.status, consent.expiryDate)}`}>
                  {consent.status === 'active' ? 'Active' : consent.status}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Expires: {formatDate(consent.expiryDate)}
                </span>
              </div>
            </div>

            <div className="mt-2 border-t pt-2">
              <div className="flex justify-between text-base">
                <div>
                  <div className="flex items-center mt-3">
                    <Shield className="h-4 w-4 mr-2 text-purple-600" />
                    <span className="text-gray-700 font-medium">Encryption Reference:</span>
                    <code className="bg-gray-100 ml-1 text-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-xs rounded-md font-mono tracking-tight overflow-x-auto max-w-[16rem] inline-block">
                      {consent.encryptionRef}
                    </code>
                  </div>
                  
                  <div className="flex items-center mt-3">
                    <Shield className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-gray-700 font-medium">Payment Amount:</span>
                    <span className="bg-green-100 ml-1 text-green-800 dark:bg-green-800 dark:text-green-100 px-3 py-1.5 text-xs rounded-md font-mono font-semibold shadow-sm">
                      {consent.amount} {consent.currency}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-3">
                    <Shield className="h-4 w-4 mr-2 text-red-600" />
                    <span className="text-gray-700 font-medium">Data Access Count:</span>
                    <div className="ml-2 flex items-center space-x-2">
                      <span className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 px-3 py-1.5 text-xs rounded-md font-mono font-semibold shadow-sm">
                        {consent.read_at?.count || 0} times
                      </span>
                      {(consent.read_at?.count || 0) > 0 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Accessed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <Clock className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-gray-600">
                      Last Admin Access: {consent.read_at?.time_date ? formatDateTime(consent.read_at.time_date) : 'Never'}
                    </span>
                  </div>
                  <div className="flex items-center justify-end mt-2">
                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-gray-600">
                      Created: <span className="font-medium">{formatDateTime(consent.lastAccessed)}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 border-t pt-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm mr-2">Auto-renew:</span>
                <button
                  onClick={() => toggleAutoRenew(consent.id)}
                  className="focus:outline-none"
                  aria-label="Toggle auto-renew"
                >
                  {consent.isAutoRenew ? (
                    <ToggleRight className="h-5 w-5 text-primary" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center">
                <span className={`text-xs px-2 py-1 rounded-full mr-4 ${getRiskColor(consent.riskLevel)}`}>
                  {consent.riskLevel.charAt(0).toUpperCase() + consent.riskLevel.slice(1)} risk
                </span>
                <button
                  onClick={() => revokeConsent(consent.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Revoke
                </button>
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