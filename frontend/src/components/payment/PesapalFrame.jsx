import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Shield } from 'lucide-react';

const PesapalFrame = ({ redirectUrl, amount }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">Complete Your Payment</h2>
          <p className="text-gray-600">
            Amount to Pay: UGX {amount?.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-gray-50 rounded-lg">
          <Shield className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            Secure Payment Processing
          </span>
        </div>

        <div className="relative">
          <div className="rounded-lg overflow-hidden shadow-md border border-gray-100">
            <iframe
              src={redirectUrl}
              className="w-full h-[600px]"
              frameBorder="0"
              allow="payment"
            />
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Your Order is Protected
                </p>
                <p className="text-sm text-green-600">
                  We process all payments securely and your information is encrypted
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support at{' '}
            <a 
              href="mailto:downtownshopping3@gmail.com" 
              className="text-green-600 hover:text-green-700"
            >
              downtownshopping3@gmail.com
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PesapalFrame;