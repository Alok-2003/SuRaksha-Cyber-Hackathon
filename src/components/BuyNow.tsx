import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../utils/supabaseClient';

// Define Razorpay related interfaces
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, any>;
  theme?: Record<string, any>;
  modal?: Record<string, any>;
  handler?: (response: RazorpayResponse) => void;
}

// Define window with Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

interface BookNowButtonProps {
  amount: number;           // in rupees
  currency?: string;        // defaults to 'INR'
  id: string;
  courseTitle: string;
}

export const BuyNow: React.FC<BookNowButtonProps> = ({
  amount,
  currency = 'INR',
  id,
  courseTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: '',
    name: '',
    email: '',
    contact: '',
  });
  const [dataDestructionPeriod, setDataDestructionPeriod] = useState('1Week');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const navigate = useNavigate();
// console.log("User details",userDetails)
  // Fetch user details from Supabase when component mounts
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        setFetchingUser(true);
        // Get current authenticated user
        const { data: authData } = await supabase.auth.getSession();
        
        if (authData?.session?.user) {
          const userId = authData.session.user.id;
          
          // Fetch user details from User_Table
          const { data, error } = await supabase
            .from('User_Table')
            .select('id, name, email, contact')
            .eq('id', userId)
            .single();
          // console.log("User data",data)
          if (error) {
            console.error('Error fetching user data:', error);
            toast.error('Could not fetch your profile. Using default information.');
          } else if (data) {
            // Update user details with data from database
            setUserDetails({
              id: data.id,
              name: data.name || '',
              email: data.email || '',
              contact: data.contact ? data.contact.toString() : '',
            });
          }
        } else {
          // Not authenticated
          toast.error('Please sign in to proceed with payment');
          setTimeout(() => navigate('/signin'), 2000);
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
        toast.error('Could not fetch your profile data');
      } finally {
        setFetchingUser(false);
      }
    }
    
    fetchUserDetails();
  }, [navigate]);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true); // Start loading

      console.log('Booking details:', userDetails);
      console.log('Amount:', amount);
      console.log('Currency:', currency);
      
      // 1) Encrypt user details
      const encryptionRes = await axios.post(
        'https://secure-link-backend.vercel.app/encode-data',
        {
          platform: 'Razorpay',
          name: userDetails.name,
          phone: userDetails.contact ? parseInt(userDetails.contact, 10) : 0,
          email: userDetails.email
        }
      );
      
      console.log('Encrypted data:', encryptionRes.data);
      const { encrypted } = encryptionRes.data;
      
      // Store original user data securely for later use in our system
      const secureUserData = {
        userId: userDetails.id,
        // name: userDetails.name,
        // email: userDetails.email,
        // contact: userDetails.contact,
        encryption_data:  encryptionRes.data, // Using IV as a reference ID
        amount: amount,
        currency: currency,
        courseTitle: courseTitle,
        encryptionId: encrypted.iv, // Using IV as a reference ID
        timestamp: new Date().toISOString()
      };
      
      // Calculate actual destruction date based on selected period
      const calculateDestroyDate = (period: string) => {
        const now = new Date();
        switch (period) {
          case '3Days':
            return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
          case '1Week':
            return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          case '2Week':
            return new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
          case '3Week':
            return new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);
          default:
            return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Default to 1 week
        }
      };
      
      const destroyDate = calculateDestroyDate(dataDestructionPeriod);
      
      // Store secure payment data in our database for future reference
      try {
        const { error } = await supabase
          .from('Payment_Transactions')
          .insert([
            {
              user_id: userDetails.id,
              encryption_ref: encrypted.iv,
              course_id: id,
              amount: amount,
              currency: currency,
              metadata: secureUserData,
              read_at:{"count": 0, "time_date": null},
              destroy_date: destroyDate.toISOString()
            }
          ]);
          
        if (error) {
          console.error('Error storing secure transaction data:', error);
        }
      } catch (err) {
        console.error('Failed to store transaction data:', err);
      }
      
      // 2) Create order on backend - using real endpoint with encrypted reference instead of actual name
      const orderRes = await axios.post(
        'https://secure-link-backend.vercel.app/create-order',
        { amount, currency }
      );
      const { id: order_id, amount: paiseAmount } = orderRes.data;
      
      // Generate randomized placeholder data to prevent Razorpay from showing real user data
      // Using only encrypted data references for secure lookups
      
      // 3) Configure Razorpay with completely obfuscated data
      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: paiseAmount / 100,
        currency,
        name: 'NeeevAI',
        description: 'Enrollment Platform',
        order_id,
        // Using fully obfuscated data with encryption reference embedded
        prefill: {
          // Completely removing name from prefill
          email: `${encrypted.iv}@secure.transaction`,
          // Generate a completely random phone number that doesn't match the actual number
          contact: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        },
        notes: {
          // Only include the encryption key as requested
          encryptionKey: encrypted.iv
        },
        theme: { color: '#4e73df' },
        modal: {
          ondismiss: () => {
            setIsLoading(false); // Stop loading if modal is dismissed
          }
        }
      };
      
      // Add payment handler to update our secure records when payment completes
      options.handler = async function(response: RazorpayResponse) {
        try {
          // Record successful payment in our database
          const { error } = await supabase
            .from('Payment_Transactions')
            .update({ 
              status: 'completed',
              payment_id: response.razorpay_payment_id, 
              payment_signature: response.razorpay_signature,
              payment_completed_at: new Date().toISOString()
            })
            .eq('encryption_ref', encrypted.iv);
            
          if (error) {
            console.error('Error updating payment record:', error);
          }
            
          // Send success notification to user
          toast.success('Payment successful!');
          
          // Send receipt email with decrypted (real) user data
          // try {
          //   await axios.post(
          //     'https://secure-link-backend.vercel.app/payment-receipt',
          //     {
          //       encryptionKey: encrypted.iv,
          //       paymentId: response.razorpay_payment_id,
          //       orderId: response.razorpay_order_id,
          //       courseId: id,
          //       courseTitle: courseTitle
          //     }
          //   );
          // } catch (emailError) {
          //   console.error('Error sending receipt email:', emailError);
          //   toast.error('Could not send receipt email, but payment was successful');
          // }
          
          // Redirect to success page
          setTimeout(() => {
            navigate('/shopping');
          }, 2000);
        } catch (err) {
          console.error('Payment completion processing failed:', err);
          toast.error('Payment was successful but there was an error processing your receipt');
        }
      };
      
      // Open Razorpay widget - real payment flow with enhanced security
      const razorpay = new window.Razorpay(options);
      razorpay.open();

      // Set loading to false after Razorpay is opened
      setIsLoading(false);
      
    } catch (err) {
      setIsLoading(false); // Stop loading on error
      console.error('Payment initiation failed:', err);
      alert('Could not start payment. Please try again.');
    }
  };


  // after collecting details, kick off payment then close dialog
  const proceed = () => {
    handlePayment();
  };

  return (
    <>
      <button
        onClick={fetchingUser ? undefined : userDetails.id ? openDialog : () => navigate('/signin')}
        className="bg-yellow-400 w-full hover:bg-yellow-600/90 text-black px-6 py-3 rounded-xl flex items-center justify-center transition"
        disabled={fetchingUser}
      >
        {fetchingUser ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
        ) : !userDetails.id ? 'Sign in to Buy' : 'Buy Now'}
      </button>

      <Dialog open={isOpen} onClose={closeDialog}>
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <DialogPanel className="bg-white dark:bg-black/90 text-black dark:text-white border rounded-xl p-6 max-w-md w-full">
            <DialogTitle className="text-sm text-red-600 font-semibold">
            Please verify your data will be going encrypt and secure
            </DialogTitle>
            <div className="mt-4 space-y-4">
              {/** Name */}
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full border text-black rounded px-3 py-2"
              />
              {/** Email */}
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full border text-black rounded px-3 py-2"
              />
              {/** Contact */}
              <input
                name="contact"
                type="text"
                placeholder="Contact Number"
                value={userDetails.contact}
                onChange={handleInputChange}
                className="w-full border text-black rounded px-3 py-2"
              />
              
              {/** Data Destruction Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Destruction Period
                </label>
                <select
                  value={dataDestructionPeriod}
                  onChange={(e) => setDataDestructionPeriod(e.target.value)}
                  className="w-full border text-black rounded px-3 py-2 bg-white"
                >
                  <option value="3Days">3 Days</option>
                  <option value="1Week">1 Week</option>
                  <option value="2Week">2 Weeks</option>
                  <option value="3Week">3 Weeks</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Your data will be automatically destroyed after this period
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                onClick={proceed}
                disabled={isLoading || fetchingUser || !userDetails.id}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : fetchingUser ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading profile...
                  </div>
                ) : !userDetails.id ? (
                  'Please sign in'
                ) : (
                  'Proceed'
                )}
              </Button>
              <Button
                onClick={closeDialog}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded"
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
