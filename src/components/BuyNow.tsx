import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
    id: 'dummy-user-123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    contact: '9876543210',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

      console.log('Booking details (dummy):', userDetails);
      console.log('Amount:', amount);
      console.log('Currency:', currency);

      // 1) Create order on backend - using real endpoint
      const orderRes = await axios.post(
        'http://localhost:5001/create-order',
        { amount, currency,notes:{name: userDetails.name} }
      );
      const { id: order_id, amount: paiseAmount } = orderRes.data;
      // 2) Configure Razorpay with real key
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: paiseAmount / 100,
        currency,
        name: 'NeeevAI',
        description: 'Enrollment Platform',
        order_id,
          // handler: async (resp: any) => {
          //   try {
          //     // Using dummy student_id - but still log real payment ID
          //     const student_id = 'dummy-student-123';
              
          //     console.log('Booking payment details:', {
          //       id,
          //       payment_id: resp.razorpay_payment_id,
          //       payment_amount: paiseAmount/100,
          //       student_id, 
          //       status: 'paid',
          //     });


          //     // Send payment-completed email with slot info - real endpoint
          //     await axios.post(
          //       'https://softflowai-server.vercel.app/payment-success-email',
          //       {
          //         studentName: userDetails.name,
          //         studentEmail: userDetails.email,
          //         orderId: resp.razorpay_order_id,
          //         paymentId: resp.razorpay_payment_id,
          //         amount: paiseAmount / 100,
          //         currency,
          //         courseTitle: courseTitle,
          //         slotDate: slot.slot_date,
          //         startTime: slot.start_time,
          //         endTime: slot.end_time,
          //       }
          //     );

          //     toast.success('Payment successful! Receipt emailed.');
      
          //     console.log('Payment successful!');
          //     console.log('Payment details:', resp);
                            
          //     setTimeout(() => {
          //       navigate('/user-dashboard');
          //     }, 3500);
          //   } catch (err) {
          //     console.error('Payment verification failed:', err);
          //     toast.error('Payment verification failed');
          //   }
          // },
          prefill: {
            name: userDetails.name,
            email: userDetails.email,
            contact: userDetails.contact,
          },
          theme: { color: '#4e73df' },
          modal: {
            ondismiss: () => {
              setIsLoading(false); // Stop loading if modal is dismissed
            }
          }
        };

      // 3) Open Razorpay widget - real payment flow
      const razorpay = new (window as any).Razorpay(options);
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
        onClick={openDialog}
        className="bg-primary hover:bg-primary/90 text-black px-6 py-3 rounded-xl flex items-center justify-center transition"
      >
        Book Now 
      </button>

      <Dialog open={isOpen} onClose={closeDialog}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DialogPanel className="bg-white dark:bg-black/50 text-black dark:text-white border rounded-xl p-6 max-w-md w-full">
            <DialogTitle className="text-lg font-semibold">
              Verify Your Details
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
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                onClick={proceed}
                disabled={isLoading}
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
