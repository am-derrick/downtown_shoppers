import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { XCircle, RefreshCcw, ShoppingBag, Phone } from 'lucide-react';

function OrderFailed() {
  const navigate = useNavigate();
  const location = useLocation();
  const { listId } = useParams();
  const { orderData } = location.state || {};

  const handleRetryPayment = () => {
    navigate(`/order/payment/${listId}`, {
      state: { orderData }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-semibold mb-2">Payment Failed</h1>
          <p className="text-gray-600">We couldn't process your payment</p>
          {listId && <p className="text-gray-600">Order #{listId}</p>}
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* What to do next section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="font-medium text-gray-900 mb-4">What can you do?</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <RefreshCcw className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-gray-600 text-left">Try the payment again with the same or different payment method</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <Phone className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-gray-600 text-left">Contact our support team if you need assistance</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleRetryPayment}
              className="w-full bg-gradient-to-r from-yellow-400 to-green-400 text-white py-3 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Retry Payment
            </button>
            
            <button
              onClick={() => navigate('/shopping')}
              className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Create New Shopping List
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderFailed;