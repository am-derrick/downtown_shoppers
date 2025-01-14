// src/pages/PaymentSummary.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Calendar, Check, Truck } from 'lucide-react';

function PaymentSummary() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, paymentMethod, paymentDetails } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If no order data, redirect to shopping
  if (!orderData || !paymentMethod) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-center text-gray-600">No order data found. Please try again.</p>
          <button
            onClick={() => navigate('/shopping')}
            className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-green-400 text-white py-3 rounded-lg"
          >
            Return to Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      // Here you would typically call your API to update the order
      // await shoppingListAPI.updateOrder(listId, {
      //   payment_method: paymentMethod,
      //   status: 'confirmed'
      // });

      // For now, just navigate to success
      navigate('/shopping', {
        state: { 
          message: 'Order confirmed successfully! We will contact you shortly.',
          orderData,
          paymentMethod,
          paymentDetails
        }
      });
    } catch (err) {
      console.error('Error confirming order:', err);
      setError('Failed to confirm order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Thank You For Your Order</h1>
          <p className="text-gray-600">Order #{listId}</p>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-medium text-gray-900 mb-3">Payment Method</h2>
          <div className="flex items-center">
            <div className="mr-3">
              {paymentMethod === 'cod' ? (
                <Truck className="w-5 h-5 text-gray-400" />
              ) : null}
            </div>
            <div>
              <p className="font-medium text-gray-900">{paymentDetails.name}</p>
              <p className="text-sm text-gray-600">{paymentDetails.description}</p>
              {paymentMethod === 'cod' && (
                <p className="mt-2 text-sm bg-yellow-50 text-yellow-700 p-2 rounded">
                  Please have exact change of UGX {orderData.total?.toLocaleString()} ready upon delivery
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-4 mb-6">
          <h2 className="font-medium text-gray-900">Delivery Information</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Delivery Address</p>
                <p className="text-gray-900">{orderData.customer?.address}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-gray-900">{orderData.customer?.phone}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{orderData.customer?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-4">
          <h2 className="font-medium text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2">
            {orderData.items?.map((item, index) => (
              <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                <div>
                  <p className="text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="text-gray-900">UGX {item.price?.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>UGX {orderData.subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>UGX {orderData.delivery_fee?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Service Fee</span>
              <span>UGX {orderData.service_fee?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2 border-t">
              <span>Total</span>
              <span>UGX {orderData.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-8">
          <button
            className={`w-full py-3 rounded-lg transition-all ${
              loading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-400 to-green-400 text-white hover:shadow-lg'
            }`}
            disabled={loading}
            onClick={handleConfirmOrder}
          >
            {loading ? 'Processing...' : 'Complete Order'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default PaymentSummary;