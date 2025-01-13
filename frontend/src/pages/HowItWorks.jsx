import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import { Check, ShoppingBag, CreditCard } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: ShoppingBag,
      title: 'Create Your Shopping List',
      description: 'Click on the "Start Shopping" button to create your shopping list. Follow our shopping list tips for the best experience. Remember to indicate your delivery address before submitting.',
      highlight: 'Easy list creation'
    },
    {
      icon: Check,
      title: 'Review Your Quote',
      description: 'Our team will carefully evaluate your list and provide detailed pricing options for your review and acceptance.',
      highlight: 'Transparent pricing'
    },
    {
      icon: CreditCard,
      title: 'Payment & Delivery',
      description: 'Once you accept the quote, choose your preferred payment method. We\'ll handle the shopping and deliver right to your doorstep.',
      highlight: 'Secure checkout'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-light mb-6">How It Works</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience hassle-free shopping in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-100 p-4 rounded-full mb-6">
                  <step.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-medium mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <span className="inline-block bg-yellow-50 text-yellow-700 text-sm px-4 py-1 rounded-full">
                  {step.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;