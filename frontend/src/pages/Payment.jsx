import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Phone, CreditCard } from 'lucide-react';

function Payment() {
  const { listId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;
  const [selectedMethod, setSelectedMethod] = useState(null);

  if (!orderData) {
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

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      iconType: 'truck',
      description: 'Pay when your order arrives',
      available: true
    },
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      iconType: 'phone',
      description: 'Pay using MTN Mobile Money',
      available: false,
      comingSoon: true
    },
    {
      id: 'airtel',
      name: 'Airtel Money',
      iconType: 'phone',
      description: 'Pay using Airtel Money',
      available: false,
      comingSoon: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      iconType: 'card',
      description: 'Pay securely with your card',
      available: false,
      comingSoon: true
    }
  ];

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'truck':
        return <Truck className="w-5 h-5 text-gray-400" />;
      case 'phone':
        return <Phone className="w-5 h-5 text-gray-400" />;
      case 'card':
        return <CreditCard className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const handleMethodSelect = (methodId) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (method && method.available) {
      setSelectedMethod(methodId);
    }
  };

  const handleContinue = () => {
    if (!selectedMethod) return;

    const selectedPaymentDetails = paymentMethods.find(m => m.id === selectedMethod);
    
    const paymentDetailsClean = {
      id: selectedPaymentDetails.id,
      name: selectedPaymentDetails.name,
      description: selectedPaymentDetails.description,
      available: selectedPaymentDetails.available,
      iconType: selectedPaymentDetails.iconType
    };

    const orderDataClean = {
      total: orderData.total,
      subtotal: orderData.subtotal,
      delivery_fee: orderData.delivery_fee,
      service_fee: orderData.service_fee,
      items: orderData.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      customer: {
        email: orderData.customer.email,
        phone: orderData.customer.phone,
        address: orderData.customer.address
      }
    };

    navigate(`/order/payment-summary/${listId}`, {
      state: {
        orderData: orderDataClean,
        paymentMethod: selectedMethod,
        paymentDetails: paymentDetailsClean
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Select Payment Method</h2>
          <p className="text-gray-600">Order Total: UGX {orderData.total?.toLocaleString()}</p>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div 
              key={method.id}
              className={`bg-white border rounded-lg transition-all ${
                !method.available ? 'opacity-60' : 
                selectedMethod === method.id ? 'ring-2 ring-green-400' : 
                'hover:border-green-200 cursor-pointer'
              }`}
              onClick={() => method.available && handleMethodSelect(method.id)}
            >
              <div className="flex items-center p-4">
                <div className="mr-4">
                  {getIcon(method.iconType)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-gray-900">{method.name}</h3>
                    {method.comingSoon && (
                      <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                {selectedMethod === method.id && method.available && (
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-green-400"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            className={`w-full py-3 rounded-lg transition-all ${
              selectedMethod
                ? 'bg-gradient-to-r from-yellow-400 to-green-400 text-white hover:shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedMethod}
            onClick={handleContinue}
          >
            Continue to Review
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Payment;