import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { paymentAPI } from '@/services/api';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const orderTrackingId = searchParams.get('OrderTrackingId');
        if (!orderTrackingId) {
          throw new Error('No order tracking ID found');
        }

        const response = await paymentAPI.verifyPayment(orderTrackingId);
        setStatus(response.status.toLowerCase());

        // After 3 seconds, redirect to appropriate page
        setTimeout(() => {
          if (response.status === 'COMPLETED') {
            navigate(`/order/success/${response.shopping_list_id}`);
          } else {
            navigate(`/order/failed/${response.shopping_list_id}`);
          }
        }, 3000);
      } catch (err) {
        setError(err.message || 'Failed to verify payment');
        setStatus('error');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  const getStatusDisplay = () => {
    switch (status) {
      case 'processing':
        return {
          icon: <Loader className="w-16 h-16 text-blue-500 animate-spin" />,
          title: 'Verifying Payment',
          message: 'Please wait while we confirm your payment...'
        };
      case 'completed':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: 'Payment Successful',
          message: 'Your payment has been confirmed. Redirecting...'
        };
      case 'failed':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: 'Payment Failed',
          message: 'Your payment could not be processed. Redirecting...'
        };
      case 'error':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: 'Verification Error',
          message: error || 'An error occurred while verifying your payment.'
        };
      default:
        return {
          icon: <Loader className="w-16 h-16 text-blue-500 animate-spin" />,
          title: 'Processing',
          message: 'Please wait...'
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="flex justify-center mb-4">
            {statusDisplay.icon}
          </div>
          <h2 className="text-2xl font-semibold mb-2">
            {statusDisplay.title}
          </h2>
          <p className="text-gray-600">
            {statusDisplay.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;