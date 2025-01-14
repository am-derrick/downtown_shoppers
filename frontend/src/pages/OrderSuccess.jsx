import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ShoppingBag, Clock, Mail } from 'lucide-react';

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData } = location.state || {};

  if (!orderData) {
    navigate('/shopping');
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-semibold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for shopping with Downtown Shoppers</p>
          <p className="text-gray-600">Order #{orderData.listId}</p>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* What's Next Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="font-medium text-gray-900 mb-4">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-gray-600 text-left">Check your email for order confirmation and details</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-gray-600 text-left">We'll contact you shortly to confirm delivery time</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/shopping')}
              className="w-full bg-gradient-to-r from-yellow-400 to-green-400 text-white py-3 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center"
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

export default OrderSuccess;